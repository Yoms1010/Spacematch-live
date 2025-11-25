import HeaderBox from '@/components/HeaderBox'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import React from 'react'

async function page() {
  const user = await getAuthenticatedUser()
  //   const client = await getBuyerById(user != 0 && user?.whoId.split(";")[0] === "Buyer" ? user?.whoId.split(";")[1]: 0)
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
