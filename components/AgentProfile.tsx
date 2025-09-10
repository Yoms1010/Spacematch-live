'use client'

import axiosClient from '@/axios-client'
import HeaderBox from '@/components/HeaderBox'
import { useStateContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, Suspense, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AgentProfile = ({agent}: any) => {

  const router = useRouter()

  const [photo, setPhoto] = useState<File>()
  const [photoUpdated, setPhotoUpdated] = useState(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
  const {notification, setNotification} = useStateContext()

  const [form,  setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    identity: "",
    license: "",
    city: "",
    lga: "",
    state: "",
    country: "",
  })

  const {
    active,
    city,
    code,
    complete,
    country,
    created_at,
    email,
    experiencePath,
    experienceUrl,
    id,
    identityPath,
    identityUrl,
    is_signed,
    lga,
    licensePath,
    licenseUrl,
    mobile,
    name,
    photoPath,
    photoUrl,
    refund_policy,
    state,
    terms_and_conditions,
    updated_at,
  } = agent.data;

  // console.log(agent);

  
   //Profile Picture Upload File onChange Handler
    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement & {
        files : FileList
      }
        setPhoto(target.files[0])
  
        const photo = new FileReader;
        photo.onload = () => {
          setPreview(photo.result);
        }
        photo.readAsDataURL(target.files[0]);
    }

    useEffect(() => {
      if (preview === undefined) return;
      setTimeout(() => {
        if (window.confirm("Is the selected image ok by you?")){
          updateDisplayPhoto(photo);
        } return;
      }, 3000)
    }, [preview])

    const updateDisplayPhoto = async (result: FileList | File | null | undefined) => {
      
       if (typeof result === "undefined") return alert("Please select image");

        const formData = new FormData();
        formData.append('profile_photo', result as any);
        await axiosClient.post(`/agent/picture/${agent.id}`, formData)
        .then((data) => {
           setPhotoUpdated(true);
           toast.success("profile photo updated successfully");
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const updateAgentProfile = async() => {
        const payLoad = {
            name: form.name,
            email: form.email,
        }
    }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mb-5'>
        <header className='home-header'>
          <HeaderBox
              type="greeting"
              title="Profile Page"
              user={""}
              subtext="Accessing your profile information..."
          />
        </header>

        <div className='row px-5'>
          <div className="col-md-8">
            <div className='bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-5 '>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about you.
                </p>
            </div>
              <div className="border-t border-gray-200 ">
                  <dl>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Full name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{name}</p>
                              <input 
                                type="text" 
                                value={form.name}
                                placeholder='update name'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, name: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Email Address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{email}</p>
                              <input 
                                type="text" 
                                value={form.email}
                                placeholder='update email'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, email: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Phone number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{mobile}</p>
                              <input 
                                type="text" 
                                value={form.mobile}
                                placeholder='update mobile'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, mobile: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              experience
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{experiencePath  !== "undefined" ? "Uploaded" : "Null"}</p>
                              <input 
                                type="text" 
                                value={form.experience}
                                placeholder='update experience'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, experience: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              identity
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{identityPath !== "undefined" ? "Uploaded" : "Null"}</p>
                              <input 
                                type="text" 
                                value={form.identity}
                                placeholder='update identity'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, identity: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              license
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{licensePath  !== "undefined" ? "Uploaded" : "Null"}</p>
                              <input 
                                type="text" 
                                value={form.license}
                                placeholder='update license'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, license: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              City
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{city}</p>
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
                              Local Government Area
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{lga}</p>
                              <input 
                                type="text" 
                                value={form.lga}
                                placeholder='update lga'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, lga: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              State
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{state}</p>
                              <input 
                                type="text" 
                                value={form.state}
                                placeholder='update state'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, state: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Country
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{country}</p>
                              <input 
                                type="text" 
                                value={form.country}
                                placeholder='update country'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, country: e.target.value})}
                              />
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Subscription Plan
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {agent 
                                && 
                                (!agent.subscription ? <div className='border border-smred-100 p-2 text-smred-100 w-[20%] text-center'>None</div> : agent?.subscription)
                            }
                          </dd>
                      </div>
                  </dl>
                  <button 
                    onClick={updateAgentProfile}
                    className='bg-main-100 w-full p-2 text-white rounded hover:shadow-xl font-semibold'
                  >
                        Submit Update
                  </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className='bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-4 p-4 min-h-[300px] flex flex-col items-center'>
            <div className='bg-blue-500 text-white p-2 my-2'>Profile photo is automatically updated when you chose a photo</div>
              {
                preview 
                  ?
                <img src={`${preview}`} className='w-[170px] h-[200px] img-thumbnail' alt='sds'/>
                :
                <>
                {
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${photoPath}`} className='w-[170px] h-[200px] img-thumbnail' alt='sds'/>
                }
                </>
              }
              

              <div className='flex flex-col items-center mt-4'>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {name}
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">
                  {agent && agent.business_name}
                </p> */}
              </div>
                {
                  notification && 
                  <div className="bg-blue-500 text-white mt-2 p-2">{notification}</div>
                } 
                {
                  preview
                  &&
                  <div className='p-2 bg-orange-500 text-white'>
                    Just hold on for the message prompt
                  </div>
                }
                
              <input 
                type="file"
                title="Profile Picture"
                // value={form.images.name}
                onChange={handlePhotoUpload}
                accept='image/png, image/jpg, image/jpeg, image/wepg'
                className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-4'
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default AgentProfile;