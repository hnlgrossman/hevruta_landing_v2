import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../services/mongodb';

function format_seconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}


export async function POST(request: NextRequest) {
  try {
    // Get tracking data from request body
    const data = await request.json();
    
    if (!data) {
      return NextResponse.json({ success: false, message: 'No data provided' }, { status: 400 });
    }

    const parsedData = {
      id: data.userId,
      utm_source: data.utmSource,
      date: data.firstVisitDate,
      btn_clicked: data.clickedButtons.join(', \n'),
      navigation_path: data.navigationPath.join(', \n'),
      top_read_sections: data.topReadSections.map((section: { name: string, time: number }) => `${section.name}: ${format_seconds(section.time)}`).join(', \n'),
      time_on_page: format_seconds(data.timeOnPage),
      navigated_to_whatsapp: data.navigatedToWhatsapp,
      navigated_to_facebook: data.navigatedToFacebook,
      need_update: true
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("hevruta");
    
    // Replace data if ID exists, otherwise insert new document
    await db.collection("landing_stats").replaceOne(
      { id: parsedData.id }, // filter by ID
      parsedData,            // replacement document
      { upsert: true }       // insert if not exists
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tracking data saved to database',
      data: parsedData
    });
  } catch (error) {
    console.error('Error in tracking POST endpoint:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
} 