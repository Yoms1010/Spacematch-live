'use client'

import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function VendorSubPage({vendor}: {vendor: any}) {
    const [isLoading, setIsLoading] = useState(false)

    const {id, email} = vendor;

    const handleSubscription = async (tier: any) => {
        switch (tier) {
        case "Standard":
            onSquadcoPay("Standard", 10000, "NGN")
            break;
        case "Enterprise":
            handleEnterpriseSubscription
            break;
        default:
            break;
        }
    };


    const handleEnterpriseSubscription = () => {
        return toast.warning("Will be attended to")
    }

    const onSquadcoPay = async (tier: string, price: number, currency: string) => {
        const requestData = {
            email: email, 
            amount: price*100,
            currency,
        }
        
        setIsLoading(true)
        //@ts-expect-error
        const squadInstance = await new squad({
            onClose: () => console.log("Widget closed"),
            onLoad: () => console.log("Widget loaded successfully"),
            onSuccess: (res: any) => {onSquadcoPaySuccess(res); console.log(`Linked successfully`, res);},
            key: process.env.NEXT_PUBLIC_SQUADCO_PAY_API_KEY,
            email: requestData.email,
            amount: requestData.amount,
            currency_code: requestData.currency
        });
        squadInstance.setup();
        squadInstance.open();
        setIsLoading(false)
    }
    
    const onSquadcoPaySuccess = async (res: any) => {
        const payLoad = {
            vendor_id: id,
            vendor_sc_id: 2,
            title: "Standard",
            amount: res.amount/100,
            currency: res.currency_code,
            transaction_ref: res.transaction_ref,
            payment_option: "card",
            status: "successful",
            active: "Yes"
        }

        const response = await axios.post("/api/squadcopay-vendor-sub", payLoad)
        console.log(response);
    }

  return (
    <div className="text-center p-8">
    <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
    <p className="text-gray-600 mb-8">Unlock powerful features to grow your business.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Standard Plan */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border-2 border-purple-500">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">Standard</h3>
        <p className="text-gray-500 text-sm">₦10,000/month</p>
        <ul className="mt-4 text-left space-y-2 text-gray-700">
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Unlimited listings</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Advanced analytics</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Create promotions</span></li>
        </ul>
        <button onClick={() => handleSubscription('Standard')} className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
          {
            isLoading
            ?
            <Loader className='animate-spin'/>
            :
            <div>
              <span role="img" aria-label="buy">🛒</span>
              <span>Choose Standard</span>
            </div>
          }
        </button>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border-2 border-purple-800">
        <h3 className="text-2xl font-bold text-purple-800 mb-2">Enterprise</h3>
        <p className="text-gray-500 text-sm">Custom Pricing</p>
        <ul className="mt-4 text-left space-y-2 text-gray-700">
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>All Standard features</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Social media campaign management</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Dedicated account manager</span></li>
        </ul>
        <button onClick={handleEnterpriseSubscription} className="mt-6 w-full bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-900 transition-colors">
          {
            isLoading
            ?
            <Loader className='animate-spin'/>
            :
            <div>
             <span role="img" aria-label="contact">📞</span>
            <span>Contact Us</span>
            </div>
          }
        </button>
      </div>
    </div>
  </div>
  )
}

export default VendorSubPage;