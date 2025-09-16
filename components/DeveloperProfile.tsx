'use client'

import axiosClient from '@/axios-client'
import HeaderBox from '@/components/HeaderBox'
import { useStateContext } from '@/context/ContextProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, Suspense, useEffect, useState } from 'react'

const DeveloperProfile = ({developer, subscriptionPlan}: any) => {

  const router = useRouter()

  const [photo, setPhoto] = useState<File>()
  const [photoUpdated, setPhotoUpdated] = useState(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
  const {notification, setNotification} = useStateContext()

  const [form, setForm] = useState<any>({
    name : "",
    email : "",
    business_name: "",
    mobile: "",
    city: "",
    lga: "",
    state: "",
    country: "",
    developer_type: "",
    areas_of_operation: "",
    developer_reg_no: "",
    tin: "",
    certifications: "",
    bio: "",
  })

  const {
      id,
      CACpath,
      // CACurl,
      POOpath,
      POOurl,
      // active,
      areas_of_operation,
      bio,
      business_name,
      // cac,
      certifications,
      city,
      code,
      country,
      // created_at,
      developer_reg_no,
      developer_type,
      email,
      isSubscribed,
      is_signed,
      lga,
      mobile,
      name,
      // portfolio,
      profilePath,
      // profileUrl,
      // profile_photo,
      proof_of_ownership,
      property_by_vendor,
      refund_policy,
      // sign,
      state,
      // subscription,
      // terms_and_conditions,
      tin,
      // updated_at,
      // vendor_sc_id,
  } = developer.data;
  
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
        await axiosClient.post(`/developer/picture/${developer.id}`, formData)
        .then((data) => {
           setPhotoUpdated(true);
           setNotification("profile photo updated successfully");
        })
        .catch((error) => {
           console.log(error);
        });
    }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mb-5'>
        <header className='home-header my-2'>
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
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {name}
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Email Address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {email}
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Phone number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {mobile}
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Business/Company Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {business_name}
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Biography
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {bio}
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Proof of Ownership
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            { developer && <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${POOpath}`}
                              width={30}
                              height={30}
                              className='w-[100px] h-[70px]'
                              alt=''
                            />}
                          </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              CAC Document
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          { developer && <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${CACpath}`}
                              width={30}
                              height={30}
                              className='w-[100px] h-[70px]'
                              alt=''
                            />}
                          </dd>
                      </div>
                      <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Certification
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {certifications}
                          </dd>
                      </div>
                  </dl>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            
            <div className='bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-4 p-4 min-h-[300px] flex flex-col items-center'>
              <h2 className='text-amber-600 my-2 text-center'>Select an image to automatically update your profile picture</h2>
              {
                preview 
                  ?
                <img src={`${preview}`} className='w-[170px] h-[200px] img-thumbnail' alt='sds'/>
                :
                <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${profilePath}`} className='w-[170px] h-[200px] img-thumbnail' alt='sds'/>
              }
              

              <div className='flex flex-col items-center mt-4'>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {business_name}
                </p>
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
            <button 
              onClick={() => router.replace("/in/settings")}
              className='bg-main-100 w-full p-2 text-white rounded hover:shadow-xl font-semibold'>
                Edit Profile
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default DeveloperProfile