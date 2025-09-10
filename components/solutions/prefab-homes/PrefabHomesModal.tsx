'use client'

import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import PrefabCart from '@/components/solutions/prefab-homes/PrefabCart';
import StudioBuild from './StudioBuild';
import OneBedBuild from './OneBedBuild';
import TwoBedBuild from './TwoBedBuild';


interface ModalProps{
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void,
    homeData: any
}

const prefabEquipments = [
    {
        title: "0.6M Wardrobe",
        value: "wardrobe",
        cost: 728257
    },
    {
        title: "Wires, sockets, switches, lights, and water pipes",
        value: "electrical appliance",
        cost: 825000
    },
    {
        title: "1.8Hotel mattress 1.8m bed + mattress",
        value: "mattress",
        cost: 247500
    },
    {
        title: "SOFA：210*89*80  SOFA BED：185*138*43",
        value: "sofa",
        cost: 962500
    },
    {
        title: "3M Cabinet",
        value: "cabinet",
        cost: 2838150
    },
    {
        title: "2.04M Hanging cabinet",
        value: "hanging-cabinet",
        cost: 661384
    },
    {
        title: "Steps",
        value: "steps",
        cost: 324360
    },
    {
        title: "triplex glass",
        value: "glass",
        cost: 1351500
    },
    {
        title: "2+3P 2+3P Inverter Heating & Cooling Air-conditioning",
        value: "Inverter;Heating&cooling-AC",
        cost: 3458400
    },
    {
        title: "17.1*2.34 curtain",
        value: "curtain",
        cost: 973080
    },
    {
        title: "Motorised curtain track",
        value: "motorised-curtain-track",
        cost: 810900
    },
    {
        title: "Refrigerator",
        value: "refrigerator",
        cost: 675750
    },
    {
        title: "Built-in single-head induction hob",
        value: "inducation-hob",
        cost: 243270
    },
    {
        title: "595*595*850mm Washing machine",
        value: "washing-machine",
        cost: 946050
    },
    {
        title: "Extractor hoods",
        value: "extractor-hood",
        cost: 324360
    }
]

function PrefabHomesModal({openModal, setOpenModal, homeData}: ModalProps) {

    const [modalOpen, setModalOpen] = useState<any>(false)

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
                                Build your appartment ({homeData?.title})
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
                        <div className='modal-body p-3 h-[500px]'>
                            {
                                homeData?.title === "Studio"
                                ?
                                (
                                    <StudioBuild prefabEquipments={prefabEquipments} setOpenModal={setOpenModal} setModalOpen={setModalOpen} homeData={homeData} />
                                )
                                :
                                homeData?.title === "One Bed"
                                ?
                                (
                                    <OneBedBuild prefabEquipments={prefabEquipments} setOpenModal={setOpenModal} setModalOpen={setModalOpen} homeData={homeData} />
                                )
                                :
                                (
                                    <TwoBedBuild prefabEquipments={prefabEquipments} setOpenModal={setOpenModal} setModalOpen={setModalOpen} homeData={homeData} />
                                )
                            }
                        </div>
                    </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>

        <PrefabCart modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default PrefabHomesModal
