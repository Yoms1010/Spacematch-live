'use client'


import { ContextProvider } from '@/context/ContextProvider'
import React from 'react'

function Provider({children} : Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <ContextProvider>
        {children}
    </ContextProvider>
  )
}

export default Provider