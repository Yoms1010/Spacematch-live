"use client"

import axiosClient from '@/axios-client';
import React, {  useEffect, useState } from 'react'
import HeaderBox from './HeaderBox';
import { TbMeterSquare } from 'react-icons/tb';
import { FaRegTrashAlt } from "react-icons/fa";
import { useStateContext } from '@/context/ContextProvider';
import Link from 'next/link';;

type PropertyIdProps = {
    id: string;
}

const PropertyByIdAuth = ({id}: PropertyIdProps) => {

  const [errors, setErrors] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [property, setProperty] = useState<any | null>({});
  const [images, setImages] = useState<File[] | FileList | undefined>()
  const [propertyUpdated, setPropertyUpdated] = useState<boolean>(false)
  const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()
  const [form, setForm] = useState({
      developerId : "",
      title: "",
      squareMeters: "",
      city: "",
      lga: "",
      state: "",
      country: "",
      total_cost: "",
      cost_per_sqm: "",
      description: "",
    })

   const fetchProperty = () => {
      axiosClient.get(`/property/${id}`)
      .then((data) => {
        setProperty(data.data);
      }) 
      .catch((error) => {})
    }
    
    useEffect(() => {
      fetchProperty();
    }, [propertyUpdated])


  const onPropertyUpdate = () => {
    const payLoad = {
      // property details
      developer_id: id,
      title: form.title || property && property.title,
      total_cost: form.total_cost || property && property.total_cost,
      squareMeters: form.squareMeters || property && property.squareMeters,
      cost_per_sqm: form.cost_per_sqm || property && property.cost_per_sqm,
      city: form.city || property && property.city,
      lga: form.lga || property && property.lga,
      state: form.state || property && property.state,
      country: form.country || property && property.country,
      description: form.description || property && property.description,
    }

    // Call API to update property details and images
    axiosClient.post(`/property/details/${id}`, payLoad)
    .then((data) => {
      if (data.status === 201) {
        setPropertyUpdated(true)
        setNotification('Property Details updated successfully')
      }
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
              setLoading(false)
              setErrorNotify("An error occurred, kindly fix it before you can proceed.")
              // console.log(data);
          if (response.data.errors) {
              setErrors(response.data.errors)
              console.log(response.data.errors);
          }else{
              setErrors("Unknown error: " + response.data.msg)
          }
      }else{
          setLoading(false)
          setErrorNotify("Oops!! Some errors occurred.")
      }
    });
  }

  function deleteImage(index: number): void {
    throw new Error('Function not implemented.');
  }


  return (
    <div className='container'>
      <HeaderBox
        title={`${property && property.title}`}
        subtext='Selected Property Details and editing'
      />

      <div className='row p-4'>
        <div className="col-md-7">  
          <div className='bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-5 '>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit Property Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {/* Details and informations about you. */}
                </p>
            </div>
              <div className="border-t border-gray-200 ">
                  <dl>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                          <dt className="text-sm font-medium text-gray-500">
                              Property Title:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{property && property.title}</p>
                              <input 
                                type="text" 
                                value={form.title}
                                placeholder='update title'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, title: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Property Cost:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>${property && property.total_cost}</p>
                              <input 
                                type="text" 
                                value={form.total_cost}
                                placeholder='update cost'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, total_cost: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                          <dt className="text-sm font-medium text-gray-500">
                              Property Squared Meters:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{property && property.squareMeters} <TbMeterSquare className='text-20'/></p>
                              <input 
                                type="text" 
                                value={form.squareMeters}
                                placeholder='update squared meter'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, squareMeters: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Property Cost Per Squared Metre:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>${property && property.cost_per_sqm}/<TbMeterSquare className='text-20'/></p>
                              <input 
                                type="text" 
                                value={form.cost_per_sqm}
                                placeholder='update cost per sqm'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, cost_per_sqm: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Property City:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{property && property.city}</p>
                              <input 
                                type="text" 
                                value={form.city}
                                placeholder='update city'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, city: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Property Local Government:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{property && property.lga}</p>
                              <input 
                                type="text" 
                                value={form.lga}
                                placeholder='update L.G.A'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, lga: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Property State:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between items-center">
                              <p className='flex justify-center items-center'>{property && property.state}</p>
                              <input 
                                type="text" 
                                value={form.state}
                                placeholder='update state'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, title: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Property Description:
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between items-center">
                              <p className='flex justify-center items-center'>{property && property.description}</p>
                              <input 
                                type="text" 
                                value={form.description}
                                placeholder='update description'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, description: e.target.value})}
                              />
                          </dd>
                      </div>
                      {/* <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          
                      </div> */}
                  </dl>
              </div>
              {
                notification
                &&
                <div className={`bg-blue-500 text-center text-white my-3 p-2`}>
                  {notification}
                </div>
              }
              {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                  {Object.keys(errors).map((key: any) => (
                      <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              }
              <button 
                type='button'
                onClick={onPropertyUpdate}
                disabled={propertyUpdated}
                className='bg-main-100 w-full p-2 text-white rounded hover:shadow-xl font-semibold mt-3'>
                  Update
              </button>
            </div>
        </div>

        <div className="col-md-5">
          <form className='bg-white mt-5 flex flex-col gap-4'>
              <div className='max-w-2xl shadow overflow-hidden sm:rounded-lg p-4 min-h-[400px]'>
                
                {
                  property && property.property_image
                  ?
                  <div className='row'>
                    <img src={`${property.property_image[1].url}`} alt="" className='col-md-12 max-h-[200px] img-thumbnail'/>
                    <img src={`${property.property_image[0].url}`} alt="" className='col-md-6 max-h-[200px] img-thumbnail'/>
                    <img src={`${property.property_image[1].url}`} alt="" className='col-md-6 max-h-[200px] img-thumbnail'/>
                    <img src={`${property.property_image[3].url}`} alt="" className='col-md-6 max-h-[200px] img-thumbnail'/>
                    <img src={`${property.property_image[4].url}`} alt="" className='col-md-6 max-h-[200px] img-thumbnail'/>

                  </div>
                  :
                  <>
                    {
                      images && [...images].map((image, index) => (
                        <div key={index} className='relative h-24 w-24'>
                          <img
                            src={`${image}`}
                            alt='property image'
                            className='object-cover w-full h-full rounded-xl'
                          />
                          {
                            propertyUpdated 
                              &&
                            <button 
                              type='button'
                              onClick={() => deleteImage(index)}
                              className='absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800'>
                                <FaRegTrashAlt size={24} />
                            </button>
                          }
                        </div>
                      ))
                    }
                  </>
                }
              </div>
                <Link 
                  href={`/in/properties/images/${property && property.id}`}
                  className='bg-main-100 w-full p-2 text-white rounded hover:shadow-xl font-semibold flex justify-center items-center'
                >
                  Edit Images
                </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PropertyByIdAuth