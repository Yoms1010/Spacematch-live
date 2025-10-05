import AllProperties from "@/components/property/AllProperties";
import { getAllProperties } from "@/lib/actions/property.action";
import { PropertyItemProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Key } from "react";

async function SearchPage() {

  const properties: PropertyItemProps[] = await getAllProperties()

  return (
    <>
      <main className="pt-24">
        <div className="container mx-auto px-6">
          {/* Search Filter Bar */}
          <div className="bg-white rounded-full shadow-lg p-2 md:p-3 my-6 w-full max-w-4xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div className="md:col-span-1">
                <label htmlFor="location" className="sr-only">Where</label>
                <input type="text" id="location" placeholder="Where: e.g. 'Lagos'" className="w-full text-gray-700 placeholder-gray-500 rounded-full border-none focus:ring-2 focus:ring-main-100 py-3 px-4" />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="size" className="sr-only">Size</label>
                <input type="text" id="size" placeholder="Size: e.g. '500 m²'" className="w-full text-gray-700 placeholder-gray-500 rounded-full border-none focus:ring-2 focus:ring-main-100 py-3 px-4" />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="amount" className="sr-only">Amount</label>
                <input type="text" id="amount" placeholder="Amount: e.g. 'NGN200,000,000'" className="w-full text-gray-700 placeholder-gray-500 rounded-full border-none focus:ring-2 focus:ring-main-100 py-3 px-4" />
              </div>
              <button type="submit" className="md:col-span-1 bg-smred-100 text-white rounded-full p-3 flex items-center justify-center hover:bg-main-100 transition duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="ml-2 font-semibold">Search</span>
              </button>
            </form>
          </div>

          {/* Popular Properties Section */}
          <AllProperties
            properties={properties}
          />

          {/* Available Now Section */}
          <section className="py-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Property Card 5 */}
              <a href="/property-detail" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img className="w-full h-48 object-cover" src="https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Classic Family House" />
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">Verified Docs</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Single Family Home • Seattle, WA</p>
                  <h3 className="font-semibold text-lg mt-1">Classic Family Residence</h3>
                  <p className="text-sm text-gray-600 mt-1">by <span className="font-medium text-gray-800">FutureHomes</span></p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-main-100">NGN620,000</p>
                    <p className="text-sm text-gray-600">1,100 m²</p>
                  </div>
                </div>
              </a>
              {/* Property Card 6 */}
              <a href="/property-detail" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img className="w-full h-48 object-cover" src="https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Modern Apartment" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Landed Property • San Francisco, CA</p>
                  <h3 className="font-semibold text-lg mt-1">Urban Land Plot</h3>
                  <p className="text-sm text-gray-600 mt-1">by <span className="font-medium text-gray-800">GreenArch</span></p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-main-100">NGN980,000</p>
                    <p className="text-sm text-gray-600">600 m²</p>
                  </div>
                </div>
              </a>
              {/* Property Card 7 */}
              <a href="/property-detail" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img className="w-full h-48 object-cover" src="https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Forest Cabin" />
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">Verified Docs</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Estate • Portland, OR</p>
                  <h3 className="font-semibold text-lg mt-1">Secluded Forest Estate</h3>
                  <p className="text-sm text-gray-600 mt-1">by <span className="font-medium text-gray-800">EcoBuild</span></p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-main-100">NGN850,000</p>
                    <p className="text-sm text-gray-600">4,200 m²</p>
                  </div>
                </div>
              </a>
              {/* Property Card 8 */}
              <a href="/property-detail" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img className="w-full h-48 object-cover" src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Stylish Home" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Single Family Home • Chicago, IL</p>
                  <h3 className="font-semibold text-lg mt-1">Stylish Urban Home</h3>
                  <p className="text-sm text-gray-600 mt-1">by <span className="font-medium text-gray-800">ModuLiving</span></p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-main-100">NGN530,000</p>
                    <p className="text-sm text-gray-600">900 m²</p>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default SearchPage;