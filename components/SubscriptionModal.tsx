import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axiosClient from '@/axios-client';
import { Loader } from 'lucide-react';
// import { clientSub } from '@/lib/actions/subscription.action';


interface ModalProps{
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void,
    subData: {
        id: number;
        title: string,
        cost_naira: number,
        cost_dollars: number,
        cost_euro: number
        cost_pound: number
    }
}

async function SubscriptionModal({openModal, setOpenModal, subData}: ModalProps) {

    const [user, setUser] = useState<any>()
    const [currency, setCurrency] = useState("NGN")
    const [newAmount, setNewAmount] = useState(subData && subData.cost_naira)
    const [isLoading, setIsLoading] = useState(false)

    var CurrencyFormat = require('react-currency-format');

    useEffect(() => {
        axiosClient.get("/user")
        .then((data) => {
            setUser(data.data)
            // console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

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
        tx_ref: "kjgkkjbkbj78987",
        amount: newAmount,
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
        title: 'SpaceMatch Vendor Subscription',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const onPayment = async () => {
        setIsLoading(true)
        handleFlutterPayment({
            callback: async (response) => {
                setIsLoading(false)
                console.log(response);
                 const payLoad = {
                    clientId: user && user.id,
                    clientSubId: subData && subData.id,
                    title: subData && subData.title,
                    cost: `${response.amount}`,
                    txRef: response.tx_ref,
                    transactionId: response.transaction_id,
                    paymentOption: "card",
                    status: response.status,
                }

                // const client = await clientSub({ payLoad });
                // console.log(client);
                
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {
              setIsLoading(false)
            },
          });
    }
    
    function handleModalClose() {
        setNewAmount(subData.cost_naira)
        setCurrency("NGN")
        setOpenModal(false)
    }

  return (
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
                        Subscribing for &nbsp;<div className='text-main-100'>{subData && subData.title}</div>&nbsp; Plan
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
                            <div className='flex flex-col justify-center items-center gap-5 w-full h-[220px]'>
                                <div className='flex justify-center items-center border w-[75%]'>
                                    <div className='flex justify-center items-center space-x-3 w-full text-center'>
                                        {/* <div>{currency}</div> */}
                                       {
                                        subData 
                                            &&
                                        <CurrencyFormat value={newAmount == 0 ? subData && subData.cost_naira : newAmount} displayType={'text'} thousandSeparator={true} prefix={currency == "NGN" ? "₦" : currency == "USD" ? "$" : currency == "EURO" ? "€" : "£"} />
                                       }
                                    </div>
                                    <select onChange={(e: any) => onCurrencyChange(e.target.value)} className='w-[80%] border p-2 outline-none'>
                                        <option value="NGN">NAIRA NGN (₦)</option>
                                        <option value="USD">DOLLARS USD ($)</option>
                                        <option value="EURO">EURO EUR (€)</option>
                                        <option value="PND">POUND PND (£)</option>
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
  )
}

export default SubscriptionModal
