// src/components/ConfirmationPage.tsx
import React from 'react';
import { 
  CheckmarkIconPath, 
  CertificateIconPath, 
  PdfFileIconPath, 
  ContractsIconPath,
  UserProfileIconPath,
  SmallDocumentIconPath
} from '@/constants/icons';

interface DocumentListItemProps {
  name: string;
}

const DocumentListItem: React.FC<DocumentListItemProps> = ({ name }) => {
  return (
    <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
        {/* Using the same document icon for both receipts and contracts for simplicity, as in the original */}
        <path d={SmallDocumentIconPath} />
      </svg>
      <span>{name}</span>
    </div>
  );
};

const ConfirmationPage: React.FC = () => {
  return (
    // The main container structure and background from the original body
    <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-10 flex items-center justify-center font-inter">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <header className="bg-white shadow-sm rounded-xl p-6 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <span className="flex items-center justify-center h-20 w-20 bg-green-100 text-green-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
                <path d={CheckmarkIconPath} />
              </svg>
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800">Ownership Confirmed!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Congratulations! The land has been successfully secured in your group's name.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto space-y-8">
            
          {/* Digital Land Certificate Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d={CertificateIconPath} />
              </svg>
              <span>Digital Land Certificate</span>
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Your official land certificate has been securely uploaded to your account.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d={PdfFileIconPath} />
                </svg>
                <div>
                  <p className="font-bold text-gray-800">Land_Certificate_Ikeja.pdf</p>
                  <p className="text-sm text-gray-500">Uploaded: Aug 25, 2025</p>
                </div>
              </div>
              <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300 w-full sm:w-auto">
                Download
              </button>
            </div>
          </section>
          
          {/* Other Documents Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d={ContractsIconPath} />
              </svg>
              <span>Contracts & Receipts</span>
            </h2>
            <div className="space-y-4 text-sm text-gray-700">
              {/* Reusable Document List Item */}
              <DocumentListItem name="Land Lease Agreement.pdf" />
              <DocumentListItem name="Initial_Deposit_Receipt.pdf" />
            </div>
          </section>
          
        </main>

        {/* Footer */}
        <footer className="text-center mt-12">
          <a 
            href="/property/acquisition/due-diligence/secure-land/confirmation/ownership"
            className="inline-flex items-center space-x-2 bg-purple-600 text-white font-bold py-4 px-8 rounded-md shadow-lg hover:bg-purple-700 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d={UserProfileIconPath} />
            </svg>
            <span>Plan Your Project</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationPage;