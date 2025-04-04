export const trackUserInfo = () => {
  // Collect basic user information
  const userInfo = {
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  };

  // Return the collected information
  return userInfo;
};

// User engagement metrics
export interface UserEngagement {
  userId: string;
  firstVisitDate: string;
  timeOnPage: number;
  maxScrollDepth: number;
  clickedButtons: string[];
  readSections: Record<string, number>;
  exitWithoutAction: boolean;
  navigatedToWhatsapp: boolean;
  navigatedToFacebook: boolean;
  navigationPath: string[];
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  activeTimeOnPage: number; // New property to track active time
}

let startTime: number;
let engagement: UserEngagement;
let scrollObserver: IntersectionObserver;
let isExitTracked = false;
let autoSendInterval: number | null = null;
const STORAGE_KEY = 'hevruta_user_tracking';
const SESSION_START_KEY = 'hevruta_session_start';
const USER_ID_KEY = 'hevruta_user_id';
const FIRST_VISIT_KEY = 'hevruta_first_visit';

// Variables to track active time
let tabActiveStartTime: number | null = null;
let totalActiveTime = 0;

// Generate a unique user ID
const generateUserId = (): string => {
  return 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Get or create user ID
const getUserId = (): string => {
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
};

// Extract UTM parameters from URL
const getUtmParameters = () => {
  if (typeof window === 'undefined') return { source: null, medium: null, campaign: null };
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    source: urlParams.get('utm_source'),
    medium: urlParams.get('utm_medium'),
    campaign: urlParams.get('utm_campaign')
  };
};

// Initialize the tracking functionality
export const initializeTracking = (options?: { autoSendInterval?: number }) => {
  // Load previous engagement data or initialize new data
  loadOrResetEngagementData();
  
  // Start timing - load the previous startTime or set new one
  startTime = getSessionStartTime();
  
  // Initialize active time tracking
  tabActiveStartTime = document.visibilityState === 'visible' ? Date.now() : null;
  
  // Setup visibility change listener for active time tracking
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Tab became visible
      tabActiveStartTime = Date.now();
      
      // Send API call when the user returns to the tab
      sendTrackingDataToServer().then(result => {
        console.log('Visibility change (tab visible) tracking data sent:', result);
      }).catch(err => {
        console.error('Error sending tracking data on tab visible:', err);
      });
    } else {
      // Tab hidden, update total active time
      if (tabActiveStartTime !== null) {
        totalActiveTime += (Date.now() - tabActiveStartTime);
        tabActiveStartTime = null;
      }
      // Save data when tab becomes hidden
      saveEngagementData();
      
      // Send API call when the user exits the tab
      sendTrackingDataToServer().then(result => {
        console.log('Visibility change (tab hidden) tracking data sent:', result);
      }).catch(err => {
        console.error('Error sending tracking data on tab hidden:', err);
      });
    }
  });
  
  // Track scroll depth
  trackScrollDepth();
  
  // Track clicks
  trackButtonClicks();
  
  // Track read sections
  trackReadSections();
  
  // Track exit behavior
  trackExitBehavior();
  
  // Track page changes
  trackNavigation();
  
  // Set up auto-sending of tracking data if interval is provided
  if (options?.autoSendInterval && options.autoSendInterval > 0) {
    // Clear any existing interval
    if (autoSendInterval) {
      window.clearInterval(autoSendInterval);
    }
    
    // Initial send only if tab is visible
    if (document.visibilityState === 'visible') {
      sendTrackingDataToServer();
    }
    
    // Set up new interval that checks visibility before sending
    autoSendInterval = window.setInterval(() => {
      // Only send tracking data if the tab is visible
      if (document.visibilityState === 'visible') {
        console.log('Auto-sending tracking data to server');
        sendTrackingDataToServer();
      } else {
        console.log('Tab not visible, skipping auto-send');
      }
    }, options.autoSendInterval);
  }
  
  // Send data when user leaves the page or tab is hidden
  window.addEventListener('beforeunload', async () => {
    // Try to send tracking data before unloading
    if (navigator.sendBeacon) {
      const trackingData = getEngagementSummary();
      navigator.sendBeacon('/api/tracking', JSON.stringify(trackingData));
    }
    
    saveAndFinalizeTracking();
  });
  
  // Log initial tracking setup
  console.log('Tracking initialized');
};

// Load previous engagement data or initialize new data
const loadOrResetEngagementData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Migrate old data format if needed
      if (parsedData.navigatedToCatalog !== undefined && parsedData.navigatedToWhatsapp === undefined) {
        console.log('Migrating old tracking data format');
        parsedData.navigatedToWhatsapp = false; // Initialize with false
        delete parsedData.navigatedToCatalog; // Remove old property
      }
      
      // Add user ID if not present
      if (!parsedData.userId) {
        parsedData.userId = getUserId();
      }
      
      // Add first visit date if not present
      if (!parsedData.firstVisitDate) {
        parsedData.firstVisitDate = getFirstVisitDate();
      }
      
      // Check for UTM parameters if they're not already set
      if (!parsedData.utmSource) {
        const utmParams = getUtmParameters();
        parsedData.utmSource = utmParams.source;
        parsedData.utmMedium = utmParams.medium;
        parsedData.utmCampaign = utmParams.campaign;
      }
      
      engagement = parsedData;
      console.log('Loaded previous tracking data', engagement);
      
      // Add current path to navigation path if it's a new page
      const currentPath = window.location.pathname;
      const lastPath = engagement.navigationPath[engagement.navigationPath.length - 1];
      
      if (lastPath !== currentPath) {
        engagement.navigationPath.push(currentPath);
      }
    } else {
      resetEngagementData();
    }
  } catch (error) {
    console.error('Error loading tracking data', error);
    resetEngagementData();
  }
};

// Save engagement data to localStorage
const saveEngagementData = () => {
  try {
    // Update time on page before saving
    const currentTime = Date.now();
    const sessionStartTime = getSessionStartTime();
    engagement.timeOnPage = Math.floor((currentTime - sessionStartTime) / 1000);
    
    // Update active time if tab is currently visible
    if (tabActiveStartTime !== null) {
      totalActiveTime += (Date.now() - tabActiveStartTime);
      engagement.activeTimeOnPage = Math.floor(totalActiveTime / 1000);
      tabActiveStartTime = Date.now(); // Reset the active start time
    } else {
      engagement.activeTimeOnPage = Math.floor(totalActiveTime / 1000);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(engagement));
    console.log('Saved tracking data', engagement);
  } catch (error) {
    console.error('Error saving tracking data', error);
  }
};

// Get the session start time
const getSessionStartTime = (): number => {
  let sessionStart = parseInt(localStorage.getItem(SESSION_START_KEY) || '0', 10);
  
  if (!sessionStart) {
    sessionStart = Date.now();
    localStorage.setItem(SESSION_START_KEY, sessionStart.toString());
  }
  
  return sessionStart;
};

// Get or record the first visit date
const getFirstVisitDate = (): string => {
  let firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
  
  if (!firstVisit) {
    firstVisit = new Date().toISOString();
    localStorage.setItem(FIRST_VISIT_KEY, firstVisit);
  }
  
  return firstVisit;
};

// Reset engagement data for new session
const resetEngagementData = () => {
  const utmParams = getUtmParameters();
  
  engagement = {
    userId: getUserId(),
    firstVisitDate: getFirstVisitDate(),
    timeOnPage: 0,
    activeTimeOnPage: 0, // Initialize active time
    maxScrollDepth: 0,
    clickedButtons: [],
    readSections: {},
    exitWithoutAction: true,
    navigatedToWhatsapp: false,
    navigatedToFacebook: false,
    navigationPath: [window.location.pathname],
    utmSource: utmParams.source,
    utmMedium: utmParams.medium,
    utmCampaign: utmParams.campaign
  };
  
  // Reset session start time
  localStorage.setItem(SESSION_START_KEY, Date.now().toString());
  
  // Initialize active time tracking
  tabActiveStartTime = document.visibilityState === 'visible' ? Date.now() : null;
  totalActiveTime = 0;
};

// Clear all tracking data (for testing)
export const clearTrackingData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_START_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(FIRST_VISIT_KEY);
  resetEngagementData();
  console.log('Tracking data cleared');
};

// Finalize and save tracking data
const saveAndFinalizeTracking = () => {
  // Save data before unload
  saveEngagementData();
  
  // Clean up observers
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
  
  // Remove event listeners
  window.removeEventListener('beforeunload', saveAndFinalizeTracking);
};

// Track how far the user scrolls down the page
const trackScrollDepth = () => {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const scrollDepthPercentage = Math.min(100, Math.floor((scrollPosition / documentHeight) * 100));
    
    if (scrollDepthPercentage > engagement.maxScrollDepth) {
      engagement.maxScrollDepth = scrollDepthPercentage;
    }
  });
};

// Track which buttons are clicked
const trackButtonClicks = () => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('a, button');
    
    if (button) {
      // Mark that the user has taken an action
      engagement.exitWithoutAction = false;
      
      const buttonText = button.textContent?.trim() || 'unnamed-button';
      const buttonHref = (button as HTMLAnchorElement).href;
      const buttonId = button.id || '';
      const buttonClass = button.className || '';
      
      // Record button click
      engagement.clickedButtons.push(`${buttonText} (${buttonId || buttonClass})`);
      
      // Check if it's a WhatsApp link
      if (buttonHref && (buttonHref.includes('whatsapp.com') || buttonHref.includes('wa.me'))) {
        engagement.navigatedToWhatsapp = true;
      }
      
      // Check if it's a Facebook link
      if (buttonHref && buttonHref.includes('facebook.com')) {
        engagement.navigatedToFacebook = true;
      }
      
      // Log button clicks
      console.log('Button clicked:', { text: buttonText, href: buttonHref });
    }
  });
};

// Track which sections are read the most
export const trackReadSections = () => {
  // Select only elements with data-user-tracking attribute
  const sections = document.querySelectorAll('[data-user-tracking]');
  const sectionTimers: Record<string, { timer: number, time: number }> = {};
  
  // Create an intersection observer to track visible sections
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Get the data-user-tracking attribute value as the section name
      const sectionName = (entry.target as HTMLElement).getAttribute('data-user-tracking') || 'unnamed-section';
      
      if (entry.isIntersecting) {
        // Section is visible, start timer
        if (!sectionTimers[sectionName]) {
          sectionTimers[sectionName] = { timer: 0, time: 0 };
        }
        
        // Clear any existing timer to prevent duplicates
        if (sectionTimers[sectionName].timer) {
          clearInterval(sectionTimers[sectionName].timer);
        }
        
        sectionTimers[sectionName].timer = window.setInterval(() => {
          // Only increment time if the document is visible
          if (document.visibilityState === 'visible') {
            sectionTimers[sectionName].time += 100;
            engagement.readSections[sectionName] = sectionTimers[sectionName].time;
          }
        }, 100);
      } else if (sectionTimers[sectionName]) {
        // Section is no longer visible, clear timer
        clearInterval(sectionTimers[sectionName].timer);
      }
    });
  }, { threshold: 0.5 }); // Element is considered visible when 50% in view
  
  // Observe all sections
  sections.forEach(section => {
    scrollObserver.observe(section);
  });
  
  // Add visibility change listener to pause/resume timers
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Tab is hidden, clear all section timers
      Object.values(sectionTimers).forEach(timerObj => {
        if (timerObj.timer) {
          clearInterval(timerObj.timer);
          timerObj.timer = 0;
        }
      });
    } else if (document.visibilityState === 'visible') {
      // Tab is visible again, restart timers for visible sections
      scrollObserver.disconnect();
      scrollObserver.observe(document.documentElement);
      
      // Re-observe all sections to restart timers
      sections.forEach(section => {
        scrollObserver.observe(section);
      });
    }
  });
  
  console.log(`Initialized tracking for ${sections.length} sections`);
  return sections.length;
};

// Track exit behavior
const trackExitBehavior = () => {
  // If user hasn't interacted after 30 seconds, mark as potential bounce
  setTimeout(() => {
    if (engagement.exitWithoutAction) {
      console.log('User inactive for 30 seconds');
    }
  }, 30000);
  
  // Track mouse leaving the window (potential exit intent)
  document.addEventListener('mouseleave', (event) => {
    if (event.clientY <= 0 && !isExitTracked) {
      isExitTracked = true;
      console.log('Exit intent detected');
      
      // Record time on page at exit intent
      engagement.timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    }
  });
};

// Track page navigation
const trackNavigation = () => {
  // For client-side navigation (Next.js)
  if (typeof window !== 'undefined') {
    const pushState = history.pushState;
    history.pushState = function(...args) {
      const result = pushState.apply(this, args);
      
      // Record the navigation
      engagement.navigationPath.push(window.location.pathname);
      console.log('Navigation to:', window.location.pathname);
      
      // Re-initialize section tracking for the new page
      // Wait for DOM to update with new page content
      setTimeout(() => {
        if (scrollObserver) {
          scrollObserver.disconnect();
        }
        trackReadSections();
        console.log('Re-initialized section tracking after navigation');
      }, 300);
      
      return result;
    };
  }
};

// Generate a summary report of user engagement
export const getEngagementSummary = () => {
  // Calculate current active time on page
  let currentActiveTime = totalActiveTime;
  if (tabActiveStartTime !== null) {
    currentActiveTime += (Date.now() - tabActiveStartTime);
  }
  const currentActiveTimeOnPage = Math.floor(currentActiveTime / 1000);
  
  // Get most read sections - top 3
  const topReadSections = Object.entries(engagement.readSections)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, time]) => ({
      name,
      time: Math.round(time / 1000), // Convert ms to seconds
      percentage: Math.round((time / (currentActiveTimeOnPage * 1000 || 1)) * 100) // Percentage of total active time
    }));
  
  // Format most read section
  const mostReadSectionFormat = topReadSections.length > 0 
    ? `${topReadSections[0].name} (${topReadSections[0].time}s, ${topReadSections[0].percentage}%)`
    : 'None';
  
  // Format first visit date in a readable format
  const firstVisitFormatted = formatDateForDisplay(engagement.firstVisitDate);
  
  // Create summary report
  return {
    userId: engagement.userId,
    firstVisitDate: firstVisitFormatted,
    timeOnPage: `${currentActiveTimeOnPage}`,
    maxScrollDepth: `${engagement.maxScrollDepth}%`,
    clickedButtons: engagement.clickedButtons,
    mostReadSection: mostReadSectionFormat,
    topReadSections: topReadSections,
    exitWithoutAction: engagement.exitWithoutAction,
    navigatedToWhatsapp: engagement.navigatedToWhatsapp,
    navigatedToFacebook: engagement.navigatedToFacebook,
    navigationPath: engagement.navigationPath,
    utmSource: engagement.utmSource,
    utmMedium: engagement.utmMedium,
    utmCampaign: engagement.utmCampaign
  };
};

// Send tracking data to server API endpoint
export const sendTrackingDataToServer = async (): Promise<{ success: boolean; message: string }> => {
  try {
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
      console.log('Tracking data sent to server automatically', data);
      return { success: true, message: data.message || 'Data sent successfully' };
    } else {
      console.error('Error sending tracking data to server', data);
      return { success: false, message: data.message || 'Unknown error' };
    }
  } catch (error) {
    console.error('Exception when sending tracking data:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Helper function to format ISO date for display
const formatDateForDisplay = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    
    // Format: DD/MM/YYYY HH:MM:SS
    return new Intl.DateTimeFormat('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  } catch {
    // Return original if parsing fails
    return isoDateString;
  }
}; 