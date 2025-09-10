'use client'

import React, { useEffect, useRef, useState } from 'react'
import HeaderBox from '@/components/HeaderBox';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import { LiaLinkSolid } from "react-icons/lia";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import InputField from '@/components/InputField';
import axiosClient from '@/axios-client';
import { useStateContext } from '@/context/ContextProvider';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { countryCode, nigeria } from '@/constants';
import { Loader } from 'lucide-react';
import Image from 'next/image';

DataTable.use(DT);

const BuyerMatches = () => {
    
    const [form, setForm] = useState({
        plot_size: "",
        property_id: "",
        budget: "",
        city: "",
        lga: "",
        state: "",
        country: "",
    })

    const agentIdRef = useRef<any>(0)

    const router = useRouter()
    const [user, setUser] = useState<any>()
    const [buyer, setBuyer] = useState<any>()
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteItemId, setDeleteItemId] = useState()
    const [matchedResult, setMatchedResult] = useState<any>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [matchedProperty, setMatchedProperty] = useState<any>()
    const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()

    useEffect(() => {
      // const fetchCurrentUser = () => {
        axiosClient.get("/user")
        .then((data) => {
          setUser(data.data)

            //Buyer
            axiosClient.get(`/buyer/${data.data.whoId.split(";")[1]}`)
            .then((data) => {
              setBuyer(data.data.data)
              // console.log(data);
            })
            .catch((error) => {
                console.error(error)
            })
            //matched Property
            getMatchedProperty(data.data.whoId.split(";")[1])
            
        })
        .catch(err => console.log(err));
      // }
    }, [notification])


    //Search properties based on form
    const onPropertySearch = () => {
      const payLoad = {
        budget: form.budget,
        plot_size: form.plot_size,
        city: form.city,
        lga: form.lga,
        state: form.state,
        country: form.country,
      }


      setIsLoading(true)

      axiosClient.post(`/matched/results`, payLoad)
      .then((data) => {
        // const res = data.data.json()
        setIsLoading(false)
        setMatchedResult(data.data)
        // console.log(res)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
            setIsLoading(false)
            // setErrorNotify("Some errors occurred, kindly sort them out before you can proceed.")
            if (response.data.errors) {
                    setErrors(response.data.errors)
                    // console.log(response.data.errors);
            }else{
                // setErrors(response.data.message)
                console.log(response.data.message)
            }
        }else{
            // setLoading(false)
            // setErrorNotify(response.data.message)
            console.log(response);
        }
      })
    }

    useEffect(() => {
      onPropertySearch()
    }, [form.country])

  console.log(matchedResult);

  // console.log(buyer);
  const getMatchedProperty = (buyerId: any) => {
    axiosClient.get(`/matches/buyer/${buyerId}`)
    .then((data) => {
        setMatchedProperty(data.data)
        // console.log(data.data);
      })
    .catch(err => console.log(err));
  }
  

  useEffect(() => {
    getMatchedProperty
  }, [])


const onPropertyMatch = () => {
    if (buyer === "undefined") return alert("Buyer ID is undefined");
    if (form.property_id === "") return alert("You are yet to choose a property");

      const payLoad = {
        buyer_id: buyer.id,
        agent_id: agentIdRef.current.value,
        property_id: form.property_id,
        budget: form.budget,
        plot_size: form.plot_size,
        city: form.city,
        lga: form.lga,
        state: form.state,
        country: form.country,
      }
      

      if (buyer === "undefined") return;
      setLoading(true)
      axiosClient.post(`/match`, payLoad)
      .then((data) => {
        setLoading(false)
        if (data.status === 201) {
          setNotification("Property successfully matched to you");
        }
      })
      .catch((err) => {
        const response = err.response;
          if (response && response.status === 422) {
                setLoading(false)
                setErrorNotify("Some errors occurred, kindly sort them out before you can proceed.")
              if (response.data.errors) {
                      setErrors(response.data.errors)
                      // console.log(response.data.errors);
              }else{
                  setErrors(response.data.message)
                  // console.log(response.data.message)
              }
          }else{
              setLoading(false)
              setErrorNotify(response.data.message)
              // console.log(response.data.message);
          }
      })
}  


const onView = (id: any) => {
  // Navigate to property page
  router.push(`/in/matches/properties/${id}`)
}

const onDelete = (id: any) => {
  setDeleteItemId(id)
  setIsDeleting(true)
  axiosClient.delete(`/delete/matched/property/${id}`)
  .then((data: any) => {
    setIsDeleting(false)
    setNotification("Succesfully Deleted")
  })
  .catch(err => {
      console.log(err);
    })
}

return (
  <section className='p-5'>
       <HeaderBox
        title='Matched Properties'
        subtext='Details of properties matched to you'
      />

        <div className='property-table bg-white p-3'>
            <div className='flex justify-end px-3'>
                <button
                    onClick={() => setOpenModal(true)}
                    className='p-2 bg-main-100 text-white rounded hover:shadow-xl flex justify-center items-center'
                >
                   <LiaLinkSolid className='font-semibold text-24'/> &nbsp; Match Property
                </button>
            </div>
            <DataTable className="display">
                <thead >
                    <tr className='justify-start'>
                        <th scope='row'>#</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Cost Per Squaremtres</th>
                        <th>Total Cost</th>
                        <th>Agent</th>
                        <th>Date Matched</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-left'>
                    {
                      matchedProperty
                        ?
                      matchedProperty.map((item: any, i: any) => (
                        <tr className='text-left' key={i}>
                          <td>{i += 1}</td>
                          <td>{item.property.title}</td>
                          <td>{`${item.property.city} ${item.property.lga} ${item.property.state} ${item.property.country}`}</td>
                          <td>₦{item.property.cost_per_sqm}</td>
                          <td>₦{item.property.total_cost}</td>
                          <td>{item.agent.name}</td>
                          <td>{item.property.created_at.split("T")[0]}</td>
                          <td>
                          <div className='flex items-center space-x-3'>
                                <FaEye
                                    size={22}
                                    onClick={() => onView(item.property.id)}
                                    className='cursor-pointer text-main-100'
                                />
                                
                                {
                                  item.id == deleteItemId && isDeleting
                                  ?
                                  <Loader className='animate-spin'/>
                                  :
                                  <FaTrash
                                    size={22}
                                    onClick={() => onDelete(item.id)}
                                    className='text-red-500 cursor-pointer'
                                  />
                                }
                            </div>
                          </td>
                      </tr>
                      ))
                      :
                      <tr className='text-left'>
                          <td><div><Loader className='animate-spin'/></div></td>
                          <td><div><Loader className='animate-spin'/></div></td>
                          <td><div><Loader className='animate-spin'/></div></td>
                          <td>Data Loading...</td>
                          <td><div><Loader className='animate-spin'/></div></td>
                          <td><div><Loader className='animate-spin'/></div></td>
                          <td><div><Loader className='animate-spin'/></div></td>
                          <td>
                            view
                          </td>
                      </tr>
                    }
                </tbody>
            </DataTable>
        </div>

        <div className='modal'>
          <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 min-h-[500px]">
                    <div className="sm:flex sm:items-start mb-5">
                      <div className="flex flex-row justify-between items-center mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <div className="text-xl font-bold text-gray-900">
                          Property Matching
                        </div>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpenModal(false)}
                          className="inline-flex w-full justify-center rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          X
                        </button>
                      </div>
                    </div>

                        <div className='flex flex-col gap-4'>
                          <div className='row'>
                            <InputField
                              title="Budget"
                              type='text'
                              value={form.budget}
                              handleChangeText={(e: any) => setForm({...form, budget: e.target.value})}
                              placeholder='Enter your budget address'
                              disabled={false}
                              required={true}
                              otherStyles='col-md-6'
                            />
                            <InputField
                              title="Plot Size"
                              type='text'
                              value={`${form.plot_size}`}
                              handleChangeText={(e: any) => setForm({...form, plot_size: e.target.value})}
                              placeholder='Enter plot size'
                              disabled={false}
                              required={true}
                              otherStyles='col-md-6'
                            />
                          </div>
                          
                          <div className='row'>
                            <InputField
                              title="City"
                              type='text'
                              value={form.city}
                              handleChangeText={(e: any) => setForm({...form, city: e.target.value})}
                              placeholder='Your office city'
                              disabled={false}
                              required={true}
                              otherStyles='col-md-6'
                            /> 

                            <div className={`space-y-2 col-md-6`}>
                              <div className="text-14 text-gray-600 font-semibold">State</div>
                              <select 
                                value={form.state}
                                onChange={(e: any) => setForm({...form, state: e.target.value})}
                                className='p-2 w-full outline-none border  rounded-xl'>
                                {
                                  nigeria.map((item, i) => (
                                    <option value={item.state} key={i}>{item.state}</option>
                                  ))
                                }  
                              </select>
                            </div>

                          </div>

                          <div className='row'>
                            <div className={`space-y-2 col-md-6`}>
                              <div className="text-14 text-gray-600 font-semibold">Local Government Area</div>
                              <select 
                                value={form.lga}
                                onChange={(e: any) => setForm({...form, lga: e.target.value})}
                                className='p-2 w-full outline-none border  rounded-xl'
                              >
                                {
                                  form.state
                                  ?
                                  <>
                                    {
                                      nigeria.map((item, i) => (
                                        item.state == form.state
                                        &&
                                        <>
                                          {
                                          item.lga.map((lga, i) => (
                                            <option value={lga} key={i}>{lga}</option>
                                            ))
                                          }
                                        </>
                                      ))
                                    }
                                  </>
                                  :
                                  <option value={"select a state first"} disabled>select a state first</option>
                                }  
                              </select>
                            </div>

                            <div className={`space-y-2 col-md-6`}>
                              <div className="text-14 text-gray-600 font-semibold">Country</div>
                              <select 
                                value={form.country}
                                onChange={(e: any) => setForm({...form, country: e.target.value})}
                                className='p-2 w-full outline-none border  rounded-xl'>
                                {
                                  countryCode.map((item, i) => (
                                    <option value={item.name} key={i}>{item.name}</option>
                                  ))
                                }  
                              </select>
                            </div>
                          </div>

                          {
                            isLoading
                            ?
                            <div className='flex justify-center items-center w-full'><Loader className='animate-spin'/></div>
                            :
                            <div className='border h-[170px] my-2 p-2 overflow-y-scroll'>
                              {
                                matchedResult 
                                  ?
                                matchedResult.map((item: {
                                  id: string | number | readonly string[] | undefined;
                                  total_cost: any;
                                  country: string | undefined;
                                  state: string | undefined;
                                  lga: string | undefined;
                                  city: string | undefined;
                                  title: any;
                                  property_image: any; 
                                  image: string | undefined | null
                                  agent: {id: any};
                                }, 
                                  index: React.Key | null | undefined
                                ) => (
                                  <div key={index} className='border-b border-gray-200 px-4 pt-2 pb-4 h-[100px]'>
                                    <div className='flex items-center'>
                                      <input
                                        type="radio" 
                                        name={`property`}
                                        value={item.id}
                                        onChange={(e: any) => setForm({...form, property_id: e.target.value})}
                                      />
                                      {/* <div> */}
                                        <Image
                                          src={`${item.property_image.length > 0 && process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${item.property_image[0].path}`} 
                                          alt={`${item.title}`} 
                                          width={100}
                                          height={100}
                                          className='w-12 h-12 rounded-full ml-5' 
                                        />
                                        <div className='ml-3'>
                                          <h3 className='text-sm font-semibold text-gray-900 my-1'>{item.title}</h3>
                                          <p className='text-xs text-gray-500'>₦{item.total_cost}</p>
                                          <div className='flex justify-start items-center space-x-2 my-1'>
                                            <div className='text-xs text-gray-500'>{item.city}</div>
                                            <div className='text-xs text-gray-500'>{item.lga}</div>
                                            <div className='text-xs text-gray-500'>{item.state}</div>
                                          </div>
                                            <p className='text-xs text-gray-500 mt-1'>{item.country}</p>
                                            <div className='flex justify-center items-start text-xs space-x-2'>
                                              <input
                                                type="text"
                                                value={item.agent.id}
                                                defaultValue={item.agent.id}
                                                ref={agentIdRef}
                                                hidden
                                              />
                                            </div>
                                        </div>
                                      {/* </div> */}
                                    </div>
                                  </div>
                                ))
                                :
                                <div className='flex justify-center items-center'>No Match Result Found</div>
                              }
                            </div>
                          }

                          {
                              notification 
                              &&
                              (<div className='bg-green-800 p-2 mb-4 mt-2 rounded-md text-white shadow-lg'>
                                  {notification}
                              </div>)
                          }

                          {/* {errors && <div className='bg-red-800 p-2 mb-4 mt-2 rounded-md text-white shadow-lg'>
                              {Object.keys(errors).map(key => (
                                  <p key={key}>{errors[key][0]}</p>
                              ))}
                              </div>
                          } */}

                        {/* <button
                          type="button"
                          onClick={onPropertySearch}
                          disabled={form.property_id != "" ? true : false}
                          className="mt-5 inline-flex w-full justify-center rounded bg-main-100 px-3 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 "
                        >
                          {
                            loading ? 'Loading...' : 'Search Property'
                          }
                        </button> */}
                         
                        <button
                          type="button"
                          onClick={onPropertyMatch}
                          disabled={false}
                          className="mt-5 inline-flex w-full justify-center rounded bg-main-100 px-3 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 "
                        >
                          {
                            loading? 'Loading...' : 'Match Property'
                          }
                        </button>

                    
                      </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
    </section>
  )
}

export default BuyerMatches
