'use client'


import InputField from '@/components/InputField'
import { Loader } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { countryCode, nigeria } from '@/constants'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


const DeveloperSettings = ({user, developer}: any) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File | undefined | any>()
  const [cacFile, setCACFile] = useState<File | undefined | any>()
  const [pooFile, setPOOFile] = useState<File | undefined | any>()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
  const router = useRouter()

    const {
        id,
        CACpath,
        POOpath,
        POOurl,
        areas_of_operation,
        bio,
        business_name,
        certifications,
        city,
        code,
        country,
        developer_reg_no,
        developer_type,
        email,
        lga,
        mobile,
        name,
        profileUrl,
        state,
        tin,
      } = developer.data;


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

  //CAC File Upload onChange Handler
  const handleCACUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files : FileList
    }
    setCACFile(target.files[0].name)
  }

  //Proof of Ownership File Upload onChange Handler
  const handlePOOUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files : FileList
    }

    setPOOFile(target.files[0])
  }


  const handleUpdateSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault();
      if (typeof photo == undefined && profileUrl == "") return alert("Profile Photo can't be empty");
      if (typeof cacFile == undefined || CACpath == "") return alert("CAC field can't be empty");;
      if (typeof pooFile == undefined || POOpath == "") return alert("Proof of ownership field Photo can't be empty");;

      if (developer != "undefined") {
        try{      
              const formData = new FormData();
              
              formData.append("vendorId", id);
              formData.append("name", form.name == "" ? name : form.name);
              formData.append("email", form.email == "" ? email : form.email);
              formData.append("business_name", form.business_name == "" ? business_name : form.business_name)
              formData.append("mobile", form.mobile == "" ? mobile : form.mobile);
              formData.append("city", form.city == "" ? city : form.city)
              formData.append("lga", form.lga == "" ? lga : form.lga)
              formData.append("state", form.state == "" ? state : form.state)
              formData.append("country", form.country == "" ? country : form.country)
              formData.append("developer_type", form.developer_type == "" ? developer_type : form.developer_type)
              formData.append("areas_of_operation", form.areas_of_operation == "" ? areas_of_operation : form.areas_of_operation)
              formData.append("developer_reg_no", form.developer_reg_no == "" ? developer_reg_no : form.developer_reg_no)
              formData.append("tin", form.tin == "" ? tin : form.tin)
              formData.append("certifications", form.certifications == "" ? certifications : form.certifications)
              formData.append("bio", form.bio == "" ? bio : form.bio)
              formData.append("proof_of_ownership", pooFile)
              formData.append("cac", cacFile)
              formData.append("profile_photo", photo)

                //Send to Backend
                setLoading(true)
                const response = await fetch(`/api/settings/vendor`, {
                        method: 'POST',
                        body: formData,
                    })
                const result = await response.json();

              if (response.ok) {
                setLoading(false);
                toast.success(`Success! Profile Updated Successfully`);
                router.replace("/in")
              } else {
                throw new Error(result.error || 'Something went wrong');
              }
          } catch (error) {
            setLoading(false);
            console.error('Submission error:', error);
            // setMessage(`Error: ${error.message}`);
          } finally {
            setLoading(false);
          }
        
        // .then((response) => {
        //   setLoading(false)
        //   // console.log(response)
        //   setForm([])
        //   toast.success('Profile updated successfully')
        //   setTimeout(() => {
        //     return redirect("/in")
        //   }, 2000)
        // })
        // .catch(err => {
        //   console.log(err)
        //   const response = err.response;
        //     if (response && response.status === 422) {
        //           setLoading(false)
        //           toast.error("An error occurred, kindly fix it before you can proceed.")
        //       if (response.data.errors) {
        //           setErrors(response.data.errors)
        //           console.log(response.data.errors);
        //       }else{
        //           setErrors("Unknown error: " + response.data.msg)
        //       }
        //     }else{
        //         setLoading(false)
        //         toast.error("Oops!! Some errors occurred.")
        //     }
        // })
    }
  }


  return (
      <div className='col-md-12 mx-auto mt-[50px] bg-white p-5'>
          {/* <h2 className='font-bold text-24 text-center mb-5'></h2> */}
        <form onSubmit={handleUpdateSubmit} encType='multipart/form-data'>
          <div className='row'>
            <div className='col-md-6 flex flex-col justify-center gap-5'>
              <div className='row'>
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
                  handleChangeText={(e: any) => setForm({...form, mobile: e.target.value})}
                  placeholder=''
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>

              <div className='row'>
                <InputField
                  title="Mobile Number"
                  type='text'
                  value={code+mobile}
                  handleChangeText={(e: any) => setForm({...form, mobile: e.target.value})}
                  placeholder=''
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Business Name"
                  type='text'
                  value={business_name}
                  handleChangeText={(e: any) => setForm({...form, business_name: e.target.value})}
                  placeholder='Your business name'
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>

              <div className='row'>
                <InputField
                  title="Vendor Type"
                  type='text'
                  value={developer_type}
                  handleChangeText={(e: any) => setForm({...form, developer_type: e.target.value})}
                  placeholder=''
                  disabled={true}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Registration Number"
                  type='text'
                  value={developer_reg_no}
                  handleChangeText={(e: any) => setForm({...form, developer_reg_no: e.target.value})}
                  placeholder='Your registration number'
                  disabled={false}
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
                      <option value={state ? state : ""} selected={state}>{state ? state : "Select State of Origin"}</option>
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
                    <option value={lga ? lga : ""} selected={lga}>{lga ? lga : "Select local government area"}</option>
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
                      country&&
                      <option value={country}>{country}</option>
                    }
                    {
                      countryCode.map((item, i) => (
                        <option value={item.name} key={i}>{item.name}</option>
                      ))
                    }  
                  </select>
                </div>
              </div>

              <InputField
                  title="Areas of Operation"
                  type='text'
                  value={areas_of_operation}
                  handleChangeText={(e: any) => setForm({...form, areas_of_operation: e.target.value})}
                  placeholder="Enter your areas of operation"
                  disabled={false}
                  required={true}
                  otherStyles='w-100 mt-4'
              /> 

            
              <textarea
                defaultValue={bio}
                onChange={(e) => setForm({...form, bio: e.target.value})}
                placeholder='Enter description for the property'
                className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl h-[150px] mt-4'
              >
              </textarea>  
            </div>


            <div className='col-md-6 flex flex-col gap-4'>
              <div className='img-thumbnail w-full min-h-[300px] py-3'>
               <div className='flex flex-col justify-center items-center gap-2 px-3'>
                <div className='text-16 text-gray-600 font-semibold mb-1'>Upload Profile Picture</div>
                      <div className='w-[150px] min-h-[150px] img-thumbnail mt-2'>
                          {
                            preview 
                            ?
                            <img src={`${preview}`} alt={""} height={155} className='w-full'/>
                            :
                            <>
                            {
                              profileUrl
                              &&
                              <img src={`${profileUrl}`} alt={""} height={155}/>
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
                      required={!profileUrl}
                    />
               </div>
              </div>
              <div className='row mt-5'>
                <div className='col-md-6'>
                  <div className='text-16 text-gray-600 font-semibold mb-1'>Upload Proof of Ownership</div>
                  <input 
                    type="file"
                    title="Proof of Ownership"
                    onChange={handlePOOUpload}
                    accept='image/png, image/jpg, image/jpeg, image/wepg'
                    className='bg-white border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl'
                    required={!POOurl}
                  />
                </div>

                <div className='col-md-6'>
                  <div className='text-16 text-gray-600 font-semibold mb-1'>Upload CAC</div>
                  <input 
                    type="file"
                    title="CAC"
                    onChange={handleCACUpload}
                    accept='image/png, image/jpg, image/jpeg, image/wepg'
                    className='bg-white border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl'
                    required={!CACpath}
                  />
                </div>  
              </div>  

              <div className='row mt-5'>
                <InputField
                  title="Tax Identification Number"
                  type='text'
                  value={tin}
                  handleChangeText={(e: any) => setForm({...form, tin: e.target.value})}
                  placeholder='Enter your TIN'
                  disabled={false}
                  required={true}
                  otherStyles='col-md-6'
                /> 
                <InputField
                  title="Certification"
                  type='text'
                  value={certifications}
                  handleChangeText={(e: any) => setForm({...form, certifications: e.target.value})}
                  placeholder="Enter your certifications"
                  disabled={false}
                  required={true}
                  otherStyles='col-md-6'
                /> 
              </div>
            </div>
          </div>
          {/* <div className='my-3'>
            {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                  {Object.keys(errors).map((key: any)=> (
                      <p key={key}>{errors[key][0]}</p>
                  ))}
              </div>
            }
          </div> */}
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

export default DeveloperSettings;
