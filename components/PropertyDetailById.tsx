'use client'
import { useStateContext } from '@/context/ContextProvider';
import { PropertyItemProps, User } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Key, useState } from 'react';

// --- Main Page Component ---
export default function PropertyDetailById({property}: {property: PropertyItemProps | any}) {
  
  const { user } = useStateContext()
 
  const {country, state, id, 
          title, total_cost, city, cost_per_sqm, bought,
          lga, squareMeters, description, property_image} = property;
    

// --- Helper Data (In a real app, this would come from an API) ---
const propertyData = {
  name: 'Lakeside Modern Villa',
  address: '123 Lakeview Drive, Austin, TX',
  price: 750000,
  initialImages: [
    `${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[0].path}`,
    `${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[1].path}`,
    `${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[2].path}`,
    `${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[3].path}`,
    `${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[4].path}`
  ],
  amenities: [
    'Private Lake Access', 'Swimming Pool', '2-Car Garage', 'Smart Home System',
    'Gourmet Kitchen', 'Fireplace', 'Home Office', 'Security System'
  ]
};

const ImageModal = ({ src, onClose }: {src: string, onClose: any}) => {
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
            <span className="absolute top-4 right-6 text-white text-4xl font-bold cursor-pointer" onClick={onClose}>×</span>
            <img src={src} alt="Enlarged property view" className="max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()} />
        </div>
    );
};

  
  // State for managing the active tab
  const [activeTab, setActiveTab] = useState<any>('overview');
  
  // State for the image gallery
  const [images, setImages] = useState(propertyData.initialImages);
  
  // State for the image modal
  const [modalImageSrc, setModalImageSrc] = useState<any>(null);

  const handleThumbnailClick = (index: any) => {
    // Create a new array to avoid direct state mutation
    const newImages = [...images];
    // Swap the main image (at index 0) with the clicked thumbnail
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
  };

  const router = useRouter()

  const handleProceedToFinancing = () => {
    localStorage.setItem("selected_land", JSON.stringify({"id": id, "title": title, "price": total_cost}))
    switch (user?.isSubscribed) {
      case "Yes":
        router.push("/products/financing")
        break;
      case "No":
        router.push("/pricing")
        break;
      default:
        router.push("/sign-in")
        break;
    }
  }
  
  const TABS: any = {
    overview: (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">About this property</h3>
        <p>{description}</p>
      </div>
    ),
    details: (
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-semibold">Total Price:</span> NGN{Number(total_cost).toLocaleString()}</li>
        <li><span className="font-semibold">Total Size:</span> {squareMeters} m²</li>
        <li><span className="font-semibold">Total Price Per Square Meter:</span> ₦{Number(cost_per_sqm).toLocaleString()} (₦/m²)</li>
        <li>
          <span className="font-semibold mr-3">Bought:</span> 
          <span>{bought === "No" 
          ? <span className='py-1 px-4 border-2 border-main-100'>Available</span> 
          : <span className='py-1 px-4 border-2 border-smred-100'>{bought}</span>}</span>
        </li>
        {/* ... other details */}
      </ul>
    ),
    amenities: (
      <ul className="list-disc list-inside grid grid-cols-2 gap-4">
        {propertyData.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
      </ul>
    ),
    location: (
       <iframe 
        className="w-full h-96 rounded-lg" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.1234567890123!2d3.338639315348348!3d6.6215269952274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91e929429e4b%3A0x8c792372f7ed910c!2sAgege!5e0!3m2!1sen!2sng!4v1662551092795!5m2!1sen!2sng"
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade">
       </iframe>
    )
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans pb-10">
      <main className="pt-24">
        <div className="container mx-auto px-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-md text-gray-600 mt-1">{lga} • {city} . {state}, {country}</p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 mb-8">
            {/* Main Image */}
            <div className="col-span-4 md:col-span-2 row-span-2 rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[0].path}`} 
                  width={500}
                  height={300}
                  alt="Main property view" 
                  className="w-full h-full object-cover cursor-pointer" 
                  onClick={() => setModalImageSrc(`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property_image[0].path}`)} 
                />
            </div>
            {/* Thumbnails */}
            {property_image.slice(1).map((item: any, index: number) => (
                <div key={index} className="col-span-2 md:col-span-1 rounded-lg overflow-hidden">
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${item.path}`} 
                      width={500}
                      height={300}
                      alt={`Property view ${index + 2}`} className="w-full h-full object-cover cursor-pointer" 
                      onClick={() => handleThumbnailClick(index + 1)} 
                    />
                </div>
            ))}
          </div>
          
          {/* Property Details & Pricing */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {Object.keys(TABS).map(tabName => (
                    <button
                      key={tabName}
                      onClick={() => setActiveTab(tabName)}
                      className={`capitalize whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition
                        ${activeTab === tabName 
                          ? 'border-main-100 text-gray-900 font-semibold' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                      }
                    >
                      {tabName}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-6">
                {TABS[activeTab]}
              </div>
            </div>

            {/* Right Column - Pricing */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <p className="text-2xl font-bold text-gray-900">₦{Number(total_cost).toLocaleString()}</p>
                <p className="text-gray-600">Total Property Value</p>
                <div className="mt-4 border-t pt-4">
                  <p className="font-semibold">Example Co-ownership:</p>
                  <p className="text-lg font-bold text-main-100 mt-1">₦{(total_cost * 0.25).toLocaleString()} <span className="text-sm font-normal text-gray-600">/ 25% share</span></p>
                </div>
                <button onClick={handleProceedToFinancing} className="mt-6 block text-center w-full bg-main-100 text-white px-6 py-3 rounded-md font-semibold hover:bg-main-100 transition duration-300">
                  Start Co-ownership Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ImageModal src={modalImageSrc} onClose={() => setModalImageSrc(null)} />
    </div>
  );
}