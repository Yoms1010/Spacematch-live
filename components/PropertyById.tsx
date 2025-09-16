'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { LuLandPlot } from 'react-icons/lu'
import { TbMeterSquare } from 'react-icons/tb'
import { BsPinMapFill } from "react-icons/bs";
import axiosClient from '@/axios-client'

type PropertyIdProps = {
    id: string;
}

const PropertyById = ({id}: PropertyIdProps) => {

    const [property, setProperty] = useState<any>()

    const [pricePerSquaremeter, setPricePerSquaremeter] = useState(0)

    const fetchProperty = () => {
      axiosClient.get(`/property/${id}`)
      .then((data) => {
        // console.log(data.data);
        setProperty(data.data);
      }) 
      .catch((error) => {})
    }
    
    useEffect(() => {
      fetchProperty();
    }, [])


    useEffect(() => {
      setPricePerSquaremeter(property ? property?.total_cost / 100 * 30 : 0)
    }, [])

    // console.log(property);
    
    
    
  return (
    <section className='container-fluid mt-3'>
      
      <div className='col-md-12 h-[600px] max-md:mb-[480px] max-sm:mb-[100px]'>
        <div className='row max-md:gap-3 max-sm:gap-3'>
          <div className='col-md-6 mb-2'>

            {
              property 
              && 
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property.property_image[0].path}`}
                width={200}
                height={400}
                alt=''
                className='h-[510px] max-sm:h-[250px] w-full shadow-md shadow-gray-300'
              />
            }
            
          </div>
          <div className='col-md-6'>
            <div className='row max-md:grid max-md:grid-cols-2 max-sm:grid max-sm:grid-cols-2'>

              <div className='col-md-6 mb-3'>
                <div className='h-[250px] max-sm:h-[150px] shadow-md shadow-gray-300'>
                {
                    property
                    &&
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property.property_image[1].path}`}
                    width={200}
                    height={400}
                    alt=''
                    className='h-full max-sm:h-full w-full shadow-gray-300'
                  />
                }
                </div>
              </div>


              <div className='col-md-6 mb-3'>
                <div className='h-[250px] max-sm:h-[150px] shadow-md shadow-gray-300'>
                {
                    property
                    &&
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property.property_image[2].path}`}
                    width={200}
                    height={400}
                    alt=''
                    className='h-full max-sm:h-full w-full shadow-gray-300'
                  />
                }
                </div>
              </div>


              <div className='col-md-6'>
                <div className='h-[250px] max-sm:h-[150px] shadow-md shadow-gray-300'>
                {
                    property
                    &&
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property.property_image[3].path}`}
                    width={200}
                    height={400}
                    alt=''
                    className='h-full max-sm:h-full w-full shadow-gray-300'
                  />
                }
                </div>
              </div>


              <div className='col-md-6'>
                <div className='h-[250px] max-sm:h-[150px] shadow-md shadow-gray-300'>
                  {
                    property
                    &&
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property.property_image[4].path}`}
                      width={200}
                      height={400}
                      alt=''
                      className='h-full max-sm:h-full w-full shadow-gray-300'
                    />
                  }
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <div className='container col-md-12 mt-3'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='card-body'>
                <h2 className='font-semibold text-26'>{property && property.title}</h2>
                <div className='flex flex-row items-center justify-between w-[300px] mt-3 text-main-100'>
                    <div className='flex flex-row justify-center items-center'>${property?.total_cost}</div>
                    <div className='flex flex-row justify-center items-center space-x-1'> <p className='flex justify-center items-center'>${property?.cost_per_sqm}/<TbMeterSquare/></p></div>
                    <div className='flex flex-row justify-center items-center space-x-1'><LuLandPlot/> <p className='flex flex-row justify-center items-center'>{property?.squareMeters}<TbMeterSquare/></p> </div>
                </div>
                <div className='mt-2'>
                  <div className='flex flex-row items-center space-x-1 text-main-100'><FaLocationDot/> <p className='text-gray-400'>{property && property.city}</p></div>
                  <div className='flex flex-row items-center space-x-1 text-main-100'><BsPinMapFill/> <p className='text-gray-400'>{property && property.lga}</p></div>
                </div>
                <div className='mt-2'>
                  {property && property?.description}
                </div>
                <div className='w-full h-[500px] border-2 border-dotted border-main-100 mt-4'>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15912.976219078715!2d3.1634915!3d6.6760723!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf452da3bd44b%3A0x47331fb41adc9d28!2sLekki%20Phase%201%2C%20Lekki%20106104%2C%20Lagos!5e1!3m2!1sen!2sng!4v1735588457281!5m2!1sen!2sng" className='w-full h-full'  loading="lazy"></iframe>
                </div>
            </div>
          </div>

          <div className='col-md-4 max-sm:mt-3'>
            <div className='border border-gray-400 p-4'>
                <div className='font-semibold mb-4'>Price:</div>
                <div className='flex flex-row justify-between items-center'>
                  
                  <div className=''>
                      <div className='font-bold mb-2'>${property?.total_cost}</div>
                      <div className='text-gray-400 mb-2'>Price/Squaremeter</div>
                      <div className='text-gray-400 mb-2'>Monthly Payment</div>
                      <div></div>
                      <button className='p-2 mt-3 w-[150px] bg-main-100 text-white rounded-br-xl rounded-tl-xl shadow-sm shadow-gray-400'>
                        Book Now
                      </button>
                  </div>

                  <div className='flex flex-col items-center'>
                      <div className='text-main-100 mb-2'>For sale</div>
                      <div className='mb-2'>${property?.cost_per_sqm}</div>
                      <div className='mb-2'>${pricePerSquaremeter/2}</div>
                      <div></div>
                      <button className='p-2 mt-3 w-[150px] bg-main-100 text-white rounded-br-xl rounded-tl-xl shadow-sm shadow-gray-400'>
                        Offer Now
                      </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default PropertyById