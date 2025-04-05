'use client';

import { useEffect } from 'react';
import { initializeTracking } from '@/utils/userTracking';

export default function UserTracker() {
  useEffect(() => {
    // Initialize tracking on the client side with 1-minute interval (60000 ms)
    initializeTracking({ autoSendInterval: 10000 });
  }, []);

  // This component doesn't render anything
  return null;
} 