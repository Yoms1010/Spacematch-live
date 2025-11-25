"use client"

import { ClientProps } from '@/types';
import axios from 'axios';
import { Loader, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Key, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

// --- Data for our pricing plans (easy to add or change plans) ---
const pricingPlans = [
  {
    name: 'Basic',
    price: 49,
    features: [
      'Real-time progress tracking',
      'Track up to 2 projects',
      'Basic document access',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: 99,
    features: [
      'Automation with collaborators',
      'Auto-events on timeline',
      'Track up to 10 projects',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 249,
    features: [
      'Massive project collaboration',
      'Message up to 2 teams',
      'Unlimited project tracking',
    ],
    isPopular: false,
  },
];

const CheckIcon = ({ className = "w-5 h-5 text-green-400 mr-2" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const PricingCard = ({ plan, children, client, isLoading, setIsLoading, router}: {plan: any, children: ReactNode, client: ClientProps, isLoading: boolean, setIsLoading: any, router: any}) => {

  // Dynamically set styles based on the plan
  const cardClasses = plan.isPopular
    ? 'bg-indigo-600/50 border-2 border-indigo-500'
    : 'bg-gray-800/50 border border-gray-700';
  
  const buttonClasses = plan.isPopular
    ? 'bg-indigo-500 hover:bg-indigo-400'
    : 'bg-gray-600 hover:bg-gray-500';
    
  const priceTextColor = plan.isPopular ? 'text-gray-200' : 'text-gray-400';

    function handleClientSubscription(item: any): void {
        if (client.length === 0) {
            alert("You need to sign in as a client first.")
            typeof window != undefined && window.localStorage.setItem("callerpage", "/pricing")
            return router.push("/sign-in")
        }
        // console.log(item);
        onSquadcoPay(item)
    }

    const onSquadcoPay = async (item: any) => {
            const requestData = {
                email: client.email, 
                amount: item.cost_naira*100, 
                currency: "NGN",
            }
            // return toast.warning("Processing...")
            setIsLoading(true)
            //@ts-expect-error
            const squadInstance = await new squad({
                onClose: () => console.log("Widget closed"),
                onLoad: () => console.log("Widget loaded successfully"),
                onSuccess: (res: any) => {onSquadcoPaySuccess(res, item); console.log(`Linked successfully`, res);},
                key: process.env.NEXT_PUBLIC_SQUADCO_SANDBOX_API_KEY,  //NEXT_PUBLIC_SQUADCO_PAY_API_KEY,
                email: requestData.email,
                amount: requestData.amount,
                currency_code: requestData.currency
            });
            squadInstance.setup();
            squadInstance.open();
            setIsLoading(false)
        }
    
        const onSquadcoPaySuccess = async (res: any, item: any) => {
            const payLoad = {
                client_id: client.id,
                client_sc_id: item.id,
                title: item.title,
                amount: res.amount,
                currency: res.currency_code,
                transaction_ref: res.transaction_ref,
                payment_option: "card",
                status: "successful",
                active: "Yes"
            }
    
            const response = await axios.post("/api/squadcopay-client-sub", payLoad)
    
            console.log(response);
        }

  return (
    <div className={`p-6 rounded-lg flex flex-col relative ${cardClasses}`}>
      {plan.isPopular ? (
        <span className="bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full absolute -top-4 left-1/2 -translate-x-1/2">
          Most Popular
        </span>
        )
         :
        ""
      }
      <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
      <p className="mt-2 text-3xl font-bold text-white">
        ₦{plan.cost_naira}<span className={`text-lg font-medium ${priceTextColor}`}>/month</span>
      </p>
      <ul className="mt-6 space-y-3 text-gray-300 flex-grow">
        {children}
      </ul>
      <button 
        onClick={() => handleClientSubscription(plan)} 
        disabled={isLoading}
        className={`mt-8 block text-center w-full text-white px-6 py-3 rounded-md font-semibold transition duration-300 ${buttonClasses}`}
      >
       {
        isLoading
        ?
        <Loader className='animate-spin'/>
        :
        <p>Choose {plan.title}</p>
       }
      </button>
    </div>
  );
};


// --- Main Page Component ---
function PricingPage({clientSubscription, client}: {clientSubscription: any, client: ClientProps}) {
    const router = useRouter()  
    const [isLoading, setIsLoading] = useState(false)
  
    return (
    <div className="bg-gray-50 text-gray-800">
      <main className="pricing-bg text-white">
        <div className="container mx-auto px-6 pt-32 pb-16 flex items-center min-h-screen">
          <div className="w-full">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">Track & Confirm Delivery</h1>
              <p className="text-lg text-gray-300 mt-4">Choose a plan to track your property's progress and confirm fulfillment with complete transparency.</p>
            </div>

            <div className="mt-10 bg-black/20 backdrop-blur-lg rounded-2xl p-8">
              {/* Pricing Tiers Rendered Dynamically */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {clientSubscription.map((item: any) => (
                  <PricingCard key={item.id} plan={item} client={client} isLoading={isLoading} setIsLoading={setIsLoading} router={router}>
                    {item.sub_values.slice(0,4).map((feature: any, index: Key) => (
                      <li key={index} className="flex items-center">
                        {
                          feature.access === "Yes"
                          ?
                          <CheckIcon className={`w-5 h-5 mr-2 text-main-100`} />
                          :
                          <X className={`w-5 h-5 mr-2 text-red-600`}/>
                        }
                        {feature.value}
                      </li>
                    ))}
                  </PricingCard>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <button onClick={() => alert("To be extended...")} className="inline-block bg-teal-500 text-white px-10 py-4 rounded-lg font-semibold hover:bg-teal-600 transition duration-300 text-lg">
                  Unlock Full Access — Choose a Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PricingPage;