'use client'

import { redirect } from 'next/navigation'
import React from 'react'

function ProfileCompletionButton() {
  return (
    <button
        onClick={() => redirect("/in/settings")}
        className='w-[90%] mx-auto bg-red-500 text-white p-2 mt-3 animate-pulse shadow-xl shadow-white'>
        Your Profile is yet to be completed. Click this notification to complete your profile.
    </button>
  )
}

export default ProfileCompletionButton
