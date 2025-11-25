'use client'

import Link from 'next/link';
import React from 'react';

// --- SVG Path Constants ---
const UserProfileIconPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 11 12 11s-2.5-1.12-2.5-2.5S10.62 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z";
const SmileCirclePath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9.5 11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1-1.5zm5.5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM12 17c-2.33 0-4.32-1.5-5.12-3.5h10.24c-.81 2-2.8 3.5-5.12 3.5z";

// Placeholder image URLs
const HERO_IMAGE_URL = '/terratribe/banner1.png';
const MAIN_CONTENT_IMAGE = '/terratribe/connecting.png';

// Main TerraTribe Component
const TerraTribe: React.FC = () => {
    // Define the style object for the hero background image
    const heroStyle = {
        backgroundImage: `url('${HERO_IMAGE_URL}')`,
    };

    return (
        // Apply Inter font and responsive padding
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-5 font-['Inter']">
            <div className="container mx-auto">

                {/* --- Header Section (Hero) --- */}
                <header
                    className="relative shadow-xl rounded-xl p-6 sm:p-12 mb-8 text-center text-white bg-cover bg-center overflow-hidden"
                    style={heroStyle}
                >
                    {/* Dark Overlay (equivalent to ::before pseudo-element in CSS) */}
                    <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>

                    {/* Content Container (z-index ensures it sits above the overlay) */}
                    <div className="relative z-10 py-6 sm:py-12 text-gray-950">
                        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                            Connect with like-minded individuals or groups who share your vision for co-ownership.
                        </h1>
                        <p className="mt-4 text-md sm:text-lg opacity-90">
                            Our platform uses a safe, transparent, and intelligent matchmaker to connect you with people who share your goals for location, budget, and lifestyle.
                        </p>
                    </div>
                </header>

                <main className="w-full">

                    {/* --- 1. Core Pitch & CTA Section --- */}
                    <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                            {/* Text and Button */}
                            <div className="space-y-6">
                                <p className="text-gray-700 leading-relaxed text-base">
                                    Say goodbye to the hassle of finding co-owners on your own. We streamline the process by connecting you with a tribe that's right for you. Our platform ensures every match is based on shared preferences, giving you the confidence to start your journey together.
                                </p>
                                <Link
                                    href="/products/terra-tribe/co-ownership-goals"
                                    className="inline-flex items-center space-x-2 bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
                                // onClick={(e) => { e.preventDefault(); console.log('Find Your Match clicked'); }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={UserProfileIconPath} />
                                    </svg>
                                    <span>Find Your Match</span>
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="relative order-first md:order-last">
                                <img
                                    src={MAIN_CONTENT_IMAGE}
                                    alt="Diverse group of people connecting"
                                    className="rounded-xl shadow-2xl w-full"
                                    onError={(e: any) => e.target.src = 'https://placehold.co/600x400/94A3B8/FFFFFF?text=Connect+With+Partners'} // Simple error fallback
                                />
                            </div>
                        </div>
                    </section>

                    {/* --- 2. Social Proof/Testimonial Section --- */}
                    <section className="mt-8 text-center pb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d={SmileCirclePath} />
                            </svg>
                            <span>Join the tribe that’s redefining property ownership.</span>
                        </h2>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {/* Success Story 1 */}
                            <img
                                src="https://placehold.co/300x200/C89F5B/FFFFFF?text=Matchmaker+Success+Story+1"
                                alt="Success story 1"
                                className="rounded-xl shadow-lg w-full transition-transform duration-300 hover:scale-[1.02]"
                                onError={(e: any) => e.target.style.display = 'none'}
                            />
                            {/* Success Story 2 */}
                            <img
                                src="https://placehold.co/300x200/5C8A79/FFFFFF?text=Matchmaker+Success+Story+2"
                                alt="Success story 2"
                                className="rounded-xl shadow-lg w-full transition-transform duration-300 hover:scale-[1.02]"
                                onError={(e: any) => e.target.style.display = 'none'}
                            />
                            {/* Success Story 3 */}
                            <img
                                src="https://placehold.co/300x200/6D28D9/FFFFFF?text=Matchmaker+Success+Story+3"
                                alt="Success story 3"
                                className="rounded-xl shadow-lg w-full transition-transform duration-300 hover:scale-[1.02]"
                                onError={(e: any) => e.target.style.display = 'none'}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default TerraTribe;
