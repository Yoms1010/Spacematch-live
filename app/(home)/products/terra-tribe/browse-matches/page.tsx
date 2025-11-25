"use client"

import BrowseTerratribeMatchesPage from '@/components/solutions/terra-tribe/BrowseTerratribeMatchesPage'
import { useStateContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

function page() {

    const router = useRouter()
    const {terratribeMatches} = useStateContext()

    if (!terratribeMatches) {
        return router.push("/products/terra-tribe/co-ownership-goals/")
    }

  return (
    <div>
      <BrowseTerratribeMatchesPage matches={terratribeMatches}/>
    </div>
  )
}

export default page
