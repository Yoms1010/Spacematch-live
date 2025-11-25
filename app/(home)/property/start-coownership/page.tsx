import PageRenderer from '@/components/co-ownership/PageRenderer';
import { getBuyerById } from '@/lib/actions/customers.actions';
import { getAuthenticatedUser } from '@/lib/actions/user.action';
import { ClientProps, User } from '@/types';
import React from 'react';

async function page() {

    const user: User = await getAuthenticatedUser()
    let client: ClientProps | null = null
    if (user !== null) {
        const whoId = user ? user?.whoId.split(";")[1] : {} as any
        const whoName = user ? user?.whoId.split(";")[0] : {} as any
        client = await getBuyerById(whoName === "Buyer" ? whoId : 0)
    }

    // console.log(client);

    return (
        <div className="h-full flex flex-col items-center justify-center sm:p-8 bg-gray-100 font-sans">
            <div className="w-full max-w-4xl mx-auto pt-24">
                {/* Main Stepper / Progress Bar */}
                <PageRenderer user={user} client={client} />
            </div>
        </div>
    );
}

export default page;
export const dynamic = "force-dynamic";

