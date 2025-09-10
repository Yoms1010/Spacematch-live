'use client'

import  {VendorSubData} from '@/constants';
import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6';
import { GiCheckMark } from "react-icons/gi";
import SubscriptionModal from './SubscriptionModal';

const SubscriptionCard = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [subscriptionData, setSubscriptionData] = useState<any>()

    function handleSubscription(item: { title: string; desc: string; cost: number; bg_color: string; text_color: string; values: ({ title: string; accept: string; access?: undefined; } | { title: string; access: string; accept?: undefined; })[]; }) {
        setOpenModal(true)
        setSubscriptionData(item)
    }

  return (
    <div className="grid lg:grid-cols-3 px-8 gap-10 text-zinc-800 mt-10 mx-auto">

        {
            VendorSubData.map((item, i) => (
                <div
                    key={i}
                    className={`flex flex-col items-center ${item.title == "Free" ? "bg-white" : item.title == "Basic" ? "bg-gradient-to-br from-green-100 via-gray-200 to-purple-100" : item.title == "Premium" ? "bg-gradient-to-br from-main-100 via-black-1 to-gray-600" : "bg-gradient-to-br from-red-300 via-black-1 to-main-100"} p-8 rounded-lg shadow-lg relative border-8 ${item.title == "Elite" && "border-main-100"} max-w-sm ${item.text_color}`}>
                    {
                        item.title == "Premium"
                        &&
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            className="w-20 h-20 absolute -top-11 -left-11 fill-smred-100">
                            <path fillRule="evenodd"
                                d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                clipRule="evenodd"></path>
                        </svg>
                    }
                    <p className="mono text-sm absolute -top-4 bg-smred-100 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">
                        {item.title}
                    </p>
                    <div>
                        <div className="flex gap-4 justify-center">
                            <p className="font-extrabold text-3xl mb-2">{item.title}

                            </p>
                        </div>
                        <p className="opacity-60 text-center">{item.desc}

                        </p>
                        <p className="opacity-60 text-center">
                        </p>
                        <div className="flex gap-4 justify-center">
                            <div className="flex flex-col items-center my-8">
                                <p className="font-extrabold text-4xl">${item.cost}

                                </p>
                                <p className="text-sm opacity-60">/month

                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {
                            item?.values?.map((item: any, i: any) => (
                                <p className="flex flex-row justify-start items-center text-sm space-x-5" key={i}>
                                    {
                                        item.access == "No"
                                        ?
                                        <FaXmark className='text-smred-100' size={25}/>
                                        :
                                        <GiCheckMark className='text-main-100' size={25}/>
                                    }
                                    <div className='mt-2'>{item.title}</div>
                                </p>
                            ))
                        }
                        <div className="flex justify-center mt-8">
                            <button 
                                onClick={() => handleSubscription(item)}
                                className="px-4 py-2 border-main-100 border-4 hover:bg-violet-100 rounded-xl">Get
                                Started
                            </button>
                        </div>
                    </div>
                </div>
            ))
        }

        <SubscriptionModal subData={subscriptionData && subscriptionData} openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}

export default SubscriptionCard;