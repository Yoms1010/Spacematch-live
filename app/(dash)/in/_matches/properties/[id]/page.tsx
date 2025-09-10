import PropertyById from "@/components/PropertyDetailById";
import { Suspense } from "react";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const ViewProperty = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
    
  return (
    <Suspense fallback={<div className="h-screen flex justify-center items-center text-30 font-bold">Loading...</div>}>
      <PropertyById id={id}/>
    </Suspense>
  )
}

export default ViewProperty
