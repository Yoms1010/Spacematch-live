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
                        {/* <h3 className="text-xl font-semibold mt-6 mb-2">Refund Policy</h3> */}
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            Effective Date: 20.05.2025. At SpaceMatch, we are committed to transparency and fairness in every transaction. This Refund Policy explains the conditions under which users may request a refund and outlines our refund process.
                        </p>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mb-4">
                            <li><strong>General Policy:</strong> SpaceMatch connects vendors and buyers of real estate and facilitates secure transactions via Flutterwave. Our role is to enable secure matching and payment, not to act as a buyer, seller, or legal agent for property transfer.</li>
                            <li><strong>Eligibility for Refund:</strong> Refunds may only be considered under the following conditions: Duplicate payment or overcharge due to a technical error. Payment was made in error before transaction finalization. The vendor failed to respond, and no contract or agreement was signed. The transaction was cancelled before any formal agreement, contract signing, or legal documentation was issued.
                            <p className="font-semibold text-red-600 mt-2">❗No refunds will be issued once a buyer has:</p>
                            <ul className="list-disc list-inside ml-4">
                                <li>Entered into a formal agreement,</li>
                                <li>Signed a legal contract with the vendor,</li>
                                <li>Or if a plot/unit has been allocated.</li>
                            </ul>
                            </li>
                            <li><strong>Refund Request Process:</strong> Email customersupport@spacematch.com.ng within 7 days of the transaction. Provide your: Full name, Transaction ID, Reason for refund request, Evidence of error, if applicable.</li>
                            <li><strong>Processing Time:</strong> Approved refunds will be processed within 5–10 working days and will be credited via the original payment method through Flutterwave.</li>
                            <li><strong>Chargebacks:</strong> If you initiate a chargeback through your bank or card provider without contacting us first, we reserve the right to suspend your account and take legal action if the claim is found to be invalid.</li>
                            <li><strong>Contact Us:</strong> For any questions regarding refunds, email us at customersupport@spacematch.com.ng</li>
                        </ol>
                        
                        <h3 className="text-xl font-semibold mt-6 mb-2">Privacy Policy for SpaceMatch</h3>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            Effective Date: 20.05.2025. At SpaceMatch, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data in line with applicable laws (such as the Nigeria Data Protection Regulation – NDPR) and Flutterwave’s compliance requirements.
                        </p>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                            <li><strong>Information We Collect:</strong> We collect the following types of information: Personal Identification (Name, phone number, email, residential address), Property Information (Listings, documents, coordinates), Payment Data (Collected via Flutterwave), Device/Browser Information (IP address, browser type, cookies).</li>
                            <li><strong>How We Use Your Information:</strong> Your information is used to: Create and manage your account, Match you with property vendors or buyers, Facilitate secure payments via Flutterwave, Improve our services and platform performance, Send you updates, offers, or legal notices (if opted in).</li>
                            <li><strong>Data Sharing:</strong> We do not sell or rent your data. However, we may share your information with: Flutterwave (for payment processing), Government authorities (if legally required), Verified vendors or buyers as part of a transaction, Our internal team and service providers (under strict confidentiality).</li>
                            <li><strong>Cookies and Tracking:</strong> We use cookies to: Improve website functionality, Analyze user behavior and preferences, Manage login sessions and security. You may disable cookies in your browser settings, though some features may not function correctly.</li>
                            <li><strong>Data Security:</strong> We use SSL encryption, server firewalls, and secure data protocols to safeguard your information. Your payment data is handled entirely by Flutterwave’s PCI-DSS-compliant system.</li>
                            <li><strong>Your Rights:</strong> You have the right to: Access and request a copy of your data, Request correction or deletion of your data, Withdraw consent to data processing (if applicable).</li>
                            <li><strong>Third-Party Links:</strong> We use SSL encryption, server firewalls, and secure data protocols to safeguard your information. Your payment data is handled entirely by Flutterwave’s PCI-DSS-compliant system.</li>
                            <li><strong>Children’s Privacy:</strong> Our services are not intended for users under 18. We do not knowingly collect data from minors.</li>
                            <li><strong>Changes to This Policy:</strong> We reserve the right to update this policy. We will notify you via email or website notice if significant changes are made.</li>
                            <li><strong>Contact Us:</strong> For questions or concerns, contact us at: Email: info@spacematch.com.ng Phone: +234 (0) 809 554 6085</li>
                        </ol>
                    </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>
  )
}

export default RefundPolicy
