'use client'

import Link from 'next/link';
import React from 'react';

// --- SVG Path Constants (for lucide-react style icons) ---
const CheckmarkCirclePath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z";
const CertificateIconPath = "M10 14H8v-2h2v2zm0-4H8V8h2v2zm-2 6h2v2H8v-2zm12-4V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H4V6h14v2h2V6z";
const PdfFileIconPath = "M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7zM6 20V4h6v6h6v10H6z";
const ContractsIconPath = "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 15h2v-2h-2v2zm0-4h2V7h-2v6zm0-4h2V7h-2v2z";
const UserProfileIconPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c-1.38 0-2.5 1.12-2.5 2.5S10.62 11 12 11s2.5-1.12 2.5-2.5S13.38 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z";
// --- End of SVG Path Constants ---

// Internal component for document list items
interface DocumentListItemProps {
  name: string;
  iconPath: string; // Allows for different icons if needed, though we use the same as source HTML
}

const DocumentListItem: React.FC<DocumentListItemProps> = ({ name, iconPath }) => {
  return (
    <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
        <path d={iconPath} />
      </svg>
      <span>{name}</span>
    </div>
  );
};

// Internal component for partner links in the new section
interface PartnerLinkProps {
    title: string;
    description: string;
    placeholderText: string;
}

const PartnerLink: React.FC<PartnerLinkProps> = ({ title, description, placeholderText }) => {
    // Placeholder image generation using the required format
    const imageUrl = `https://placehold.co/60x60/E2E8F0/64748B?text=${placeholderText}`;

    return (
        <a 
            href="#" 
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl transition-all duration-200 hover:bg-purple-50 hover:shadow-md"
        >
            {/* The original image was hardcoded to 60x60, using the placeholder service */}
            <img 
                src={imageUrl} 
                alt={title} 
                className="rounded-full h-12 w-12 object-cover" 
                onError={(e: any) => e.target.style.display = 'none'} // Fallback in case of image load error
            />
            <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm md:text-base">{title}</p>
                <p className="text-xs text-gray-600 leading-tight">{description}</p>
            </div>
        </a>
    );
};


// Main App Component
const OwnershipConfirmationPage: React.FC = () => {
  return (
    // Set the font family to Inter via Tailwind configuration (assuming Inter is available)
    <div className="bg-gray-100 min-h-screen px-6 max-sm:p-6 pt-28 pb-5 flex items-start sm:items-center justify-center font-['Inter']">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center border-t-4 border-green-500">
          <div className="flex justify-center mb-4">
            <span className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 bg-green-100 text-green-600 rounded-full shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" viewBox="0 0 24 24" fill="currentColor">
                <path d={CheckmarkCirclePath} />
              </svg>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Ownership Confirmed!</h1>
          <p className="mt-2 text-md sm:text-lg text-gray-600">
            Congratulations! The land has been successfully secured in your group's name.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="w-full space-y-6 sm:space-y-8">
            
          {/* 1. Digital Land Certificate Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d={CertificateIconPath} />
              </svg>
              <span>Digital Land Certificate</span>
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Your official land certificate has been securely uploaded to your account.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 border-purple-500">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d={PdfFileIconPath} />
                </svg>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Land_Certificate_Ikeja.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded: Aug 25, 2025</p>
                </div>
              </div>
              <button 
                className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
                onClick={() => console.log('Download initiated')}
              >
                Download
              </button>
            </div>
          </section>
          
          {/* 2. Other Documents Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d={ContractsIconPath} />
              </svg>
              <span>Contracts & Receipts</span>
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <DocumentListItem name="Land Lease Agreement.pdf" iconPath={ContractsIconPath} />
              {/* Note: Original HTML used the Checkmark for the second item, maintaining that here for accuracy */}
              <DocumentListItem name="Initial_Deposit_Receipt.pdf" iconPath={CheckmarkCirclePath} /> 
            </div>
          </section>
          
          {/* 3. New Section: Transition to Development */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                {/* Reusing the checkmark icon as per the original source */}
                <path d={CheckmarkCirclePath} />
              </svg>
              <span>Transition to Development</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Now that your land is secured, you can proceed to the home-building phase. Our platform integrates with various services to bring your project to life.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PartnerLink 
                title="FlexiHabitat Prefab Homes"
                description="Connect to select and customize your prefab home design."
                placeholderText="Prefab"
              />
              <PartnerLink
                title="RootsManor Project Management"
                description="Manage contractors and procurement for your brick-and-mortar build."
                placeholderText="Brick"
              />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Suggested Next Steps & Cost Estimations</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-4">
                    <li><span className="font-semibold">Architectural Design:</span> ~$5,000 - $10,000 (if not using prefab)</li>
                    <li><span className="font-semibold">Foundation & Civil Works:</span> ~$15,000 - $25,000</li>
                    <li><span className="font-semibold">Building Materials:</span> ~$50,000 - $150,000 (varies by home size)</li>
                </ul>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center space-x-2 bg-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-[1.01]"
            // onClick={(e) => { e.preventDefault(); console.log('Start Building clicked'); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d={UserProfileIconPath} />
            </svg>
            <span>Start Building</span>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default OwnershipConfirmationPage;
