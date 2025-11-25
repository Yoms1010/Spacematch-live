import PricingPage from '@/components/pricing/PricingPage'
import { getBuyerById } from '@/lib/actions/customers.actions';
import { getClientSubscriptionDetails } from '@/lib/actions/subscription.action'
import { getAuthenticatedUser } from '@/lib/actions/user.action';
import { ClientProps } from '@/types';
import React from 'react'

async function page() {

  const user: any = await getAuthenticatedUser();
  let client: ClientProps | null = null
  if (user?.whoId) {
    const [whoName, rawId] = user.whoId.split(";");
    if (whoName === "Buyer" && rawId) {
      client = await getBuyerById(rawId);
    } else {
      client = await getBuyerById(0);
    }
  }
  const clientSubscription = await getClientSubscriptionDetails()

  return (
    <div>
      <PricingPage clientSubscription={clientSubscription} client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
