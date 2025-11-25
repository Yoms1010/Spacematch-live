import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function PreviousPage() {
  
  return (
    <div className='fixed bottom-5 right-2 w-[70px] h-[70px]'>
      <Link href={""} className='flex justify-center items-center bg-white w-full  p-1 rounded-xl shadow-xl'>
        <ArrowBigLeft className='size-8'/> Back
      </Link>
    </div>
  )
}

export default PreviousPage
