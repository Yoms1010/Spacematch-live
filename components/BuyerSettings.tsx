'use client'

import axiosClient from '@/axios-client'
import InputField from '@/components/InputField'
import { Loader } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useStateContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import { countryCode, nigeria } from '@/constants'
import { toast } from 'react-toastify'

const BuyerSettings = ({user, buyer}: any) => {

  const router = useRouter()
  const [photo, setPhoto] = useState<File>()
  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
  const [errors, setErrors] = useState<string>()

  const [form, setForm] = useState<any>({
    name : "",
    email : "",
    mobile: "",
    occupation: "",
    city: "",
    lga: "",
    state: "",
    country: "",
    ownership_type: "",
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
    // isSubscribed,
    lga,
    mobile,
    name,
    occupation,
    // otp_verified,
    ownership_type,
    // photoPath,
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

  const handleUpdateSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (typeof photo === 'undefined') return alert("Profile Photo can't be empty");

    if (buyer != "undefined") {
      const formData = new FormData();

      formData.append("name", form.name == "" ? name : form.name);
      formData.append("email", form.email == "" ? email : form.email);
      formData.append("mobile", form.mobile == "" ? mobile : form.mobile);
      formData.append("occupation", form.occupation == "" ? occupation : form.occupation);
      formData.append("city", form.city == "" ? city : form.city)
      formData.append("lga", form.lga == "" ? lga : form.lga)
      formData.append("state", form.state == "" ? state : form.state)
      formData.append("country", form.country == "" ? country : form.country)
      formData.append("ownership_type", form.ownership_type == "" ? ownership_type : form.ownership_type)
      formData.append("photo", photo)

        //Send to Backend
        setLoading(true)
        await axiosClient.post(`/buyer/${id}`, formData)
        .then((response) => {
          setLoading(false)
          setForm([])
          //update buyer data
          toast.success('Profile updated successfully')
          setTimeout(() => {
            return router.replace("/in")
          }, 2000)
        })
        .catch(err => {
          console.log(err)
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
                toast.error(response.data.message)
            }
        })
    }
  }


  return (
      <div className='col-md-12 mx-auto mt-[50px]'>
          {/* <h2 className='font-bold text-24 text-center mb-5'></h2> */}
        <form onSubmit={handleUpdateSubmit} encType='multipart/form-data'>
          <div className='row'>
            <div className='col-md-6 gap-4'>
              <div className='row mb-4'>
                <InputField
                  title="Fullname"
                  type='text'
                  value={name}
                  handleChangeText={(e: any) => setForm({...form, name: e.target.value})}
                  placeholder=''
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Email"
                  type='text'
                  value={email}
                  handleChangeText={(e: any) => setForm({...form, email: e.target.value})}
                  placeholder=''
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>

              <div className='row mb-5'>
                <InputField
                  title="Mobile Number"
                  type='text'
                  value={mobile}
                  handleChangeText={(e: any) => setForm({...form, mobile: e.target.value})}
                  placeholder=''
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Occupation"
                  type='text'
                  value={occupation}
                  handleChangeText={(e: any) => setForm({...form, business_name: e.target.value})}
                  placeholder='Your occupation'
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>

              <div className='row'>
                  <InputField
                    title="City"
                    type='text'
                    value={city}
                    handleChangeText={(e: any) => setForm({...form, city: e.target.value})}
                    placeholder='Your office city'
                    disabled={false}
                    required={true}
                    otherStyles='col-md-6'
                  /> 
  
                  <div className={`space-y-2 col-md-6`}>
                    <div className="text-14 text-gray-600 font-semibold">State</div>
                    <select 
                      defaultValue={state}
                      onChange={(e: any) => setForm({...form, state: e.target.value})}
                      className='p-2 w-full outline-none border  rounded-xl'>
                        {
                        state
                        &&
                        <option defaultValue={state} selected>{state}</option>
                      }
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
                      defaultValue={lga}
                      onChange={(e: any) => setForm({...form, lga: e.target.value})}
                      className='p-2 w-full outline-none border  rounded-xl'
                    >
                      {
                        lga
                        &&
                        <option defaultValue={lga} selected>{lga}</option>
                      }
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
                        <option value="" disabled>Select a State First</option>
                      }
                    </select>
                  </div>
  
                  <div className={`space-y-2 col-md-6`}>
                    <div className="text-14 text-gray-600 font-semibold">Country</div>
                    <select 
                      defaultValue={country}
                      onChange={(e: any) => setForm({...form, country: e.target.value})}
                      className='p-2 w-full outline-none border  rounded-xl'>
                        {
                          country
                          &&
                          <option defaultValue={country} selected>{country}</option>
                        }
                        {
                          countryCode.map((item, i) => (
                            <option value={item.name} key={i}>{item.name}</option>
                          ))
                        }  
                    </select>
                  </div>
                </div>

              <div className={`space-y-3 w-full mt-5`}>
                <div className="text-16 text-gray-600  font-semibold mb-1">Ownership Type</div>
                <div className="flex justify-center items-center w-full bg-black-100 border border-gray-300 rounded-xl">
                    <select
                      onChange={(e: any) => setForm({...form, ownership_type: e.target.value})}
                      className="flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl"
                    >
                      {
                        ownership_type
                        &&
                        <option defaultValue={ownership_type} selected>{ownership_type}</option>
                      }
                        <option disabled>Select Option</option>
                        <option value="individual">Individual</option>
                        <option value="co-ownership">Co-Ownership</option>
                    </select>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='img-thumbnail w-full min-h-[400px] py-3'>
               <div className='flex flex-col justify-center items-center gap-4 px-3'>
                <div className='text-16 text-gray-600 font-semibold mb-1'>Upload Profile Picture</div>
                  <div className='w-[180px] min-h-[180px] img-thumbnail mt-2'>
                      {
                        preview 
                        ?
                        <img src={`${preview}`} alt={""} height={180}/>
                        :
                        <>
                        {
                          buyer
                          &&
                          <img src={`${photoUrl}`} alt={""} height={180}/>
                        }
                        </>
                      }
                  </div>
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
          <div className='my-3'>
            {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                  {Object.keys(errors).map((key: any)=> (
                      <p key={key}>{errors[key][0]}</p>
                  ))}
              </div>
            }
          </div>
          <div className='mt-5 '>
            <button 
              type='submit'
              disabled={loading}
              className='bg-main-100 hover:bg-main-100 hover:shadow-lg w-full mx-auto text-white font-semibold flex justify-center py-2 rounded'
            >
              {
                loading 
                ?
                <Loader className='animate-spin'/>
                :
                "Submit"
              }
            </button>
          </div>
        </form>
      </div>
  )
}

export default BuyerSettings;
