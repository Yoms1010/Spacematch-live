'use client'


import React, { useState, useEffect } from 'react';

// It's a good practice to define components for reusable parts, 
// but for a single file, we'll keep them here.

const PropertyCard = ({ imageSrc, altText, title, description, location, onButtonClick }: { imageSrc: any, altText: any, title: any, description: any, location: any, onButtonClick: any }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={imageSrc} alt={altText} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center text-gray-500 mb-4">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                <span>{location}</span>
            </div>
            <button onClick={onButtonClick} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                Proceed to Due Diligence
            </button>
        </div>
    </div>
);

const SubscriptionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out" onClick={onClose}>
            <div className="modal-content bg-white w-full max-w-md mx-auto rounded-xl shadow-2xl p-8 text-center transform transition-transform duration-300 ease-in-out scale-100" onClick={e => e.stopPropagation()}>
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 mb-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Unlock Full Property Details</h3>
                <p className="text-gray-600 mb-6">To access comprehensive due diligence reports, official land verification, and secure documentation, please choose a subscription plan.</p>
                
                <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span>Connect directly to legal advicers to initiate searches for the property with Land Registry.</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span>Receive documentation for verification from vendor.</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span>Secure your land with confidence.</span>
                    </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                        href="https://www.spacematch.com.ng" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 inline-block"
                    >
                        View Subscription Plans
                    </a>
                    <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300">
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function PropertyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showSubscriptionModal = () => setIsModalOpen(true);
    const hideSubscriptionModal = () => setIsModalOpen(false);

    useEffect(() => {
        const handleEscKey = (event: any) => {
            if (event.key === 'Escape') {
                hideSubscriptionModal();
            }
        };

        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscKey);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);


    const properties = [
        {
            imageSrc: "https://placehold.co/600x400/3498db/ffffff?text=Lekki+Peninsula+Plot",
            altText: "Property in Lekki Peninsula",
            title: "Plot in Lekki Peninsula",
            description: "A prime plot of land with significant investment potential. Basic details available.",
            location: "Lagos, Nigeria"
        },
        {
            imageSrc: "https://placehold.co/600x400/2ecc71/ffffff?text=Asokoro+District+Land",
            altText: "Property in Asokoro District",
            title: "Land in Asokoro District",
            description: "Exclusive land in a highly sought-after district. Verification required for more info.",
            location: "Abuja, Nigeria"
        },
        {
            imageSrc: "https://placehold.co/600x400/e74c3c/ffffff?text=GRA+Phase+2+Site",
            altText: "Property in Port Harcourt",
            title: "Site in GRA Phase 2",
            description: "Commercial-ready site in a strategic location. Subscribe to verify ownership.",
            location: "Port Harcourt, Nigeria"
        }
    ];

    return (
        <>
            {/* In a real Next.js app, you'd use the Head component 
              from 'next/head' to manage the document head.
              <Head>
                <title>Property Matches - Subscription Required</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
              </Head>
            */}
            
            <div className="bg-gray-50 text-gray-800 font-['Inter',_sans-serif]">
                <div id="main-content" className="container mx-auto px-4 py-8 md:py-12">
                    <header className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Matched Properties</h1>
                        <p className="text-lg text-gray-600 mt-2">Based on your criteria, here are the properties we've found for you.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((prop, index) => (
                            <PropertyCard 
                                key={index}
                                {...prop}
                                onButtonClick={showSubscriptionModal}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <SubscriptionModal isOpen={isModalOpen} onClose={hideSubscriptionModal} />
        </>
    );
}