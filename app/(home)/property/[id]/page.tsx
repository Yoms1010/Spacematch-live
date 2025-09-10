import PropertyById from "@/components/PropertyDetailById";
import { getPropertyById } from "@/lib/actions/property.action";
import { PropertyItemProps, User } from "@/types";
import { Suspense } from "react";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const Property = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const property: PropertyItemProps = await getPropertyById(id)

  return (
    <Suspense fallback={<div className="h-screen flex justify-center items-center text-30 font-bold">Loading...</div>}>
      <PropertyById property={property}/>
    </Suspense>
  )
}

export default Property
