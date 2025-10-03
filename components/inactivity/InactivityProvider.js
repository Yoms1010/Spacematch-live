"use client";

import { useRouter } from 'next/navigation';
import { useInactivityTracker } from '@/hooks/useInactivityTracker';
import { useCallback } from 'react';

// This provider should wrap the parts of your app that are for authenticated users
export const InactivityProvider = ({ children }) => {
  const router = useRouter();

  // Define the sign-out logic
  const handleSignOut = useCallback(() => {
    // This is where you would clear user session, tokens, etc.
    console.log("Signing out due to inactivity...");
    
    // Example: Clear a token from localStorage
    // localStorage.removeItem('userAuthToken');
    
    // Redirect to the login page with a reason
    router.push('/login?reason=inactive');
  }, [router]);

  // Use the hook to track inactivity
  useInactivityTracker({
    onSignOut: handleSignOut,
    timeout: 30 * 60 * 1000, // 30 minutes
  });

  return <>{children}</>;
};