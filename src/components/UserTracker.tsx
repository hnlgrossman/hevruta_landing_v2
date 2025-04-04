'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackUserInfo, initializeTracking, getEngagementSummary, clearTrackingData } from '@/utils/userTracking';

// Define the type for engagement summary
interface EngagementSummary {
  userId: string;
  firstVisitDate: string;
  timeOnPage: string;
  maxScrollDepth: string;
  clickedButtons: string[];
  mostReadSection: string;
  topReadSections: Array<{
    name: string;
    time: number;
    percentage: number;
  }>;
  exitWithoutAction: boolean;
  navigatedToWhatsapp: boolean;
  navigatedToFacebook: boolean;
  navigationPath: string[];
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

export default function UserTracker() {
  const [showDebug, setShowDebug] = useState(false);
  const [summary, setSummary] = useState<EngagementSummary | null>(null);
  const [apiResponseStatus, setApiResponseStatus] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize tracking on the client side
    const userInfo = trackUserInfo();
    
    // Initialize tracking with auto-sending every 5 minutes (300000 ms)
    initializeTracking({ autoSendInterval: 1000 * 1 });
    
    console.log('UserTracker component initialized', userInfo);

    // Show debug panel if URL has debug parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug_tracking')) {
      setShowDebug(true);
    }

    // Set up keyboard shortcut for debug panel (Ctrl+Alt+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'd') {
        setShowDebug(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Effect to handle path changes in Next.js App Router
  useEffect(() => {
    // Don't run on initial mount, only on subsequent path changes
    if (typeof window !== 'undefined' && window.document.readyState === 'complete') {
      console.log('Path changed to:', pathname);
      
      // Re-initialize section tracking when path changes
      setTimeout(() => {
        // Import and use trackReadSections
        import('@/utils/userTracking').then(module => {
          if (typeof module.trackReadSections === 'function') {
            const sectionsCount = module.trackReadSections();
            console.log(`Re-initialized tracking for ${sectionsCount} sections after App Router navigation`);
          }
        }).catch(err => console.error('Failed to reinitialize tracking:', err));
      }, 300);
    }
  }, [pathname]);

  // Function to view current tracking data
  const handleViewData = () => {
    setSummary(getEngagementSummary());
  };

  // Function to clear tracking data
  const handleClearData = () => {
    clearTrackingData();
    setSummary(null);
    alert('Tracking data has been cleared');
  };

  // Force reload the page to ensure clean state
  const handleForceReset = () => {
    clearTrackingData();
    window.location.reload();
  };

  // Function to send tracking data to the API
  const handleLogDataToServer = async () => {
    try {
      setApiResponseStatus('Sending data...');
      const trackingData = getEngagementSummary();
      
      const response = await fetch('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApiResponseStatus(`Success: ${data.message}`);
        console.log('Tracking data logged to server successfully', data);
      } else {
        setApiResponseStatus(`Error: ${data.message || 'Unknown error'}`);
        console.error('Error logging tracking data to server', data);
      }
    } catch (error) {
      setApiResponseStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Exception when logging tracking data:', error);
    }
  };

  if (!showDebug) {
    // This component doesn't render anything in normal mode
    return null;
  }

  // Debug panel style
  const debugPanelStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    zIndex: 9999,
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '12px',
    maxWidth: '300px',
    maxHeight: '400px',
    overflow: 'auto',
  } as React.CSSProperties;

  const buttonStyle = {
    background: '#333',
    color: 'white',
    border: '1px solid #666',
    borderRadius: '3px',
    padding: '5px 10px',
    margin: '5px',
    cursor: 'pointer',
  } as React.CSSProperties;

  return (
    <div style={debugPanelStyle}>
      <h4 style={{ margin: '0 0 10px 0' }}>User Tracking Debug</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        <button style={buttonStyle} onClick={handleViewData}>View Data</button>
        <button style={buttonStyle} onClick={handleClearData}>Clear Data</button>
        <button style={buttonStyle} onClick={handleForceReset}>Force Reset</button>
        <button style={buttonStyle} onClick={handleLogDataToServer}>Log to Server</button>
        <button style={buttonStyle} onClick={() => setShowDebug(false)}>Close</button>
      </div>
      
      {apiResponseStatus && (
        <div style={{ 
          marginTop: '10px', 
          padding: '5px', 
          backgroundColor: apiResponseStatus.startsWith('Success') ? 'rgba(0,128,0,0.2)' : 'rgba(255,0,0,0.2)', 
          borderRadius: '3px'
        }}>
          {apiResponseStatus}
        </div>
      )}
      
      <div style={{ 
        marginTop: '10px', 
        padding: '5px', 
        backgroundColor: 'rgba(0,0,255,0.2)', 
        borderRadius: '3px',
        fontSize: '11px'
      }}>
        <p style={{ margin: '0' }}><strong>Auto-tracking:</strong> Data is sent to server when tab focus changes (both entering and exiting).</p>
      </div>
      
      {summary && (
        <div style={{ marginTop: '10px' }}>
          <h5 style={{ margin: '0 0 5px 0' }}>Tracking Summary:</h5>
          <div style={{ fontSize: '11px' }}>
            <p><strong>User ID:</strong> {summary.userId || 'Not set'}</p>
            <p><strong>First Visit:</strong> {summary.firstVisitDate || 'Unknown'}</p>
            <p><strong>Time on page:</strong> {summary.timeOnPage}</p>
            <p><strong>Max scroll depth:</strong> {summary.maxScrollDepth}</p>
            
            <div style={{ marginTop: '8px' }}>
              <h6 style={{ margin: '0 0 5px 0' }}>Most Read Sections:</h6>
              {summary.topReadSections && summary.topReadSections.length > 0 ? (
                <ol style={{ margin: '0', paddingLeft: '18px' }}>
                  {summary.topReadSections.map((section, idx) => (
                    <li key={idx}>
                      <strong>{section.name}</strong> - {section.time}s ({section.percentage}% of active time)
                    </li>
                  ))}
                </ol>
              ) : (
                <p>No sections read</p>
              )}
            </div>
            
            <p><strong>Exit without action:</strong> {summary.exitWithoutAction !== undefined ? summary.exitWithoutAction.toString() : '⚠️ undefined'}</p>
            <p><strong>Navigated to WhatsApp:</strong> {summary.navigatedToWhatsapp !== undefined ? summary.navigatedToWhatsapp.toString() : '⚠️ undefined'}</p>
            <p><strong>Navigated to Facebook:</strong> {summary.navigatedToFacebook !== undefined ? summary.navigatedToFacebook.toString() : '⚠️ undefined'}</p>
            
            <div style={{ marginTop: '8px' }}>
              <h6 style={{ margin: '0 0 5px 0' }}>UTM Parameters:</h6>
              <p><strong>Source:</strong> {summary.utmSource || 'None'}</p>
              <p><strong>Medium:</strong> {summary.utmMedium || 'None'}</p>
              <p><strong>Campaign:</strong> {summary.utmCampaign || 'None'}</p>
            </div>
            
            <h6 style={{ margin: '8px 0 5px 0' }}>Clicked buttons:</h6>
            <ul style={{ margin: '0', paddingLeft: '15px' }}>
              {summary.clickedButtons && summary.clickedButtons.length > 0 ? 
                summary.clickedButtons.map((btn: string, i: number) => (
                  <li key={i}>{btn}</li>
                )) : 
                <li>None</li>
              }
            </ul>
            
            <h6 style={{ margin: '8px 0 5px 0' }}>Navigation path:</h6>
            <ul style={{ margin: '0', paddingLeft: '15px' }}>
              {summary.navigationPath && summary.navigationPath.map((path: string, i: number) => (
                <li key={i}>{path}</li>
              ))}
            </ul>
            
            {(!summary.navigatedToWhatsapp || !summary.navigatedToFacebook || !summary.userId) && (
              <div style={{ marginTop: '10px', color: 'yellow' }}>
                <p>⚠️ Some properties are missing in tracking data.</p>
                <p>Try using the &quot;Force Reset&quot; button to fix.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 