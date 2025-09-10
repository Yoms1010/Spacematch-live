import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps{
    modalOpen: boolean,
    setModalOpen: (modalOpen: boolean) => void,
}

function RefundPolicy({modalOpen, setModalOpen}: ModalProps) {
  return (
    <div className='modal'>
        <Dialog open={modalOpen} onClose={setModalOpen} className="relative z-10">
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
                            Spacematch Refund Policy
                        </div>
                        <button
                            type="button"
                            data-autofocus
                            onClick={() => setModalOpen(false)}
                            className="inline-flex w-full justify-center rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            X
                        </button>
                        </div>
                    </div>
                        <div className='modal-body p-3 h-[460px] overflow-y-scroll flex flex-col gap-3 text-sm'>
                        <p className='font-semibold'>Effective Date: 20.05.2025</p>
                        <p>
                           At <b>SpaceMatch</b>, we are committed to transparency and fairness in every transaction. This Refund Policy explains the conditions under which users may request a refund and outlines our refund process.
                        </p>
                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>1. General Policy</span>
                            <p>
                               SpaceMatch connects vendors and buyers of real estate and facilitates secure transactions via Flutterwave. Our role is to enable secure matching and payment, not to act as a buyer, seller, or legal agent for property transfer.
                            </p>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>2. Eligibility for Refund</span>
                            <p>
                                Refunds may only be considered under the following conditions:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                    Duplicate payment or overcharge due to a technical error.
                                </li>
                                <li className="list-disc">
                                    Payment was made in error before transaction finalization.
                                </li>
                                <li className="list-disc">
                                    The vendor failed to respond, and no contract or agreement was signed.
                                </li>
                                <li className="list-disc">
                                   The transaction was cancelled before any formal agreement, contract signing, or legal documentation was issued.
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>❗No refunds will be issued once a buyer has:</span>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Entered into a formal agreement,
                                </li>
                                <li className="list-disc">
                                   Signed a legal contract with the vendor,
                                </li>
                                <li className="list-disc">
                                   Or if a plot/unit has been allocated.
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>3. Refund Request Process</span>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   1.	Email customersupport@spacematch.com.ng within 7 days of the transaction.
                                </li>
                                <li className="list-disc">
                                  2.	Provide your:
                                </li>
                                <ul className='flex flex-col gap-3 pl-5'>
                                    <li>
                                        o	Full name
                                    </li>
                                    <li>
                                        o	Transaction ID
                                    </li>
                                    <li>
                                        o	Reason for refund request
                                    </li>
                                    <li>
                                        o	Evidence of error, if applicable
                                    </li>
                                </ul>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>4. Processing Time</span>
                            <p>
                                Approved refunds will be processed within <b>5–10 working days</b> and will be credited via the original payment method through <b>Flutterwave</b>.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>5. Chargebacks</span>
                            <p>
                                If you initiate a chargeback through your bank or card provider without contacting us first, we reserve the right to suspend your account and take legal action if the claim is found to be invalid.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>6. Contact Us</span>
                            <p>
                                For any questions regarding refunds, email us at <b>customersupport@spacematch.com.ng</b> 
                            </p>
                        </div>

                        <div className='flex flex-col gap-2 mt-10'>
                            <span className='text-xl font-bold'>Privacy Policy for SpaceMatch</span>
                            <b>Effective Date: 20.05.2025</b>
                            <p>At <b>SpaceMatch</b>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data in line with applicable laws (such as the Nigeria Data Protection Regulation – NDPR) and Flutterwave’s compliance requirements.</p>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>1. Information We Collect</span>
                            <p>
                               We collect the following types of information:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Personal Identification: Name, phone number, email, residential address
                                </li>
                                <li className="list-disc">
                                   Property Information: Listings, documents, coordinates
                                </li>
                                <li className="list-disc">
                                   Payment Data: Collected via Flutterwave (we do not store credit card or banking details directly)
                                </li>
                                <li className="list-disc">
                                   Device/Browser Information: IP address, browser type, cookies
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>2. How We Use Your Information</span>
                            <p>
                               Your information is used to:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Create and manage your account
                                </li>
                                <li className="list-disc">
                                   Match you with property vendors or buyers
                                </li>
                                <li className="list-disc">
                                   Facilitate secure payments via Flutterwave
                                </li>
                                <li className="list-disc">
                                   Improve our services and platform performance
                                </li>
                                <li className="list-disc">
                                   Send you updates, offers, or legal notices (if opted in)
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>3. Data Sharing</span>
                            <p>
                              We do not sell or rent your data. However, we may share your information with:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   •	Flutterwave (for payment processing)
                                </li>
                                <li className="list-disc">
                                   •	Government authorities (if legally required)
                                </li>
                                <li className="list-disc">
                                   •	Verified vendors or buyers as part of a transaction
                                </li>
                                <li className="list-disc">
                                   •	Our internal team and service providers (under strict confidentiality)
                                </li>
                                
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>4. Cookies and Tracking</span>
                            <p>
                             We use cookies to:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Improve website functionality
                                </li>
                                <li className="list-disc">
                                   Analyze user behavior and preferences
                                </li>
                                <li className="list-disc">
                                   Manage login sessions and security
                                </li>
                            </ul>
                            <p>
                                You may disable cookies in your browser settings, though some features may not function correctly.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>5. Data Security</span>
                            <p>
                             We use SSL encryption, server firewalls, and secure data protocols to safeguard your information. Your payment data is handled entirely by Flutterwave’s PCI-DSS-compliant system.
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Improve website functionality
                                </li>
                                <li className="list-disc">
                                   Analyze user behavior and preferences
                                </li>
                                <li className="list-disc">
                                   Manage login sessions and security
                                </li>
                            </ul>
                            <p>
                                You may disable cookies in your browser settings, though some features may not function correctly.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>6. Your Rights</span>
                            <p>
                             You have the right to:
                            </p>
                            <ul className='flex flex-col gap-3 pl-5'>
                                <li className="list-disc">
                                   Access and request a copy of your data
                                </li>
                                <li className="list-disc">
                                   Request correction or deletion of your data
                                </li>
                                <li className="list-disc">
                                   Withdraw consent to data processing (if applicable)
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>7. Third-Party Links</span>
                            <p>
                             We use SSL encryption, server firewalls, and secure data protocols to safeguard your information. Your payment data is handled entirely by Flutterwave’s PCI-DSS-compliant system.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>8. Children’s Privacy</span>
                            <p>
                            Our services are not intended for users under 18. We do not knowingly collect data from minors.
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>9. Changes to This Policy</span>
                            <p>
                             We reserve the right to update this policy. We will notify you via email or website notice if significant changes are made.
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold'>10. Contact Us</span>
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

export default RefundPolicy
