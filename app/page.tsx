import Footer from '@/components/Footer';
import Link from 'next/link';

export default async function HomePage() {

  return (
    <>
      {/* Hero Section */}
      <header className="hero-bg pt-56 pb-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">Co-own Your Future. Build Together.</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Spacematch helps you pool resources with others to co-own land and create custom living spaces. Find partners, buy land, and build your dream home or rental property.
          </p>
          <Link href="/property/search" className="bg-smred-100 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-smred-100/80 transition duration-300">
            Start Your Search
          </Link>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Spacematch Works</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Step 1 */}
            <Link href={"/products"} className="flex flex-col items-center transform transition-all duration-500 ease-in-out hover:scale-110 hover:text-main-100">
              <div className="bg-indigo-100 rounded-full p-6 mb-6 border-2 border-dashed hover:border-l-smred-100 hover:border-r-main-100">
                <svg className="w-12 h-12 text-main-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Start Ownership Plan</h3>
              <p className="text-gray-600 hover:text-main-100">Connect with like-minded individuals or groups who share your vision for co-ownership. Our platform makes it easy to find compatible partners.</p>
            </Link>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 rounded-full p-6 mb-6">
                <svg className="w-12 h-12 text-main-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Acquire Land</h3>
              <p className="text-gray-600">Once your group is formed, search for and acquire the perfect piece of land. We provide tools and resources to facilitate a smooth transaction.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 rounded-full p-6 mb-6">
                <svg className="w-12 h-12 text-main-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Build Your Solution</h3>
              <p className="text-gray-600">Choose from a curated range of housing products from our verified vendors. We manage the entire fulfillment process for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section with Image */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless, Transparent, Secure</h2>
              <p className="text-gray-600 mb-6">
                We manage the fulfillment process from end-to-end. This means you get exactly what you paid for, and our trusted vendors are only paid upon confirmation of delivery. Your investment is protected every step of the way.
              </p>
              <Link href="#vendors" className="text-main-100 font-semibold hover:underline">
                Meet Our Verified Vendors &rarr;
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="/seemless.jpeg" alt="Modern house with a manicured lawn" className="rounded-lg shadow-xl w-full rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Human-centric section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <img src="/community.jpeg" alt="Happy family in front of their house" className="rounded-lg shadow-xl w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Building a Community, Not Just Houses</h2>
              <p className="text-gray-600 mb-6">
                Spacematch is more than a platform; it's a community of pioneers redefining homeownership. Connect with people who share your values and build a future that is both financially smart and personally fulfilling.
              </p>
              <Link href="/our-community" className="bg-main-100 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vendor Section */}
      <section id="vendors" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Trusted Vendors</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">We partner with verified vendors to offer a curated range of high-quality, sustainable, and innovative housing products.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=EcoBuild" alt="Vendor Logo 1" className="h-10" />
            </div>
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=FutureHomes" alt="Vendor Logo 2" className="h-10" />
            </div>
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=ModuLiving" alt="Vendor Logo 3" className="h-10" />
            </div>
            <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://placehold.co/150x60/000000/FFFFFF?text=GreenArch" alt="Vendor Logo 4" className="h-10" />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}