import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps{
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void,
}
const TermsAndConditions = ({openModal, setOpenModal}: ModalProps) => {

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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-[550px]">
                    <div className="sm:flex sm:items-start mb-5">
                        <div className="flex flex-row justify-between items-center mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <div className="flex space-x-2 text-xl font-bold text-gray-900">
                            Spacematch Terms & Conditions
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
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            Welcome to SpaceMatch! These Terms and Conditions ("Terms") govern your access to and use of the SpaceMatch website and services (collectively, "the Platform") operated by Spacematch Limited, a company registered under the laws of Nigeria with its principal office at First Unity Estate, Maryland, Oke-ira Badore, Ajah, Lagos. Please read these Terms carefully before using the Platform. By accessing or using SpaceMatch, you agree to be bound by these Terms.
                        </p>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mb-4">
                            <li><strong>Acceptance of Terms:</strong> By registering on the Platform, browsing listings, creating property ads, or processing payments, you confirm that: You are at least 18 years old and have the legal capacity to enter into a contract. You agree to comply with these Terms and our Privacy Policy. You agree to use Flutterwave as our third-party payment processor under their terms and policies: https://www.flutterwave.com/us/legal/terms</li>
                            <li><strong>Services Offered:</strong> SpaceMatch provides a platform that: Enables real estate vendors to list and advertise properties for sale. Enables prospective buyers to find, negotiate, and co-develop shared property spaces. Facilitates payments and/or deposits using Flutterwave’s secure payment gateway. Matches buyers and vendors based on preferences and mutual interests. We do not own or manage properties listed on the site, nor are we involved in transactions beyond facilitating initial contact and payment processing.</li>
                            <li><strong>User Obligations:</strong> All users (vendors and buyers) agree to: Provide accurate, complete, and updated information during registration and listing. Use the Platform only for lawful purposes and not for fraudulent or malicious activity. Abide by all applicable laws and regulations in Nigeria and any other relevant jurisdiction. Refrain from uploading content that is illegal, offensive, or infringes on third-party rights.</li>
                            <li><strong>Payment Terms:</strong> Payments on SpaceMatch are processed via Flutterwave, a secure third-party payment gateway. By using SpaceMatch, you agree to Flutterwave’s Terms of Use and authorize us to collect payments on your behalf. Depending on your transaction, SpaceMatch may collect a service fee, commission, or escrow fee, which will be disclosed at the point of payment. Payment disputes, refunds, and chargebacks are subject to both our policies and those of Flutterwave.</li>
                            <li><strong>Vendor Responsibilities:</strong> Vendors must: Ensure that property listings are truthful, up-to-date, and legally offered for sale. Provide required documentation upon request, including land ownership or authorization. Abide by our vetting and verification processes before accepting payment from buyers.</li>
                            <li><strong>Buyer Responsibilities:</strong> Buyers must: Conduct due diligence before committing to any property transaction. Understand that SpaceMatch is a matching and facilitation service, not a guarantor of land titles or transactions. Be aware of applicable taxes, levies, or government fees related to property ownership.</li>
                            <li><strong>Intellectual Property:</strong> All content on SpaceMatch, including logos, images, text, and software, is owned by Spacematch Limited or licensed to us. You may not reuse, copy, or reproduce content without prior written permission.</li>
                            <li><strong>Limitation of Liability:</strong> SpaceMatch is not liable for any disputes, losses, damages, or legal claims arising from property transactions or user misconduct. We do not guarantee that all listings are legitimate or that transactions will be completed successfully. You use this platform at your own risk.</li>
                            <li><strong>Termination:</strong> We reserve the right to suspend or terminate any account that violates these Terms, or if we suspect fraudulent or harmful behavior. We may also remove any content that violates our policies without prior notice.</li>
                            <li><strong>Governing Law:</strong> These Terms shall be governed and interpreted according to the laws of the Federal Republic of Nigeria. Disputes arising from these Terms shall be subject to the exclusive jurisdiction of Nigerian courts.</li>
                            <li><strong>Updates and Modifications:</strong> We may update these Terms from time to time. Continued use of the Platform after such updates constitutes your acceptance of the revised Terms.</li>
                            <li><strong>Contact Us:</strong> For questions or concerns, contact us at: Email: info@spacematch.com.ng Phone: +234 (0) 809 554 6085</li>
                        </ol>
                    </div>
                </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>
  )
}

export default TermsAndConditions 