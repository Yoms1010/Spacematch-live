
import MobileNav from '@/components/MobileNav';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { getAuthenticatedUser, isAthenticated } from '@/lib/actions/user.action';
import React, { Suspense, ReactNode } from 'react';
import { getCurrentAgentChatCount, getCurrentClientChatCount } from '@/lib/actions/chat.actions'
import { redirect } from 'next/navigation';

// Define a type for the user object to ensure type safety throughout the component.
interface User {
  id: number;
  client_sc_id: number | null;
  vendor_sc_id: number | null;
  name: string;
  whoId: string;
  email: string;
  email_verified_at: string | null;
  photo: string;
  complete: string;
  terms_and_conditions: string | null;
  refund_policy: string | null;
  isSubscribed: string;
  plan: string;
  active: string;
  created_at: string;
  updated_at: string;
}

// Define the props for the main RootLayout component.
interface RootLayoutProps {
  children: ReactNode;
}

// Use the defined interface for the component's props.
export default async function RootLayout({ children }: RootLayoutProps) {

  const user: User | any = await getAuthenticatedUser()
  const buyerChatCount = await getCurrentClientChatCount()
  const agentChatCount = await getCurrentAgentChatCount()

  return (
    <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center text-3xl font-bold w-full">
            <img
              src="https://placehold.co/100x100/333/FFF?text=LOGO"
              width={100}
              height={100}
              alt="logo"
              className="animate-spin shadow-sm rounded-full"
            />
          </div>
        }
      >
    <main className="flex h-screen w-full font-inter overflow-hidden">
      
        <SideBar user={user} who={user?.whoId} agentChatCount={agentChatCount} buyerChatCount={buyerChatCount}/>

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <img
              src="https://placehold.co/30x30/333/FFF?text=TM"
              width={30}
              height={30}
              alt="logo"
            />
            <div>
              <MobileNav
                user={user?.name?.split(" ")[0]}
                who={user?.whoId}
              />
            </div>
          </div>
          <NavBar user={user} />
          <div className="no-scrollbar max-h-screen overflow-y-scroll bg-gray-100">
            {children}
          </div>
        </div>
    </main>
    </Suspense>
  );
}
