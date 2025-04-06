import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import { sendToGoogleScript } from '../google_sheets.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check for authorization from query parameter
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized: No token provided' }, { status: 401 });
    }
    
    // Authorization check
    if (token !== "hnl") {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("hevruta");
    
    // Find all records with need_update=true
    const records = await db.collection("landing_stats")
      .find({ need_update: true })
      .limit(2)
      .toArray();
    
    if (records.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No records need updating',
        count: 0
      });
    }
    
    // Transform records for Google Sheets (remove MongoDB specific fields)
    const recordsForSheet = records.map(record => {
      // Create a new object without the MongoDB-specific fields
      const { id, utm_source, date, btn_clicked, navigation_path, top_read_sections, 
              time_on_page, navigated_to_whatsapp, navigated_to_facebook } = record;
              
      // Return only the fields we need
      return { id, utm_source, date, btn_clicked, navigation_path, top_read_sections, 
               time_on_page, navigated_to_whatsapp, navigated_to_facebook };
    });
    
    // Send to Google Sheets
    const result = await sendToGoogleScript(recordsForSheet);
    
    if (result.success) {
      // Update the records to set need_update = false
      const updatePromises = records.map(record => 
        db.collection("landing_stats").updateOne(
          { id: record.id },
          { $set: { need_update: false } }
        )
      );
      
      await Promise.all(updatePromises);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Records sent to Google Sheets and updated in database',
        count: records.length,
        googleSheetsResponse: result.data
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send records to Google Sheets',
        error: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in cron endpoint:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 