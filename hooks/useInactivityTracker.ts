"use client";

import { useEffect, useCallback, useRef } from 'react';

/**
 * @param {object} params
 * @param {() => void} params.onSignOut - The function to call when the user is inactive.
 * @param {number} params.timeout - The inactivity timeout in milliseconds.
 */
export const useInactivityTracker = ({ onSignOut, timeout }: { onSignOut: any, timeout:  number}) => {
  const timerRef = useRef<any>(null);

  // The function that resets the timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(onSignOut, timeout);
  }, [onSignOut, timeout]);

  // Set up and clean up event listeners
  useEffect(() => {
    const activityEvents = [
      'mousemove',
      'mousedown',
      'keypress',
      'scroll',
      'touchstart',
    ];

    // Add event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Set the initial timer
    resetTimer();

    // Cleanup function: This is crucial for preventing memory leaks
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]); // Re-run effect if resetTimer changes

  return null; // This hook does not render anything
};