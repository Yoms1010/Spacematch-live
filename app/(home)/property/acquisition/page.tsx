import { getCurrentUser } from '@/actions/subscription.action';
import MatchedPropertiesPage from '@/components/acquisition/MatchedPropertiesPage';
import { getBuyerById } from '@/lib/actions/customers.actions';
import { getAllProperties } from '@/lib/actions/property.action'
import { getAuthenticatedUser } from '@/lib/actions/user.action';
import { ClientProps, User } from '@/types';
import React from 'react'

async function page() {

  const properties: any = await getAllProperties();
  const user: User = await getAuthenticatedUser();
  let client: ClientProps | null = null
  if (user?.whoId) {
    const [whoName, rawId] = user.whoId.split(";");
    if (whoName === "Buyer" && rawId) {
      client = await getBuyerById(rawId);
    } else {
      client = await getBuyerById(0);
    }
  }

  return (
    <div>
      <MatchedPropertiesPage propertyData={properties} client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
