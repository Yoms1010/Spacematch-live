'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function NavigationBar() {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {
      !pathname.includes("/in/")
      &&
      <nav className="bg-white shadow-md fixed w-full z-10 rounded-bl-2xl rounded-br-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <Link href="/">
                <Image
                  src="/logo/sm.png"
                  width={50}
                  height={50}
                  alt='logo'
                  className={`hover:shadow-sm rounded-full transform transition-all border-2 duration-1000 ease-in-out hover:scale-110 hover:border-smred-100 ${pathname === "/" ? "border-b-main-100 border-l-main-100 border-t-smred-100 border-r-main-100" : ""}`}
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className={`text-gray-600 hover:text-main-100 transform transition-all duration-300 ease-in-out hover:scale-125 ${pathname === "/" ? "bg-gradient-to-r from-smred-100 via-blue-200 to-main-100 inline-block text-transparent bg-clip-text scale-125 font-semibold" : ""}`}>Home</Link>
              <a href="/#how-it-works" className="text-gray-600 hover:text-main-100 transform transition-all duration-300 ease-in-out hover:scale-110"> How It Works</a>
              <a href="/#vendors" className="text-gray-600 hover:text-main-100 transform transition-all duration-300 ease-in-out hover:scale-110">Our Vendors</a>
              <Link href="/products" className={`text-gray-600 hover:text-main-100 transform transition-all duration-300 ease-in-out hover:scale-110 ${pathname === "/products/" || pathname.startsWith(`/products/`) ? "bg-gradient-to-r from-smred-100 via-blue-200 to-main-100 inline-block text-transparent bg-clip-text scale-125 font-semibold" : ""}`}>Products</Link>
              <Link href="/property/search" className={`text-gray-600 hover:text-main-100 transform transition-all duration-300 ease-in-out hover:scale-110 ${pathname === "/property/" || pathname.startsWith(`/property/`) ? "bg-gradient-to-r from-smred-100 via-black-1 to-main-100 inline-block text-transparent bg-clip-text scale-110 font-semibold" : ""}`}>Properties</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/sign-in" className="text-gray-600 hover:text-main-100">Sign In</Link>
              <Link href="/sign-up" className="bg-smred-100 text-white px-4 py-2 rounded-md hover:bg-smred-100/70 transition duration-300">Register</Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <div className="flex flex-col items-center space-y-4">
              <Link href="/" className="text-gray-600 hover:text-main-100" onClick={() => setIsOpen(false)}>Home</Link>
              <a href="#how-it-works" className="text-gray-600 hover:text-main-100" onClick={() => setIsOpen(false)}>How It Works</a>
              <a href="#vendors" className="text-gray-600 hover:text-main-100" onClick={() => setIsOpen(false)}>Our Vendors</a>
              <Link href="/#property-solutions" className={`text-gray-600 hover:text-main-100 ${pathname === "/#property-solution" ? "text-smred-100" : ""}`}>Property Solutions</Link>
              <Link href="/property/search" className="text-gray-600 hover:text-main-100" onClick={() => setIsOpen(false)}>Search Properties</Link>
              <Link href="/sign-in" className="text-gray-600 hover:text-main-100" onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link href="/sign-up" className="bg-main-100 text-white px-4 py-2 rounded-md hover:bg-main-100/80 transition duration-300" onClick={() => setIsOpen(false)}>Register</Link>
            </div>
          </div>
        )}
      </nav>
    }
    </>
  );
}

export default NavigationBar;