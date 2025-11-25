import { getCurrentUser } from '@/actions/subscription.action';
import MatchedPropertiesPage from '@/components/acquisition/MatchedPropertiesPage';
import { getBuyerById } from '@/lib/actions/customers.actions';
import { getAllProperties } from '@/lib/actions/property.action'
import { getAuthenticatedUser } from '@/lib/actions/user.action';
import React from 'react'

async function page() {

  const properties: any = await getAllProperties();
  const user: any = await getAuthenticatedUser();
  const client = await getBuyerById(user != 0 && user?.whoId.split(";")[0] === "Buyer" ? user?.whoId.split(";")[1] : 0)

  return (
    <div>
      <MatchedPropertiesPage propertyData={properties} client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
