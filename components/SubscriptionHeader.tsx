import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function SubscriptionHeader({userInfo}: {userInfo: any}) {
  return (
    <div className='bg-gray-200 p-2 w-full'>
        <div className='flex max-sm:flex-col max-sm:gap-4 justify-between items-center p-2 w-full bg-white'>
          <Link href={"/in/subscription"}>
            <Button
              className=''
            >
                {
                userInfo?.isSubscribed === "Yes"
                ?
                "Upgrade"
                :
                "Subscribe Now"
                }
            </Button>
          </Link>
          <div className='text-center'>
            {
              userInfo?.isSubscribed === "Yes"
              ?
              <div className='border rounded-xl px-3 flex items-center space-x-2'>
                <p>Current Subscription</p>:<p className='text-green-600 font-bold text-xl'>{userInfo?.plan}</p>
              </div>
              :
              "Subscribe to unlock our vendor services"
            }
          </div>
        </div>
      </div>
  )
}

export default SubscriptionHeader
