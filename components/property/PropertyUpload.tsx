'use client'

import axiosClient from '@/axios-client'
import HeaderBox from '@/components/HeaderBox'
import PropertyInputField from '@/components/PropertyInputField'
import { countryCode, nigeria } from '@/constants'
import { getVendorProperties } from '@/lib/actions/property.action'
import { User } from '@/types'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Loader, Trash2 } from 'lucide-react'
import React, { useState, SyntheticEvent, ChangeEvent, Suspense, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'


const PropertyUpload = ({ user }: {user: User}) => {
  
  const [agent, setAgent] = useState<any>()
  const [errors, setErrors] = useState<string>()
  const [imgErrors, setImgErrors] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAgentsLoading, setIsAgentsLoading] = useState(false);
  const [images, setImages] = useState<File[] | undefined | FileList>()
  const [propertyUploaded, setPropertyUploaded] = useState<boolean>(false)
  const [iNotification, setINotification] = useState<string>("")
  const [justUploadedProperty, setJustUploadedProperty] = useState<any>()
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  
  const [form, setForm] = useState<any>({
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

  const agentIdRef = useRef<any>(0)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files : FileList
    }
    setImages(target.files)
  }
  
  const submitProperty = async () => {
    const payLoad = {
      developer_id : user?.whoId?.split(";")[1],
      agent_id: agentIdRef.current.value,
      title: form.title,
      squareMeters: form.squareMeters,
      city: form.city,
      lga: form.lga,
      state: form.state,
      country: form.country,
      total_cost: form.total_cost,
      cost_per_sqm: form.cost_per_sqm,
      description: form.description,
      image: images
    }

    //Send to Backend
    setLoading(true)
    await axiosClient.post(`/property`, payLoad)
    .then((response) => {
      console.log(response);
      
      if (response.status === 201) {
        setLoading(false)
        setForm([])
        justUploadedProperty(response)
        setPropertyUploaded(true)
        toast.success('Property info uploaded successfully. Now scroll up abit to upload the photos for the property.')
      }
     })
     .catch(err => {
      const response = err.response;
          if (response && response.status === 422) {
                setLoading(false)
                toast.error("An error occurred, kindly fix it before you can proceed.")
            if (response.data.errors) {
                setErrors(response.data.errors)
                console.log(response.data.errors);
            }else{
                setErrors("Unknown error: " + response.data.msg)
            }
          }else{
              setLoading(false)
              toast.error("Oops!! Some errors occurred.")
          }
    })
  }

  const uploadPropertyImages = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
      if(images && images.length != 5) return alert("Images has to be five");
      if (typeof images === 'undefined') return;
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const formData = new FormData();
         formData.append('image', file);

          //Post to Server
          setIsLoading(true)
          await axiosClient.post("/property/images", formData)
          .then((data) => {
            if (data.status === 201) {
              setIsLoading(false)
              setPropertyUploaded(false)
              toast.success('Photos uploaded successfully')
            }
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                    setLoading(false)
                    toast.error("An error occurred, kindly fix it before you can proceed.")
                    // console.log(data);
                if (response.data.errors) {
                    setImgErrors(response.data.errors)
                    console.log(response.data.errors);
                }else{
                    setImgErrors("Unknown error: " + response.data.msg)
                }
            }else{
                setLoading(false)
                toast.error("Oops!! Some errors occurred.")
            }
          });
      }
  }

  const uploadPropertyAmenities = async () => {
    try {
      for (let i = 0; i < inputFields.length; i++) {
        const payLoad = {
          property_id: 1,
          title: inputFields[i].value,
          active: "Yes"
        }
        await axios.post("/api/property-amenities-upload", payLoad)
        .then((data) => {
          // setIsAgentsLoading(false)
          console.log(data);
          toast.success("Successfully Uploaded")
        })
        .catch(err => {
          // setIsAgentsLoading(false)
          console.log(err);
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Get all agents in the inputed property location
  const getLocationAgent = async () => {
    const payLoad= {
      city: form.city,
      lga: form.lga,
      state: form.state,
      country: form.country,
    }
    setIsAgentsLoading(true)
    await axios.post("/api/property-agents", payLoad)
      .then((data) => {
        setIsAgentsLoading(false)
        // console.log(data.data);
        setAgent(data.data)
      })
      .catch(err => {
        setIsAgentsLoading(false)
        console.log(err);
      })
  }

    const handleAddInput = () => {
      setInputFields([...inputFields, { value: '' }]);
    };

    const handleChangeInput = (index: any, event: any) => {
        const newInputs = [...inputFields];
        newInputs[index].value = event.target.value;
        setInputFields(newInputs);
    };

    const handleDeleteInput = (index: any) => {
      const newInputs = [...inputFields];
      newInputs.splice(index, 1);
      setInputFields(newInputs);
    };

    useEffect(() => {
      ( async () => {
        const property = await getVendorProperties(user?.whoId?.split(";")[1])
        setJustUploadedProperty(property[0])
      })()
    }, [propertyUploaded])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mb-5 px-5'>
        <HeaderBox
            title='Property Upload'
            subtext='Property Upload sections'
          />
          <div className='col-md-12 mt-[50px] bg-white p-5'>
              <div className='row'>
                <div className='col-md-7 flex flex-col gap-5'>

                  <div className='row'>
                    <PropertyInputField
                      title="Title"
                      type='text'
                      name='title'
                      value={form.title}
                      handleChangeText={(e: any) => setForm({...form, title: e.target.value})}
                      placeholder='Enter the property title'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 
                    <PropertyInputField
                      title="Square Meters"
                      type='text'
                      name='squareMeters'
                      value={form.squareMeters}
                      handleChangeText={(e: any) => setForm({...form, squareMeters: e.target.value})}
                      placeholder='Enter property square meters'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 
                  </div>

                  <div className='row'>
                    <PropertyInputField
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
                       className='p-2 w-full outline-none border  rounded-xl'>
                        {
                          form.state
                          ?
                            nigeria.map((item, i) => (
                              item.state == form.state
                              &&
                                item.lga.map((lga, i) => (
                                  <option value={lga} key={i}>{lga}</option>
                                  ))
                            ))
                          :
                          <option value="" disabled>Select a State First</option>
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

                  <div className={`space-y-3 col-12 my-5`}>
                    <div className="text-16 text-gray-600 font-semibold mb-1">Available Agent(s) Based on location</div>
                      <div className="flex flex-col justify-start py-2 gap-4 items-start w-full border border-gray-500 h-[200px] overflow-y-scroll rounded-xl">
                          {
                            isAgentsLoading
                            ?
                            <div className='flex justify-center items-center w-full h-full'>
                              <Loader className='animate-spin'/>
                            </div>
                            :
                            <>
                              {
                                agent ? agent.map((item: any, i: any) => (
                                  item.state == form.state
                                  ?
                                  <div key={i} className='px-4 pb-4 h-[100px]'>
                                      <div className='flex items-center'>
                                        <input
                                        type="radio" 
                                        value={item.id}
                                        ref={agentIdRef}
                                        />
                                        {/* <div> */}
                                          <div className='ml-5'>
                                            <h3 className='text-sm font-semibold text-gray-900 my-1'>{item.name}</h3>
                                            {/* <p className='text-xs text-gray-500'>${item.city}</p> */}
                                            <div className='flex flex-col justify-center items-start gap-1 my-1'>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>City:</div> <div>{item.city}</div>
                                              </div>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>Local Government:</div> <div>{item.lga}</div>
                                              </div>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>State:</div> <div>{item.state}</div>
                                              </div>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>Country:</div> <div>{item.country}</div>
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                  :
                                  ""
                                ))
                                :
                                <div className='px-4'>No Options yet (Fill all location fields)</div>
                              }
                            </>
                          } 
                    </div>
                    <button onClick={getLocationAgent} className='p-2 w-full bg-main-100 rounded-md text-white font-semibold' disabled={!form.lga &&!form.country}>See Agents</button>
                  </div>

                  <div className='row my-3'>
                    <PropertyInputField
                      title="Total Property Cost"
                      type='text'
                      name='total_cost'
                      value={form.total_cost}
                      handleChangeText={(e: any) => setForm({...form, total_cost: e.target.value})}
                      placeholder='Enter property total cost'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 
                    <PropertyInputField
                      title="Cost per Square Meter"
                      type='text'
                      name='cost_per_sqm'
                      value={form.cost_per_sqm}
                      handleChangeText={(e: any) => setForm({...form, cost_per_sqm: e.target.value})}
                      placeholder="Enter property's cost per squaremeter"
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 

                    <div className='pt-5'>
                      <div className='mb-1 font-semibold text-16'>Property Description</div>
                      <textarea 
                        value={form.description}
                        name='description'
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        placeholder='Enter description for the property'
                        className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl h-[130px]'
                      >
                      </textarea> 
                    </div>
                  </div> 

                <div className='mt-3'>
                  {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                      {Object.keys(errors).map((key: any) => (
                          <p key={key}>{errors[key][0]}</p>
                      ))}
                    </div>
                  }
                  <button 
                      type='button'
                      onClick={submitProperty}
                      disabled={propertyUploaded}
                      className='bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded'
                    >
                      {
                        loading 
                        ?
                        <div className='flex justify-center items-center w-full'><Loader className='animate-spin'/></div>
                        :
                        "Submit Property"
                      }
                  </button>
              </div>
                </div>
                <div className='col-md-5'>
                  <div className='border p-3'>
                    <form onSubmit={uploadPropertyImages} encType='multipart/form-data'>
                        <div className='mb-1 font-semibold text-16'>Upload Property Images</div>
                        <div className='flex flex-col justify-center items-center space-y-2 px-3'>
                          <div className='flex flex-col justify-center items-center gap-2 min-h-[150px]'>
                              {
                                propertyUploaded 
                                ?
                                <>
                                  {
                                    images
                                    ?
                                    images && [...images].map((image) => <div className='flex flex-col items-start justify-center gap-2 text-md font-semibold'>
                                    {image.name}
                                    </div>)
                                    :
                                    <div className='flex flex-col items-center justify-center gap-2 text-md font-semibold italic text-green-600'>Kindly Upload photos for your properties</div>
                                  }
                                </>
                                :
                                <div className='flex flex-col items-center justify-center gap-2 text-md font-semibold italic text-gray-500'>Property Images to be uploaded here</div>
                              }
                          </div>
                          <input 
                            type="file"
                            title="Property Images"
                            multiple
                            name='images'
                            disabled={!propertyUploaded ? true : false}
                            onChange={handleImageUpload}
                            accept='image/png, image/jpg, image/jpeg, image/wepg'
                            className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-4'
                          /> 
                          <div className='pt-5 w-full'>
                            <div className='flex justify-between '>
                              <div className='mb-1 font-semibold text-16'>Property Amenities</div>
                              <PlusCircleIcon onClick={handleAddInput} className='size-8'/>
                            </div>
                            
                          </div>
                          {iNotification && <div className='bg-blue-500 p-2 mt-3 rounded-md text-white shadow-lg'>
                                <p>{iNotification}</p>
                            </div>
                          }
                          {imgErrors && <div className='bg-red-800 p-2 my-3 rounded-md text-white shadow-lg'>
                              {Object.keys(imgErrors).map((key: any) => (
                                  <p key={key}>{imgErrors[key][0]}</p>
                              ))}
                            </div>
                          }
                          {
                            propertyUploaded
                            &&
                            <button 
                              type='submit'
                              // disabled={}
                              className='btn bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold my-3 p-2'
                            >
                              {
                                isLoading 
                                ? 
                                <div className='flex justify-center items-center w-full'><Loader className='animate-spin'/></div>
                                : 
                                "Upload Photos"
                              }
                            </button>
                          }
                        </div>
                    </form>
                    <div className='flex flex-col justify-center gap-3 w-full'>
                      {inputFields.map((inputField, index) => (
                        <div key={index}>
                          <input 
                            type="text" 
                            value={inputField.value}
                            onChange={(event) => handleChangeInput(index, event)}
                            className='border w-full p-2' 
                            placeholder='Enter land property amenities if existing'
                          />
                          {inputFields.length > 1 && ( // Optional: Only show delete if more than one input
                            <button onClick={() => handleDeleteInput(index)} className='text-red-500 flex justify-start items-center space-x-2'> <Trash2/> <p>Delete</p></button>
                          )}
                        </div>
                      ))}
                      <button onClick={uploadPropertyAmenities} className='w-full p-2 bg-main-100 text-white my-3'>Upload Amenities</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </Suspense>
  )
}

export default PropertyUpload;