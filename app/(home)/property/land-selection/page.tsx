import ChooseLand from '@/components/cardsui/ChooseLand'
import Footer from '@/components/Footer'
import { getAllProperties } from '@/lib/actions/property.action'
import { PropertyItemProps } from '@/types'
import React from 'react'

async function page() {
  
  const properties = await getAllProperties()

  return (
    <div>
      <ChooseLand properties={properties}/>
      <Footer/>
    </div>
  )
}

export default page
