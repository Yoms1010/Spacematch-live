import PropertyImagesIn from '@/components/PropertyImageIn';
import Image from 'next/image';
import React, { Suspense } from 'react'

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const PropertyImages = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return (
    <Suspense
      fallback={<div className="h-screen flex justify-center items-center text-30 font-bold w-full">
      <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-spin shadow-sm rounded-full"/>
      </div>}
    >
    <div>
      <PropertyImagesIn id={id}/>
    </div>
    </Suspense>
  )
}

export default PropertyImages
