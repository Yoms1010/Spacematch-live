import Image from 'next/image'
import Link from 'next/link'
import React, { Key } from 'react'
import Footer from '../Footer'

function AllProperties({properties}: {properties: any}) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Properties</h2>
      <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-5 no-scrollbar">
        {/* Property Card 1 */}
        {
          properties.map((item: any, i: Key) => (
            <Link key={i} href={`/property/${item.id}`} className="flex-shrink-0 w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${item.property_image[0].path}`} 
                  width={100}
                  height={100}
                  alt="Modern Villa" 
                  className="w-full h-48 object-cover rounded-tl-xl rounded-tr-xl"
                />
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">Verified Docs</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">Single Family Home • {item.state}, {item.country}</p>
                <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">by <span className="font-medium text-gray-800">Spacematch</span></p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-indigo-600">NGN {Number(item.total_cost).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{item.squareMeters} m²</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      <Footer/>
    </section>
  )
}

export default AllProperties
