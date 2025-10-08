import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps{
    modalOpen: boolean,
    setModalOpen: (modalOpen: boolean) => void,
}

function PrivacyPolicy({modalOpen, setModalOpen}: ModalProps) {
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
                    className="relative transform overflow-hidden bg-white rounded-tr-xl rounded-bl-xl text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-gray-50 font-sans leading-normal tracking-normal h-[650px] rounded-tr-lg rounded-bl-lg">
                        <div className="max-w-2xl mx-auto p-3 sm:p-10 bg-white shadow-lg ">
                            <header className="text-center mb-3">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SpaceMatch Privacy Policy</h1>
                                <p className="text-md text-gray-500 mt-2"><strong>Effective Date:</strong> October 1, 2025</p>
                            </header>

                            <div className="prose max-w-none text-gray-700 h-[550px] overflow-y-scroll">
                                <p className="mb-6">Welcome to SpaceMatch! Your privacy is of paramount importance to us. This Privacy Policy explains how <strong>Spacematch Limited</strong> ("SpaceMatch," "we," "us," or "our"), a company registered under the laws of Nigeria, collects, uses, processes, and protects your personal data when you use our website and services (collectively, "the Platform"). [cite: 4] By using SpaceMatch, you consent to the data practices described in this policy, which is designed to comply with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and global data protection standards.</p>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">1. Data Controller and Contact Information</h2>
                                    <div className="space-y-2">
                                        <p><strong>Data Controller:</strong> Spacematch Limited</p>
                                        <p><strong>Principal Office:</strong> First Unity Estate, Maryland, Oke-ira Badore, Ajah, Lagos, Nigeria.</p>
                                        <p><strong>Data Privacy Officer:</strong> C Williams</p>
                                        <p><strong>Contact for Data Privacy Issues:</strong> <a href="mailto:inquiries@spacematch.com.ng" className="text-blue-600 hover:underline">inquiries@spacematch.com.ng</a> (Please include "ATTN: Data Privacy Officer: C Williams" in the subject line).</p>
                                    </div>
                                </section>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">2. Information We Collect</h2>
                                    <p>We collect personal data that is necessary for us to provide our matching and real estate facilitation services. This data falls into three categories:</p>
                                    
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">A. Information You Provide Directly</h3>
                                            <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                                                <li><strong>Identity Data:</strong> Your full name, gender, date of birth, and copies of government-issued IDs (e.g., NIN, Driver’s License, International Passport) for verification, particularly for vendors and high-value transactions. [cite: 16]</li>
                                                <li><strong>Contact Data:</strong> Email address, physical address (for vendors), and contact numbers.</li>
                                                <li><strong>Financial Data:</strong> Payment card details (tokenized and handled by our payment processor, <strong>SquadCo</strong>), bank account details (for vendors receiving payments), and transaction records.</li>
                                                <li><strong>Profile Data:</strong> Your username, password, preferences, feedback, and survey responses.</li>
                                                <li><strong>Property Data (Vendors):</strong> Detailed information about your listed properties, including location coordinates, legal documents, images, and pricing.</li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">B. Information We Collect Automatically</h3>
                                            <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                                                <li><strong>Usage Data:</strong> Details about how you use our Platform, including search history, property views, and duration of visits.</li>
                                                <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type, operating system, time zone setting, and other technology on the devices you use to access the Platform.</li>
                                                <li><strong>Location Data:</strong> General location derived from your IP address or specific location if you access the Platform using a mobile device and grant us permission.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">C. Information from Third Parties</h3>
                                            <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                                                <li><strong>Verification Data:</strong> We may obtain necessary verification information from trusted partners or public sources to comply with Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations in Nigeria.</li>
                                                <li><strong>Payment Processor Data:</strong> Confirmation of successful payments and transaction details from <strong>SquadCo</strong>.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">3. How We Use Your Information (Legal Basis)</h2>
                                    <p>We process your personal data under specific legal bases. The table below outlines the purposes for processing, the data used, and the legal grounds for doing so.</p>
                                    <div className="overflow-x-auto mt-4">
                                        <table className="min-w-full border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-600 uppercase">Purpose of Processing</th>
                                                    <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-600 uppercase">Data Used</th>
                                                    <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-600 uppercase">Legal Basis (NDPA & Global Standards)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="px-4 py-2 border">Service Provision</td>
                                                    <td className="px-4 py-2 border">Identity, Contact, Usage, Property Data</td>
                                                    <td className="px-4 py-2 border">Performance of a Contract</td>
                                                </tr>
                                                <tr className="bg-gray-50">
                                                    <td className="px-4 py-2 border">Security & Verification</td>
                                                    <td className="px-4 py-2 border">Identity, Technical, Financial Data</td>
                                                    <td className="px-4 py-2 border">Compliance with Legal Obligation</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2 border">Payment Processing</td>
                                                    <td className="px-4 py-2 border">Financial, Transaction Data</td>
                                                    <td className="px-4 py-2 border">Performance of a Contract</td>
                                                </tr>
                                                <tr className="bg-gray-50">
                                                    <td className="px-4 py-2 border">Platform Improvement</td>
                                                    <td className="px-4 py-2 border">Usage, Technical Data, Feedback</td>
                                                    <td className="px-4 py-2 border">Legitimate Interests</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2 border">Marketing</td>
                                                    <td className="px-4 py-2 border">Contact, Profile Data</td>
                                                    <td className="px-4 py-2 border">Consent or Legitimate Interests</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">4. Disclosure and Sharing of Your Information</h2>
                                    <p>We do not sell your personal data. We only share your data as necessary to provide our services and meet legal obligations:</p>
                                    <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                                        <li><strong>With Property Vendors and Buyers:</strong> To facilitate a potential transaction, we share relevant contact and profile information between matched buyers and vendors.</li>
                                        <li><strong>With Third-Party Service Providers:</strong> We use partners for payment processing (<strong>SquadCo</strong>), cloud hosting, analytics, and legal counsel. We share only the necessary information for them to perform their services.</li>
                                        <li><strong>For Legal Reasons:</strong> We may disclose your data if required by law, court order, or government regulation (e.g., Nigerian law enforcement agencies).</li>
                                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal data may be transferred.</li>
                                    </ul>
                                </section>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">5. International Data Transfers</h2>
                                    <p>As a platform with a global clientele, we may transfer your data outside of Nigeria to secure servers. When this occurs, we ensure that an adequate level of protection is afforded to your data through measures like standard contractual clauses or transferring to countries recognized by the <strong>Nigeria Data Protection Commission (NDPC)</strong> as having adequate data protection laws.</p>
                                </section>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">6. Data Security and Retention</h2>
                                    <h3 className="text-lg font-bold text-gray-800">Security</h3>
                                    <p>We implement robust technical and organizational measures like <strong>encryption</strong> and <strong>firewalls</strong> to protect your personal data from accidental loss, unauthorized access, alteration, or disclosure.</p>
                                    <h3 className="text-lg font-bold text-gray-800 mt-4">Retention</h3>
                                    <p>We retain your personal data only for as long as necessary to fulfill the purposes we collected it for, including for satisfying any legal, accounting, or reporting requirements under Nigerian law.</p>
                                </section>

                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">7. Your Data Protection Rights</h2>
                                    <p>Under the NDPA, you have the following rights:</p>
                                    <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                                        <li><strong>Right to be informed:</strong> To know how your data is processed.</li>
                                        <li><strong>Right of Access:</strong> To request a copy of the personal data we hold about you.</li>
                                        <li><strong>Right to Rectification:</strong> To have any incomplete or inaccurate data corrected.</li>
                                        <li><strong>Right to Erasure ('Right to be Forgotten'):</strong> To ask us to delete your personal data, subject to legal retention requirements.</li>
                                        <li><strong>Right to Restrict Processing:</strong> To ask us to suspend the processing of your data in certain circumstances.</li>
                                        <li><strong>Right to Object to Processing:</strong> To object to us processing your data where we rely on a legitimate interest.</li>
                                        <li><strong>Right to Data Portability:</strong> To request the transfer of your data to you or a third party in a machine-readable format.</li>
                                        <li><strong>Right to Withdraw Consent:</strong> To withdraw your consent at any time where we rely on it to process your data.</li>
                                    </ul>
                                    <p className="mt-4">To exercise any of these rights, please contact our Data Privacy Officer, <strong>C Williams</strong>, via email at <a href="mailto:inquiries@spacematch.com.ng" className="text-blue-600 hover:underline">inquiries@spacematch.com.ng</a>.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">8. Updates to this Policy</h2>
                                    <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our Platform and updating the "Effective Date." Continued use of the Platform after such updates constitutes your acceptance of the revised policy.</p>
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

export default PrivacyPolicy
