import HeaderBox from '@/components/HeaderBox'
import VendorDocsVerification from '@/components/in-components/superadmin/VendorDocsVerification';
import React from 'react'


export async function generateStaticParams() {
  return [{ id: "1" }];
}

const page = async ({params}: {params: Promise<{ id: string }>}) => {
  
    const { id } = await params
  
    return (
      <div className='container mb-3 p-4'>
            <HeaderBox
              title='Properties Table'
              subtext='Properties Details and management'
            />
            <VendorDocsVerification vendorId={id}/>
      </div>
    )
  }

export default page
export const dynamic = "force-dynamic";
