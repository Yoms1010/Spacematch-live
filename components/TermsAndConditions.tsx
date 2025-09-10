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
                        <p>
                            Welcome to SpaceMatch! These Terms and Conditions ("Terms") govern your access to and use of the SpaceMatch website and services (collectively, "the Platform") operated by Spacematch Limited, a company registered under the laws of Nigeria with its principal office at First Unity Estate, Maryland, Oke-ira Badore, Ajah, Lagos.
                        </p>
                        <p>
                            Please read these Terms carefully before using the Platform. By accessing or using SpaceMatch, you agree to be bound by these Terms.
                        </p>
                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>1. Acceptance of Terms</span>
                            <p>
                                By registering on the Platform, browsing listings, creating property ads, or processing payments, you confirm that:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                    You are at least 18 years old and have the legal capacity to enter into a contract.
                                </li>
                                <li className="list-disc">
                                    You agree to comply with these Terms and our Privacy Policy.
                                </li>
                                <li className="list-disc">
                                    You agree to use Flutterwave as our third-party payment processor under their terms and policies: https://www.flutterwave.com/us/legal/terms
                                </li>
                            </ul>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>2. Services Offered</span>
                            <p>
                                SpaceMatch provides a platform that:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                    Enables real estate vendors to list and advertise properties for sale.
                                </li>
                                <li className="list-disc">
                                    Enables prospective buyers to find, negotiate, and co-develop shared property spaces.
                                </li>
                                <li className="list-disc">
                                    Facilitates payments and/or deposits using Flutterwave’s secure payment gateway.
                                </li>
                                <li className="list-disc">
                                   Matches buyers and vendors based on preferences and mutual interests.
                                </li>
                            </ul>
                            <p>
                               We do not own or manage properties listed on the site, nor are we involved in transactions beyond facilitating initial contact and payment processing.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>3. User Obligations</span>
                            <p>
                                All users (vendors and buyers) agree to:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Provide accurate, complete, and updated information during registration and listing.
                                </li>
                                <li className="list-disc">
                                   Use the Platform only for lawful purposes and not for fraudulent or malicious activity.
                                </li>
                                <li className="list-disc">
                                   Abide by all applicable laws and regulations in Nigeria and any other relevant jurisdiction.
                                </li>
                                <li className="list-disc">
                                   Refrain from uploading content that is illegal, offensive, or infringes on third-party rights.
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>4. Payment Terms</span>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Payments on SpaceMatch are processed via Flutterwave, a secure third-party payment gateway.
                                </li>
                                <li className="list-disc">
                                  By using SpaceMatch, you agree to Flutterwave’s Terms of Use and authorize us to collect payments on your behalf.
                                </li>
                                <li className="list-disc">
                                   Depending on your transaction, SpaceMatch may collect a service fee, commission, or escrow fee, which will be disclosed at the point of payment.
                                </li>
                                <li className="list-disc">
                                   Payment disputes, refunds, and chargebacks are subject to both our policies and those of Flutterwave.
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>5. Vendor Responsibilities</span>
                            <p>
                                Vendors must:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                  Ensure that property listings are truthful, up-to-date, and legally offered for sale.
                                </li>
                                <li className="list-disc">
                                   Provide required documentation upon request, including land ownership or authorization
                                </li>
                                <li className="list-disc">
                                   Abide by our vetting and verification processes before accepting payment from buyers.
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>6. Buyer Responsibilities</span>
                            <p>
                                Buyers must:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Conduct due diligence before committing to any property transaction.
                                </li>
                                <li className="list-disc">
                                   Understand that SpaceMatch is a matching and facilitation service, not a guarantor of land titles or transactions.
                                </li>
                                <li className="list-disc">
                                   Be aware of applicable taxes, levies, or government fees related to property ownership.
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>7. Intellectual Property</span>
                            <p>
                                All content on SpaceMatch, including logos, images, text, and software, is owned by Spacematch Limited or licensed to us. You may not reuse, copy, or reproduce content without prior written permission.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>8. Limitation of Liability</span>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   SpaceMatch is not liable for any disputes, losses, damages, or legal claims arising from property transactions or user misconduct.
                                </li>
                                <li className="list-disc">
                                   We do not guarantee that all listings are legitimate or that transactions will be completed successfully.
                                </li>
                                <li className="list-disc">
                                   You use this platform at your own risk.
                                </li>
                            </ul>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>9. Termination</span>
                            <p>
                               We reserve the right to suspend or terminate any account that violates these Terms, or if we suspect fraudulent or harmful behavior. We may also remove any content that violates our policies without prior notice.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>10. Governing Law</span>
                            <p>
                               These Terms shall be governed and interpreted according to the laws of the Federal Republic of Nigeria. Disputes arising from these Terms shall be subject to the exclusive jurisdiction of Nigerian courts.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>11. Updates and Modifications</span>
                            <p>
                               We may update these Terms from time to time. Continued use of the Platform after such updates constitutes your acceptance of the revised Terms.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>12. Contact Us</span>
                            <p>
                               For questions or concerns, contact us at:
                            </p>
                            <p>Email: info@spacematch.com.ng</p>
                            <p>Phone: +234 (0) 809 554 6085</p>
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

export default TermsAndConditions 