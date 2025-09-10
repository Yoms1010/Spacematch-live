'use client'

import axiosClient from '@/axios-client'
import InputField from '@/components/InputField'
import { Loader } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useStateContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'

const AgentSettings = ({user, agent}: any) => {

  const router = useRouter()
  const [photo, setPhoto] = useState<File>()
  const [identity, setIdentity] = useState<File>()
  const [license, setLicense] = useState<File>()
  const [experience, setExperience] = useState<File>()
  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
  const [errors, setErrors] = useState<string>()
  const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()

  const [form, setForm] = useState<any>({
    name : "",
    email : "",
    mobile: "",
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

    function handleIdentityUpload(event: ChangeEvent<HTMLInputElement>): void {
      const target = event.target as HTMLInputElement & {
          files : FileList
        }
        setIdentity(target.files[0])
        const identity = new FileReader;
        identity.readAsDataURL(target.files[0]);
    }

    function handleLiscenceUpload(event: ChangeEvent<HTMLInputElement>): void {
        const target = event.target as HTMLInputElement & {
            files : FileList
          }
          setLicense(target.files[0])
          const license = new FileReader;
          license.readAsDataURL(target.files[0]);
    }

    function handleExperienceUpload(event: ChangeEvent<HTMLInputElement>): void {
        const target = event.target as HTMLInputElement & {
            files : FileList
          }
          setExperience(target.files[0])
          const experience = new FileReader;
          experience.readAsDataURL(target.files[0]);
    }

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
    if (typeof identity === 'undefined') return alert("Identity Field can't be empty");
    if (typeof license === 'undefined') return alert("License field can't be empty");
    if (typeof experience === 'undefined') return alert("Experience field can't be empty");


    if (agent != "undefined") {
      const formData = new FormData();

      formData.append("name", form.name == "" ? name : form.name);
      formData.append("email", form.email == "" ? email : form.email);
      formData.append("mobile", form.mobile == "" ? mobile : form.mobile);
      formData.append("city", form.city == "" ? city : form.city)
      formData.append("lga", form.lga == "" ? lga : form.lga)
      formData.append("state", form.state == "" ? state : form.state)
      formData.append("country", form.country == "" ? country : form.country)
      formData.append("photo", photo)
      formData.append("identity", identity)
      formData.append("license", license)
      formData.append("experience", experience)

    //   for (const value of formData.values()) {
    //     console.log(value);
    //   }
        //Send to Backend
        setLoading(true)
        await axiosClient.post(`/agent/${agent.id}`, formData)
        .then((response) => {
          setLoading(false)
          setForm([])

          //update agent data
          setNotification('Profile updated successfully')
          setTimeout(() => {
            return router.replace("/in")
          }, 2000)
        })
        .catch(err => {
          console.log(err)
          const response = err.response;
            if (response && response.status === 422) {
                  setLoading(false)
                  setErrorNotify("An error occurred, kindly fix it before you can proceed.")
              if (response.data.errors) {
                  setErrors(response.data.errors)
                  console.log(response.data.errors);
              }else{
                  setErrors("Unknown error: " + response.data.msg)
              }
            }else{
                setLoading(false)
                setErrorNotify(response.data.message)
            }
        })
    }
  }


// console.log(devebuyer.business_name);


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
                  otherStyles='col-12'
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
                  title="City"
                  type='text'
                  value={city}
                  handleChangeText={(e: any) => setForm({...form, city: e.target.value})}
                  placeholder='Your city'
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Local Government Area"
                  type='text'
                  value={lga}
                  handleChangeText={(e: any) => setForm({...form, lga: e.target.value})}
                  placeholder='Your L.G.A'
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>
    
              <div className='row mb-5'>
                <InputField
                  title="State"
                  type='text'
                  value={state}
                  handleChangeText={(e: any) => setForm({...form, state: e.target.value})}
                  placeholder='Your state'
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Country"
                  type='text'
                  value={country}
                  handleChangeText={(e: any) => setForm({...form, country: e.target.value})}
                  placeholder='Your country'
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>

              <div className='row mb-5'>
                <div className='col-md-6'>
                    <div className='text-14 text-gray-600 font-semibold'>Upload Your ID</div>
                    <input 
                        type="file"
                        title=""
                        // value={form.images.name}
                        onChange={handleIdentityUpload}
                        accept='image/png, image/jpg, image/jpeg, image/wepg, application/pdf, application/doc'
                        className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-3 bg-white'
                    />
                </div>    

                <div className='col-md-6'>
                    <div className='text-14 text-gray-600 font-semibold'>Upload Your Liscence</div>
                    <input 
                        type="file"
                        // value={form.images.name}
                        onChange={handleLiscenceUpload}
                        accept='image/png, image/jpg, image/jpeg, image/wepg, application/pdf, application/doc'
                        className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-3 bg-white'
                    />
                </div> 
              </div>

                <div className='col-12'>
                    <div className='text-14 text-gray-600 font-semibold'>Upload Your Experience</div>
                    <input 
                        type="file"
                        // value={form.images.name}
                        onChange={handleExperienceUpload}
                        accept='image/png, image/jpg, image/jpeg, image/wepg, application/pdf, application/doc'
                        className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-3 bg-white'
                    />
                </div>
            </div>

            <div className='col-md-6'>
              <div className='img-thumbnail w-full min-h-[400px] py-3'>
                <div className='flex flex-col justify-center items-center space-y-2 px-3'>
                  <div className='text-16 text-gray-600 font-semibold mb-1'>Upload Profile Picture</div>
                    <div className='w-[170px] min-h-[180px] img-thumbnail mt-2'>
                        {
                          preview 
                          ?
                          <img src={`${preview}`} alt={""} height={180}/>
                          :
                          <>
                          {
                            agent
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
            {errorNotify && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                  {errorNotify}
              </div>
            }
            {
              notification
              &&
              <div className='bg-blue-500 p-2 w-full my-2 rounded-md text-white shadow-lg'>
                {notification}
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

export default AgentSettings;
