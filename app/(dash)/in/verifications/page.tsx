import HeaderBox from '@/components/HeaderBox'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps, User } from '@/types'
import React from 'react'

async function page() {
  const user: User = await getAuthenticatedUser()
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
      <header className='home-header'>
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={user.name.split(" ")[0]}
          subtext="Verify properties for acqusition"
        />
      </header>

      <section>

      </section>

    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
