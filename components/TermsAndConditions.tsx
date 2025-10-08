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
                    className="relative transform overflow-hidden rounded-tr-xl rounded-bl-xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                <div className="bg-gray-50 font-sans leading-normal tracking-normal h-[650px]">
                    <div className="max-w-2xl mx-auto p-5 sm:p-10 bg-white shadow-lg">
                        <header className="text-center mb-5">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SpaceMatch Terms and Conditions</h1>
                            <p className="text-md text-gray-500 mt-2"><strong>Effective Date:</strong> October 1, 2025</p>
                        </header>

                        <div className="prose max-w-none text-gray-700 h-[500px] overflow-y-scroll">
                            <p className="mb-4">Welcome to SpaceMatch! These Terms and Conditions ("Terms") govern your access to and use of the SpaceMatch website and services (collectively, "the Platform") operated by <strong>Spacematch Limited</strong>, a company registered under the laws of the Federal Republic of Nigeria</p>
                            <p className="mb-6">Please read these Terms carefully. By accessing, browsing, or registering on the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy</p>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">1. Acceptance of Terms and Eligibility</h2>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">1.1 Acceptance</h3>
                                <p>By using the Platform, you affirm that you are at least <strong>18 years old</strong> and have the legal capacity to enter into this contract If you are using the Platform on behalf of an entity, you warrant that you have the authority to bind that entity to these Terms</p>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">1.2 Updates</h3>
                                <p>SpaceMatch reserves the right to modify these Terms at any time We will provide notice of material changes, and your continued use of the Platform after such changes constitutes your acceptance of the new Terms77].</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">2. The SpaceMatch Service and Role</h2>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">2.1 Service Overview</h3>
                                <p>SpaceMatch provides an online platform that acts as a neutral intermediary for real estate transactions by</p>
                                <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                                    <li>Enabling <strong>Vendors</strong> to list and manage properties</li>
                                    <li>Enabling <strong>Buyers</strong> to search for and communicate with Vendors</li>
                                    <li>Facilitating the matching of Buyers and Vendors</li>
                                    <li>Facilitating agreements, including for <strong>co-development or shared property ownership</strong></li>
                                    <li>Processing initial payments and fees through a secure third-party gateway</li>
                                </ul>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">2.2 Our Limited Role</h3>
                                <p>SpaceMatch is a facilitator, not a principal party to any transaction We do not own, manage, or inspect properties, act as an agent, or guarantee the legality or quality of listings. All due diligence is the sole responsibility of the Vendor and Buyer</p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">3. User Obligations and Account Management</h2>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">3.1 Registration and Information</h3>
                                <p>All users must provide <strong>accurate, complete, and current information</strong> during registration and maintain its accuracy</p>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">3.2 Account Security</h3>
                                <p>You are responsible for safeguarding your password and for all activities under your account You must notify us immediately of any suspected security breach at <a href="mailto:inquiries@spacematch.com.ng" className="text-blue-600 hover:underline">inquiries@spacematch.com.ng</a></p>
                                <h3 className="text-lg font-bold text-gray-800 mt-4">3.3 Prohibited Conduct</h3>
                                <p>Users agree not to use the Platform to post false or fraudulent information, violate any laws, or upload offensive or infringing content.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">4. Payment Terms (SquadCo)</h2>
                                <p>All payments are processed by our third-party payment gateway, <strong>SquadCo (SQUAD)</strong>. By initiating a payment, you agree to be bound by SquadCo's terms and conditions. SpaceMatch is not responsible for issues arising from payment processing by SquadCo. All applicable service fees will be disclosed at the point of payment confirmation.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">5. Vendor Specific Obligations</h2>
                                <p>Vendors warrant that all property listings are truthful and accurate. Within Nigeria, Vendors must possess all valid titles and documentation (e.g., Certificates of Occupancy) and ensure the property is free from any dispute. Vendors must also participate in our vetting processes.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">6. Buyer Specific Obligations</h2>
                                <p>Buyers bear the <strong>sole responsibility</strong> for conducting comprehensive legal and physical due diligence on any property. This includes verifying titles, inspecting the property, and engaging independent legal counsel. Buyers assume all risks associated with property transactions in the Nigerian market.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">7. Intellectual Property</h2>
                                <p>All content on the Platform is the property of <strong>Spacematch Limited</strong> or its suppliers and is protected by copyright and trademark laws. You may not use any content without our prior written consent.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">8. Disclaimers and Limitation of Liability</h2>
                                <p className="font-bold uppercase">The platform and all listings are provided "as is" and "as available". Spacematch Limited expressly disclaims all warranties of any kind.</p>
                                <p className="mt-4">To the fullest extent permitted by law, Spacematch Limited shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from any transaction between users or the use of the platform.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">9. Indemnification</h2>
                                <p>You agree to indemnify and hold harmless Spacematch Limited from any claims, damages, and losses arising from your breach of these Terms, violation of any law, or any transaction you facilitate through the Platform.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">10. Governing Law and Dispute Resolution</h2>
                                <p>These Terms shall be governed by the laws of the <strong>Federal Republic of Nigeria</strong>. Any disputes will be subject to the exclusive jurisdiction of the competent courts in <strong>Lagos State, Nigeria</strong>.</p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">11. Termination</h2>
                                <p>SpaceMatch may terminate or suspend your account and access to the Platform immediately if you breach these Terms.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">12. Contact Information</h2>
                                <p>For any questions or concerns, please contact us:</p>
                                <ul className="list-none mt-2 space-y-1">
                                    <li><strong>Email:</strong> <a href="mailto:inquiries@spacematch.com.ng" className="text-blue-600 hover:underline">inquiries@spacematch.com.ng</a> </li>
                                    <li><strong>Address:</strong> First Unity Estate, Maryland, Oke-ira Badore, Ajah, Lagos, Nigeria.</li>
                                </ul>
                            </section>
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