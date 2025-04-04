interface GoogleSheet {
  google_url: string;
  sheet_id: string;
  sheet_name: string;
}

interface SendToGoogleScriptResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

/**
 * Sends data to a Google Script for processing
 */
export async function sendToGoogleScript(
  rows: Record<string, unknown>[],
): Promise<SendToGoogleScriptResponse> {
  // if (!sheetId) return { success: false, error: 'No sheet ID provided' };

  const data = {
    rows: rows
  };
  
  const googleSheet: GoogleSheet = {
    google_url: 'https://script.google.com/macros/s/AKfycby2ahPUDfJwX4iOL8Ud49BmXYhJ5cyTUDDipAQVOCdfyKs8NWodb9pLqGo5aptsH0drvA/exec',  // empty for now
    sheet_id: '1HpLLsAXO9N6gKWUXrnsWFc6cX7lT2nVxXRD35ChxpoA',
    sheet_name: 'stats'  // Set this as needed
  };
  
  // Encode the data array to JSON
  const jsonData = JSON.stringify(data);
  const url = googleSheet.google_url;
  // const url = "https://script.google.com/macros/s/AKfycby2L0-C19_4-j6Yh26_CQ0vRjmUQxvBhsaY001MerxixEwCdf87hiklrRcZeihiZ_CpRQ/exec";
  
  // Build the URL with parameters
  const urlWithParams = `${url}?data=${encodeURIComponent(jsonData)}&sheet_id=${googleSheet.sheet_id}&sheet_name=${googleSheet.sheet_name}`;
  
  try {
    console.log(urlWithParams);
    
    // Make the fetch request (equivalent to cURL in PHP)
    const response = await fetch(urlWithParams);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    console.error('Error sending data to Google Script:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
