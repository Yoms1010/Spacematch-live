'use client';

import { useState } from 'react';

const CommunityPage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert('Profile created successfully! You can now proceed to find your match.');
        // In a real app, you'd handle form submission (e.g., API call) here.
        // You might then clear the form or navigate the user.
    };

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-24">
            <style jsx>{`
                .hero-background {
                    background-image: url('/community-banner.jpeg');
                    background-size: cover;
                    background-position: center;
                    position: relative;
                }
                .hero-background::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                }
            `}</style>

            <header className="hero-background shadow-sm rounded-xl p-6 mb-8 text-white">
                <div className="container mx-auto relative z-10 py-12 text-center max-w-4xl">
                    <h1 className="text-4xl font-extrabold md:text-5xl">Building a Community, Not Just Houses</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                        Spacematch is more than a platform; it's a community of pioneers redefining homeownership. Connect with people who share your values and build a future that is both financially smart and personally fulfilling.
                    </p>
                </div>
            </header>
            <main className="container mx-auto max-w-4xl">
                {/* Community Features Section */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c-1.38 0-2.5 1.12-2.5 2.5S10.62 11 12 11s2.5-1.12 2.5-2.5S13.38 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z"/>
                                </svg>
                                <span>Join a Community that Cares</span>
                            </h2>
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                Our community is built on a foundation of trust, collaboration, and shared values. When you join, you gain access to a network of individuals who are as committed as you are to making smart, long-term decisions about homeownership.
                            </p>
                            <p className="mt-2 text-gray-700 leading-relaxed">
                                Whether you're looking for an investment partner, a co-owner for a vacation home, or a group to build a future with, our platform is designed to help you find your perfect match and build a lasting relationship.
                            </p>
                        </div>
                        <div className="relative">
                            <img src="https://placehold.co/600x400/C89F5B/FFFFFF?text=Diverse+Community" alt="Diverse group of people in a community setting" className="rounded-lg shadow-md w-full" />
                        </div>
                    </div>
                </section>
                {/* Registration CTA and Form */}
                <section className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Ready to build your future together?</h2>
                    <p className="mt-2 text-gray-600 max-w-xl mx-auto">
                        Join our community of pioneers and start your journey towards a smarter, more fulfilling way to own a home.
                    </p>
                    <button
                        onClick={handleButtonClick}
                        className="mt-6 inline-flex items-center space-x-2 bg-purple-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                        <span>{isFormVisible ? 'Close Form' : 'Register to Join the Community'}</span>
                    </button>
                    {/* Registration Form (conditionally rendered) */}
                    {isFormVisible && (
                        <div className="mt-8 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Create Your Professional Profile</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Info */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c-1.38 0-2.5 1.12-2.5 2.5S10.62 11 12 11s2.5-1.12-2.5-2.5S13.38 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z"/>
                                        </svg>
                                        <span>Personal Information</span>
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                                            <input type="text" id="name" name="name" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                                            <input type="email" id="email" name="email" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                                            <input type="tel" id="phone" name="phone" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                </div>
                                {/* Professional Background */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                        </svg>
                                        <span>Professional Background</span>
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation *</label>
                                            <input type="text" id="occupation" name="occupation" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry *</label>
                                            <input type="text" id="industry" name="industry" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
                                            <input type="url" id="linkedin" name="linkedin" className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="https://www.linkedin.com/in/yourprofile" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">Profile Picture *</label>
                                            <input type="file" id="profile-picture" name="profile-picture" required className="mt-1 w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                                        </div>
                                    </div>
                                </div>
                                {/* Co-ownership Preferences */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                        <span>Co-Ownership Preferences</span>
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="investment-goals" className="block text-sm font-medium text-gray-700">Investment Goals *</label>
                                            <input type="text" id="investment-goals" name="investment-goals" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="financial-standing" className="block text-sm font-medium text-gray-700">Financial Standing (range) *</label>
                                            <input type="text" id="financial-standing" name="financial-standing" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Your Bio (for your profile) *</label>
                                            <textarea id="bio" name="bio" rows={4} required className="mt-1 w-full p-2 border border-gray-300 rounded-md"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-6">
                                    <button type="submit" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-purple-700 transition-colors duration-300">
                                        Create My Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default CommunityPage;
