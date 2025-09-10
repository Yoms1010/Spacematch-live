import FAQSection from '@/components/faq/FAQSection';
import Footer from '@/components/Footer';
import { faqData } from '@/constants';
import React, { Key } from 'react';

// This component is a Server Component by default in Next.js 13+ App Router
export default function FAQPage() {
  return (
    <div className="bg-gray-100 min-h-screen font-inter">
        <div className='pt-28 pb-5'>
            <header className="bg-white shadow-sm rounded-xl p-6 mb-8 text-center">
                <div className="container mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800">Frequently Asked Questions</h1>
                <p className="mt-2 text-lg text-gray-600">
                    A comprehensive guide to all our solutions, designed to answer your questions and save you time.
                </p>
                </div>
            </header>

            <main className="container mx-auto space-y-6">
                {faqData.map((section: any, index: Key) => (
                <FAQSection
                    key={index}
                    title={section.title}
                    svgPath={section.svgPath}
                    faqs={section.faqs}
                />
                ))}
            </main>

            <footer className="container mx-auto p-6 text-center mt-8">
                <a href="/contact-us" className="inline-flex items-center space-x-2 bg-purple-600 text-white font-bold py-4 px-8 rounded-md shadow-lg hover:bg-purple-700 transition-colors duration-300">
                <span>Still have questions? Contact our support team.</span>
                </a>
            </footer>
        </div>
        <Footer/>
    </div>
  );
}
