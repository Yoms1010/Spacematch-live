
import PropertyByIdAuth from '@/components/PropertyByIdAuth';
import React, { Suspense } from 'react'

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const EditProperty = async ({ params }: { params: Promise<{ id: string }>}) => {

  const { id } = await params

  return (
    <Suspense fallback={<div className='flex-1 justify-center items-center max-h-screen'>Loading...</div>}>
      <div>
        <PropertyByIdAuth id={id}/>
      </div>
    </Suspense>
  )
}

export default EditProperty
