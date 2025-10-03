'use client'


import { ContextProvider } from '@/context/ContextProvider'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useInactivityTracker } from '@/hooks/useInactivityTracker';
import { useCallback } from 'react';
import { logout } from '@/lib/actions/user.action';

function Provider({children} : Readonly<{
    children: React.ReactNode;
  }>) {

      const router = useRouter();
    
      // Define the sign-out logic
      const handleSignOut =  useCallback(async() => {
        // This is where you would clear user session, tokens, etc.
        await logout()
        console.log("Signing out due to inactivity...");
        typeof window !== 'undefined' && window.localStorage.removeItem("ACCESS_TOKEN")
        // Example: Clear a token from localStorage
        // localStorage.removeItem('userAuthToken');
        
        // Redirect to the login page with a reason
        router.push('/sign-in?reason=inactive');
      }, [router]);
    
      // Use the hook to track inactivity
      useInactivityTracker({
        onSignOut: handleSignOut,
        timeout: 20 * 60 * 1000, // 30 minutes
      });

  return (
    <ContextProvider>
        {children}
    </ContextProvider>
  )
}

export default Provider