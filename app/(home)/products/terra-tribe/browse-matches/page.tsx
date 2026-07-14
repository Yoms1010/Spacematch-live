"use client"

import BrowseTerratribeMatchesPage from '@/components/solutions/terra-tribe/BrowseTerratribeMatchesPage'
import { useStateContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {

    const router = useRouter()
    const {terratribeMatches} = useStateContext()

    useEffect(() => {
        if (!terratribeMatches) {
            router.push("/products/terra-tribe/co-ownership-goals/")
        }
    }, [terratribeMatches, router])

    if (!terratribeMatches) {
        return null
    }

  return (
    <div>
      <BrowseTerratribeMatchesPage matches={terratribeMatches}/>
    </div>
  )
}

export default page
