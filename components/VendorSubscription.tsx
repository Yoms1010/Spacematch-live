'use client'


import React, { Key, useState } from 'react'
import { FaXmark } from 'react-icons/fa6';
import { GiCheckMark } from "react-icons/gi";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Loader } from 'lucide-react';
// import  Monnify  from  'monnify-js';
import Image from 'next/image';
import axios from 'axios';


declare interface VendorSubscriptionProps {
    user: {whoId: any} | any, 
    subscriptionCard: any
}

const VendorSubscription = ({user, subscriptionCard}: VendorSubscriptionProps) => {

    if (!user && !subscriptionCard) {
        return (
            <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
                <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
            </div>
        )
    }

    const [subData, setSubData] = useState<any>()
    const [newAmount, setNewAmount] = useState(0)
    const [currency, setCurrency] = useState("NGN")
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [paymentGateway, setPaymentGateway] = useState<string>("Squadco")

    // const  monnify = new  Monnify(process.env.NEXT_PUBLIC_MONNIFY_SECRET_KEY, process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE);    

    const handleSubscription = (item: any)  => {
        setOpenModal(true)
        setSubData(item)
    }


    var CurrencyFormat = require('react-currency-format');
    
    const onCurrencyChange = (value: any) => {
        if (value == "NGN") {
            setNewAmount(subData && subData.cost_naira)
        }else if (value == "USD"){
            setNewAmount(subData && subData.cost_dollars)
        }else if (value == "EURO"){
            setNewAmount(subData && subData.cost_euro)
        }else{
            setNewAmount(subData && subData.cost_pound)
        }

        setCurrency(value)
    }
    
    const config = {
        public_key: 'FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X',
        tx_ref: `SMCS${new  String((new  Date()).getTime())}`,//Spacematch Client Sub,
        amount: newAmount == 0 ? subData && subData.cost_naira : newAmount,
        currency: currency,
        payment_options: "card",
        payment_plan: "3341",
        customer: {
        email: user && user.email,
        phone_number: user && user.mobile,
        name: user && user.name,
        },
        meta: { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
        customizations: {
        title: 'SpaceMatch Client Subscription',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    
    const handleFlutterPayment = useFlutterwave(config);

    const onFlutterWavePayment = () => {
        setIsLoading(true)
        handleFlutterPayment({
            callback: (response) => {
                setIsLoading(false)
                console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {
                setIsLoading(false)
            },
        });
    }
    

    // const onMonnifyPayment = () => {
    //     monnify.initializePayment({
    //         amount:  newAmount == 0 ? subData && subData.cost_naira : newAmount,
    //         currency:  currency,
    //         reference:  `SMCS${new  String((new  Date()).getTime())}`,//Spacematch Client Sub
    //         customerFullName:  user && user.name,
    //         customerEmail:  user && user.email,
    //         apiKey:  "MK_PROD_FLX4P92EDF",
    //         contractCode:  "626609763141",
    //         paymentDescription:  'SpaceMatch Client Subscription',
    //         // metadata:  {
    //         //     "name":  "Damilare",
    //         //     "age":  45
    //         // },
    //         incomeSplitConfig:  [
    //         {
    //             "subAccountCode":  "MFY_SUB_342113621921",
    //             "feePercentage":  50,
    //             "splitAmount":  1900,
    //             "feeBearer":  true
    //         },  
    //         {
    //             "subAccountCode":  "MFY_SUB_342113621922",
    //             "feePercentage":  50,
    //             "splitAmount":  2100,
    //             "feeBearer":  true
    //         }],
    //         onLoadStart:  ()  =>  {
    //             console.log("loading has started");
    //         },
    //         onLoadComplete:  ()  =>  {
    //             console.log("SDK is UP");
    //         },
    //         onComplete:  function()  {
    //             //Implement what happens when the transaction is completed.
    //             // console.log(response);
    //         },
    //         onClose:  function()  {
    //             //Implement what should happen when the modal is closed here
    //             // console.log(data);
    //         }
    //     });
    // }


    const onSquadcoPay = async () => {
        const requestData = {
            email: user && user.email, 
            amount: newAmount > 0 ? newAmount*100 : subData && subData.cost_naira*100, 
            currency: currency,
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
            vendor_id: user?.whoId?.split(";")[1],
            vendor_sc_id: subData && subData.id,
            title: subData && subData.title,
            amount: res.amount*100,
            currency: res.currency_code,
            transaction_ref: res.transaction_ref,
            payment_option: "card",
            status: "successful",
            active: "Yes"
        }

        const response = await axios.post("/api/squadcopay-vendor-sub", payLoad)

        console.log(response);
    }

    const handleFreePlanSubscription = async () => {
        const payLoad = {
            vendor_id: user?.whoId?.split(";")[1],
            vendor_sc_id: 1,
            title: "Free",
            amount: 0,
            currency: "NGN",
            transaction_ref: "Free-plan",
            payment_option: "Free",
            status: "successful",
            active: "Yes"
        }

        const response = await axios.post("/api/squadcopay-vendor-sub", payLoad)

        console.log(response);
    }

    const onPayment = () => {
        if (paymentGateway == "Flutterwave") {
            onFlutterWavePayment()
        }else{
            onSquadcoPay()
        }
    }
    
    function handleModalClose() {
        // setNewAmount(subscriptionCard && subscriptionCard.cost_naira)
        setCurrency("NGN")
        setOpenModal(false)
    }
    

  return (
    <div className="grid lg:grid-cols-3 px-8 gap-10 text-zinc-800 mt-10 mx-auto">
        {
            subscriptionCard.map((item: any, i: Key) => (
                <div
                    key={i}
                    className={`flex flex-col items-center ${item.title == "Free" ? "bg-white" : item.title == "Basic" ? "bg-gradient-to-br from-green-100 via-gray-200 to-purple-100" : item.title == "Premium" ? "bg-gradient-to-br from-main-100 via-black-1 to-gray-600 text-white" : "bg-gradient-to-br from-red-300 via-black-1 to-main-100 text-white"} p-8 rounded-lg shadow-lg relative border-8 ${item.title == "Elite" && "border-main-100"} max-w-sm ${item.text_color}`}>
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
                                <p className="font-extrabold text-4xl">₦{Number(item.cost_naira).toLocaleString()}

                                </p>
                                <p className="text-sm opacity-60">/month

                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {
                            item?.sub_values?.map((item: any, i: any) => (
                                <div className="flex flex-row justify-start items-center text-sm space-x-5" key={i}>
                                    {
                                        item.access == "No"
                                        ?
                                        <FaXmark className='text-smred-100' size={25}/>
                                        :
                                        <GiCheckMark className='text-main-100' size={25}/>
                                    }
                                    <div className={`mt-2 ${item.title == "Premium" && "text-white" }`}>{item.value}</div>
                                </div>
                            ))
                        }
                        <div className="flex justify-center mt-8">
                            {
                                user?.isSubscribed === "Yes" && user?.vendor_sc_id == item.id
                                ?
                                <div className='w-full p-2 border-2 bg-black-1 text-center text-white  font-semibold'>Subscribed</div>
                                : 
                                item.title === "Free"
                                ?
                                <button 
                                    onClick={handleFreePlanSubscription}
                                    className="px-4 py-2 border-main-100 border-4 hover:bg-violet-100 rounded-xl">Get
                                    Started
                                </button>
                                :
                                <button 
                                    onClick={() => handleSubscription(item)}
                                    className="px-4 py-2 border-main-100 border-4 hover:bg-violet-100 rounded-xl">Get
                                    Started
                                </button>
                            }
                        </div>
                    </div>
                </div>
            ))
        }

        <div className='modal'>
        <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 min-h-[300px]">
                    <div className="sm:flex sm:items-start mb-5">
                        <div className="flex flex-row justify-between items-center mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <div className="flex space-x-2 text-xl font-bold text-gray-900">
                            Subscribing for &nbsp;<div className='text-main-100'>{subData&&subData.item}</div>&nbsp; Plan
                        </div>
                        <button
                            type="button"
                            data-autofocus
                            onClick={handleModalClose}
                            className="inline-flex w-full justify-center rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            X
                        </button>
                        </div>
                    </div>
                        <div className='modal-body'>
                            {
                                subData && subData.title == "Free"
                                ?
                                <div>
                                    Free
                                </div>
                                :
                                <div className='flex flex-col justify-center gap-5 w-full h-[220px]'>
                                    <div className='w-full'>
                                        <div className='font-semibold'>Choose Currency Below</div>
                                        <div className='flex justify-center items-center border'>
                                            <div className='flex justify-center items-center space-x-3 w-full text-center'>
                                            {
                                                subData
                                                    &&
                                                <CurrencyFormat value={newAmount == 0 ? subData && subData.cost_naira : newAmount} displayType={'text'} thousandSeparator={true} prefix={currency == "NGN" ? "₦" : currency == "USD" ? "$" : currency == "EURO" ? "€" : "£"} />
                                            }
                                            </div>
                                            <select onChange={(e: any) => onCurrencyChange(e.target.value)} className='w-[80%] border p-2 outline-none'>
                                                <option value="NGN">NAIRA NGN (₦)</option>
                                                <option value="USD">DOLLARS USD ($)</option>
                                                {/* <option value="EURO">EURO EUR (€)</option>
                                                <option value="PND">POUND PND (£)</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='w-full'>
                                        <div className='font-semibold'>Choose Preferred Payment Gateway Below</div>
                                        <select onChange={(e: any) => setPaymentGateway(e.target.value)} className='w-full border p-2 outline-none'>
                                            {/* <option value="Flutterwave">Flutterwave</option>
                                            <option value="Monnify">Monnify</option> */}
                                            <option value="Squadco">Squadco Pay</option>
                                        </select>
                                    </div>
                                    <button 
                                        onClick={onPayment}
                                        className='w-full bg-main-100 p-2 rounded text-white font-semibold'
                                    >
                                        {
                                            isLoading
                                            ?
                                            <div className='flex justify-center items-center w-full'><Loader className='animate-spin'/></div>
                                            :
                                            "Pay"
                                        }
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>
        </div>
    </div>
  )
}

export default VendorSubscription;