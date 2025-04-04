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
 * Sends data to a Google Script for processing with retry mechanism
 */
export async function sendToGoogleScript(
  rows: Record<string, unknown>[],
  maxRetries = 3
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
  
  let lastError: Error | string | unknown = null;
  
  // Retry logic with exponential backoff
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1}/${maxRetries + 1} to send data to Google Script`);
      if (attempt > 0) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      console.log(urlWithParams, 'urlWithParams');
      
      // Make the fetch request with timeout and headers
      const response = await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Set a reasonable timeout (30 seconds)
        signal: AbortSignal.timeout(30000)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      // Reset retry counter upon success
      console.log('Successfully sent data to Google Script');
      
      return {
        success: true,
        data: responseData
      };
    } catch (error) {
      console.error(`Error sending data (attempt ${attempt + 1}/${maxRetries + 1}):`, error);
      lastError = error;
      
      // If it's the last attempt, throw the error to be caught in the outer catch
      if (attempt === maxRetries) {
        // Continue to the outer catch block
        break;
      }
      // Otherwise continue to the next retry attempt
    }
  }
  
  // If we got here, all retries failed
  // Improved error handling with more details
  const errorMessage = lastError instanceof Error 
    ? `${lastError.message}${lastError.cause ? ` (Cause: ${JSON.stringify(lastError.cause)})` : ''}`
    : String(lastError);
    
  return {
    success: false,
    error: errorMessage
  };
}
