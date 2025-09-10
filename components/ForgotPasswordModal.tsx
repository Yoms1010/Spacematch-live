'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import InputField from './InputField';


interface ModalProps{
    isForgotPasswordModalOpen: boolean, 
    setIsForgotPasswordModalOpen: any;
}

function ForgotPasswordModal({isForgotPasswordModalOpen, setIsForgotPasswordModalOpen}: ModalProps) {

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: ""})

    function handlePasswordReset(): void {
        
    }

  return (
    <div className='modal'>
        <Dialog open={isForgotPasswordModalOpen} onClose={setIsForgotPasswordModalOpen} className="relative z-10">
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
                            {/* Subscribing for &nbsp;<div className='text-main-100'>{subData&&subData.item}</div>&nbsp; Plan */}
                        </div>
                        <button
                            type="button"
                            data-autofocus
                            onClick={() => setIsForgotPasswordModalOpen(false)}
                            className="inline-flex w-full justify-center rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            X
                        </button>
                        </div>
                    </div>
                        <div className='modal-body'>
                            <InputField
                                title="Email"
                                type='text'
                                value={form.email}
                                handleChangeText={(e: any) => setForm({...form, email: e.target.value})}
                                placeholder='Enter your email address'
                                disabled={false}
                                required={true}
                                otherStyles='w-full'
                            /> 

                            <div className='mt-10'>
                                <button 
                                    type='submit' 
                                    onClick={handlePasswordReset}
                                    disabled={loading}
                                    className='bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded text-center flex justify-center'
                                >
                                    {
                                        loading 
                                        ?
                                        <Loader className='animate-spin'/>
                                        :
                                        "Sign In"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>
  )
}

export default ForgotPasswordModal
