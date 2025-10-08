'use client'


import { ContextProvider } from '@/context/ContextProvider'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useInactivityTracker } from '@/hooks/useInactivityTracker';
import { useCallback } from 'react';
import { logout } from '@/lib/actions/user.action';

function Provider({children} : Readonly<{
    children: React.ReactNode;
  }>) {

      const router = useRouter();
      const pathname = usePathname()
      const token = typeof window !== 'undefined' && window.localStorage.getItem("ACCESS_TOKEN");
  
      if (pathname.includes("/in/")) {
          if (!token) {
            router.replace("/sign-in?not-signed-in")
          }
      }

      // Define the sign-out logic
      const handleSignOut =  useCallback(async() => {
        if (token) {
          typeof window !== 'undefined' && window.localStorage.removeItem("ACCESS_TOKEN")
          router.push('/sign-in?reason=inactivity');
          await logout()
          console.log("Signing out due to inactivity...");
        }
      }, [router]);
    
      // Use the hook to track inactivity
      useInactivityTracker({
        onSignOut: handleSignOut,
        timeout: 20 * 60 * 1000, // 20 minutes
      });

  return (
    <ContextProvider>
        {children}
    </ContextProvider>
  )
}

export default Provider