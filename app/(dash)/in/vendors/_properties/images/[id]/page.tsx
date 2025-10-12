import PropertyImagesIn from '@/components/PropertyImageIn';
import React from 'react'

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
    <div>
      <PropertyImagesIn id={id}/>
    </div>
  )
}

export default PropertyImages
