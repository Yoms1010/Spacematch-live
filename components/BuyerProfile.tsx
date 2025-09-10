'use client'

import axiosClient from '@/axios-client'
import HeaderBox from '@/components/HeaderBox'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, Suspense, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BuyerProfile = ({buyer, subscriptionPlan}: any) => {

  const router = useRouter()

  const [photo, setPhoto] = useState<File>()
  const [photoUpdated, setPhotoUpdated] = useState(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()

  const [form,  setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    occupation: "",
    city: "",
    lga: "",
    state: "",
    country: "",
  })

    const {
    // active,
    city,
    // client_sc_id,
    // code,
    country,
    // created_at,
    email,
    id,
    isSubscribed,
    plan,
    lga,
    mobile,
    name,
    occupation,
    // otp_verified,
    ownership_type,
    photoPath,
    photoUrl,
    // refund_policy,
    state,
    // terms_and_conditions,
    // updated_at
  } = buyer.data;


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
        await axiosClient.post(`/buyer/picture/${buyer.id}`, formData)
        .then((data) => {
           setPhotoUpdated(true);
           toast.success("profile photo updated successfully");
        })
        .catch((error) => {
           console.log(error);
        });
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
                              Occupation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row justify-between  items-center">
                              <p className='flex justify-center items-center'>{occupation}</p>
                              <input 
                                type="text" 
                                value={form.occupation}
                                placeholder='update occupation'
                                className='p-2 outline-none border border-gray-400 rounded'
                                onChange={(e: any) => setForm({...form, occupation: e.target.value})}
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
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Subscription Plan
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {buyer 
                                && 
                                (!isSubscribed ? <div className='border border-smred-100 p-2 text-smred-100 w-[20%] text-center'>None</div> : <div className='border border-main-100 text-main-100 p-2 w-[20%] text-center'>{subscriptionPlan+" Plan"}</div>)
                            }
                          </dd>
                      </div>
                  </dl>
                  <button 
                    onClick={() => router.replace("/in/settings")}
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
                    buyer && 
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${photoPath}`} className='w-[170px] h-[200px] img-thumbnail' alt='sds'/>
                }
                </>
              }
              

              <div className='flex flex-col items-center mt-4'>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {name}
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">
                  {business_name}
                </p> */}
              </div>
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

export default BuyerProfile;