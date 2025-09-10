'use client'

import FilterProperties from '@/components/FilterProperties'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import AllProperties from '@/components/AllProperties';
import axiosClient from '@/axios-client';
import { PropertyItemProps } from '@/types';


const Properties = () => {

  const [property, setProperty] = useState<any | {}>()
  const [searchVal, setSearchVal] = useState({
    val: 250000,
    size: 0,
    location: "" 
  })

  useEffect(() => {
    // Get properties from the server
    axiosClient.get("/property")
     .then((data: any)=> {
        if (data) {
          setProperty(data?.data);
        }
      })
     .catch(error => {
        console.error("Error fetching properties:", error);
      });
  }, [])

  return (
    <section className='container-fluid pt-[100px]'>
      <FilterProperties
        title="Filter by Price Range"
        value={searchVal.val}
        handleRangeChange={(e: any) => setSearchVal({...searchVal, val: e.target.value})}
        handleSizeChange={(e: any) => setSearchVal({...searchVal, size: e.target.value})}
        handleLocationChange={(e: any) => setSearchVal({...searchVal, location: e.target.value})}
        min={500}
        max={5000000}
        price={`Between ₦500 and ₦${searchVal.val}`}
        minPrice={`₦500`}
        maxPrice={`₦5000000`}
      />

      <div className="my-[52px]">
        <h1 className='text-center text-[24px] my-3 font-semibold'>Search Result Appears Below</h1>
          <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
              {
                property && property.map((item: PropertyItemProps, i: any) => (
                 <div key={i}>
                  {
                    item.total_cost <= searchVal.val ||  searchVal.size == 300 ? item.squareMeters > searchVal.size : item.squareMeters < searchVal.size  || `${item.lga}`.search(searchVal.location)
                      ?
                    <AllProperties
                      title={item.title}
                      total_cost={item.total_cost}
                      location={item.city}
                      cost={item.cost_per_sqm}
                      lga={item.lga}
                      beds={""}
                      squaremeters={item.squareMeters}
                      imgSource={item.property_image.length > 0 ? item.property_image[0].path : ""}
                      alt="property"
                    >
                      <Link href={`/properties/${item.id}`}
                        
                        className='w-full p-2 bg-main-100 rounded-bl-xl rounded-tr-xl shadow-xl hover:shadow-sm shadow-gray-300 text-white text-center'
                      >
                        View Property
                      </Link>
                    </AllProperties>
                    :
                    <div className='flex justify-center items-center w-full'>
                      <i></i>
                    </div>
                  }
                 </div>
                ))
              }
        </div>
      </div>
    </section>
  )
}

export default Properties;
