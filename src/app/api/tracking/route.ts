import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
import { sendToGoogleScript } from '../services/google_sheets.service';
// Directory for logs
// const LOG_DIR = path.join(process.cwd(), 'logs');

// Ensure log directory exists
// if (!fs.existsSync(LOG_DIR)) {
//   fs.mkdirSync(LOG_DIR, { recursive: true });
// }

// Data buffer to store tracking data
let dataBuffer: Record<string, unknown>[] = [];
let lastSendTime = Date.now();
let isSending = false;
const sendInterval = 1000 * 30;

// Function to send buffered data to Google Script
async function sendBufferedData() {
  if (isSending || dataBuffer.length === 0) return;
  
  try {
    isSending = true;
    const dataToSend = [...dataBuffer];
    const tempBuffer = [...dataBuffer]; // Create a temporary copy
    dataBuffer = []; // Clear the buffer only after successful send
    lastSendTime = Date.now();
    
    const response = await sendToGoogleScript(dataToSend);
    console.log('Sent buffered data to Google Script:', response);
    
    // If sending failed, put the data back in the buffer
    if (!response.success) {
      console.warn('Failed to send data to Google Script:', response.error);
      dataBuffer = [...tempBuffer, ...dataBuffer];
      
      // Log to file for debugging
      // const logFile = path.join(LOG_DIR, `google_script_error_${new Date().toISOString().replace(/[:.]/g, '-')}.log`);
      // fs.writeFileSync(logFile, JSON.stringify({
      //   error: response.error,
      //   data: tempBuffer.slice(0, 2), // Log just a sample of the data for privacy
      //   timestamp: new Date().toISOString()
      // }, null, 2));
    }
  } catch (error) {
    console.error('Error sending buffered data:', error);
    // Put the data back in the buffer to try again later
    dataBuffer = [...dataBuffer];
    
    // Error logging is disabled since fs operations are commented out
    // If you need file logging, uncomment the fs import and LOG_DIR setup above
  } finally {
    isSending = false;
  }
}
// function ms_to_seconds(ms: number): number {
//   return Math.floor(ms / 1000);
// }

// Check if it's time ms_toto send data
function checkAndSendData() {
  console.log("checkAndSendData");
  console.log(JSON.stringify({
    lastSendTime,
    dataBuffer,
    sendInterval,
    currentTime: Date.now(),
    diff: Date.now() - lastSendTime,
    shouldSend: Date.now() - lastSendTime >= sendInterval && dataBuffer.length > 0
  }));
  const currentTime = Date.now();
  if (currentTime - lastSendTime >= sendInterval && dataBuffer.length > 0) {
    sendBufferedData();
  }
}

function format_seconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

// Set up interval to check and send data every 30 seconds
// setInterval(checkAndSendData, sendInterval);

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
    }
    
    // const index = dataBuffer.findIndex(item => item.id == parsedData.id);
    // if(index > -1) {
    //   console.log("replace");
      
    //   dataBuffer[index] = parsedData; // Replace with new data
    // } else {
    //   console.log("new");
    //   dataBuffer.push(parsedData);
    // }
    // // Add the data to the buffer
    
    // // Check if we should send data now
    // checkAndSendData();
    sendToGoogleScript([parsedData]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tracking data added to buffer',
    });
  } catch (error) {
    console.error('Error in tracking POST endpoint:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
} 