import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps{
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void,
    homeData: number
}

function PrefabHomesModal({openModal, setOpenModal, homeData}: ModalProps) {
  return (
    <div className='modal'>
        <Dialog open={openModal} onClose={setOpenModal} className="relative">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-[550px]">
                        <div className="sm:flex sm:items-start mb-5">
                            <div className="flex flex-row justify-between items-center mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                            <div className="flex space-x-2 text-xl font-bold text-gray-900">
                                Build your appartment (Studio)
                            </div>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpenModal(false)}
                                className="inline-flex w-full justify-center rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                X
                            </button>
                            </div>
                        </div>
                        <div className='modal-body p-3 h-[460px] overflow-y-scroll flex flex-col gap-3 text-sm'>
                            <div className='flex justify-center'>
                                <span className='font-semibold'>Select Equipment to Furnish your Home</span>
                            </div>
                            <div className='flex justify-start space-x-2 border w-full h-[200px] overflow-y-scroll p-3'>
                                <div className="checkbox-toolbar">
                                    <input type="checkbox" name="triggerOption" className="" value="air conditional"/>
                                    <label htmlFor="triggerOption">A.C</label>
                                </div> 

                                <div className="checkbox-toolbar">
                                    <input type="checkbox" className=""value="Deep Freezer"/>
                                    <label htmlFor="becomeConsultant">Deep Freezer</label> 
                                </div>
                                    
                            
                                <div className="checkbox-toolbar">
                                    <input type="checkbox" value="Dinning Set"/>
                                    <label htmlFor="dinning-set">Dinning Set</label> 
                                </div>
                                
                            </div>
                            <div className='flex justify-center items-center border p-2 w-full'>
                                <span>{homeData}</span>
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

export default PrefabHomesModal
