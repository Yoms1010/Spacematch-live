'use client'

import React, { useRef, useState } from 'react'
import InputField from '@/components/InputField'
import { useStateContext } from '@/context/ContextProvider';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import Footer from '@/components/Footer';
import { FaArrowRight } from 'react-icons/fa';
import axiosClient from '@/axios-client';
import { countryCode } from '@/constants';
import Image from 'next/image';
import TermsAndConditions from './TermsAndConditions';
import RefundPolicy from './RefundPolicy';

function DeveloperSignup() {
    
    const [errors, setErrors] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const { setErrorNotify } = useStateContext()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        business_name: "",
        mobile: "",
        code: "",
        developer_type: "",
        terms_and_conditions: "",
        refund_policy: ""
      })
    const codeRef = useRef<any>(null)
    const refundPolicyRef = useRef<any>(null)
    const termsAndConditionsRef = useRef<any>(null)

    const onDeveloperSignUp = () => {
        const payLoad = {
          name: form.name,
          email: form.email,
          code: codeRef.current.value,
          mobile: form.mobile,
          password: form.password,
          business_name: form.business_name,
          developer_type: form.developer_type,
          terms_and_conditions: termsAndConditionsRef.current.value,
          refund_policy: refundPolicyRef.current.value
        }
  
        // return console.log(payLoad);

        setLoading(true);
        axiosClient.post("/signup/developer", payLoad)
        .then((data) => {
          setLoading(false);
          if (data.status == 201) {
            setSuccessMsg(true)
          }
        }) 
        .catch(err => {
          setLoading(false);
          console.log(err)
          const response = err.response;
              if (response && response.status === 422) {
                      setLoading(false)
                      setErrorNotify("An error occurred, kindly fix it before you can proceed.")
                      // console.log(data);
                  if (response.data.errors) {
                          setErrors(response.data.errors)
                          console.log(response.data.errors);
                          
                  }else{
                      setErrors({
                          email: [response.data.msg]
                      })
                  }
              }else{
                setLoading(false)
                setErrorNotify("Oops!! Some errors occurred.")
              }
        })
      }

  return (
    <div className='flex justify-center items-center'>
        <div className='w-full p-5'>
            <h2 className='font-bold text-24 text-center mb-5'>Vendor Sign Up</h2>
            <div className='row overflow-y-scroll h-[75vh]'>
                <div className='col-md-12 mb-5'>
                    <div className='row mb-5 max-sm:gap-5'>
                        <InputField
                            title="Name"
                            type='text'
                            value={form.name}
                            handleChangeText={(e: any) => setForm({...form, name: e.target.value})}
                            placeholder='Enter your full name'
                            disabled={false}
                            required={true}
                            otherStyles='col-md-6'
                        /> 
                        <InputField
                            title="Email"
                            type='text'
                            value={form.email}
                            handleChangeText={(e: any) => setForm({...form, email: e.target.value})}
                            placeholder='Enter your email address'
                            disabled={false}
                            required={true}
                            otherStyles='col-md-6'
                        /> 
                    </div>

                    <div className='row mt-5 max-sm:gap-5'>
                        <InputField
                            title="Business Name"
                            type='text'
                            value={form.business_name}
                            handleChangeText={(e: any) => setForm({...form, business_name: e.target.value})}
                            placeholder='Enter your business name'
                            disabled={false}
                            required={true}
                            otherStyles='col-md-6'
                        /> 
                    
                        <div className='flex justify-center items-center w-full col-md-6'>
                            {/* country code select */}
                            <div className={`col-md-4`}>
                                <div className="text-16 text-gray-600  font-semibold mb-1">Code</div>
                                <div className="flex justify-center items-center w-full bg-black-10 border border-gray-300 rounded-bl-xl rounded-tl-xl">
                                    {/* <div className='w-8 h-8'>
                                        <Image
                                            src={"https://country-code-au6g.vercel.app/CI.svg"}
                                            alt=""
                                            width={50}
                                            height={50}
                                            className='w-8 h-8'
                                        />   
                                    </div> */}
                                    <select
                                        ref={codeRef}
                                        // onChange={(e: any) => setForm({...form, code: e.target.value})}
                                        className="flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-20 rounded-bl-xl rounded-tl-xl rounded-r-none"
                                    >
                                        {
                                            countryCode.map((item, i) => (
                                                <option value={item.dial_code} key={i}>
                                                    {item.dial_code}&nbsp;{item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* mobile number field  */}
                            <div className='col-md-8'>
                                <div className="text-16 text-gray-600  font-semibold mb-1">Contact Number</div>
                                <div className="flex justify-center items-center w-full bg-black-100 border border-gray-300 rounded-br-xl rounded-tr-xl">
                                    <input
                                        placeholder="Your contact number"
                                        onChange={(e: any) => setForm({...form, mobile: e.target.value})}
                                        type="text"
                                        disabled={false}
                                        required={true}
                                        className={`flex-1 text-gray-500 font-psemibold text-base outline-none w-full p-2 rounded-xl rounded-l-none`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`space-y-3 w-full mt-5`}>
                        <div className="text-16 text-gray-600  font-semibold mb-1">Vendor Type</div>
                
                        <div className="flex justify-center items-center w-full bg-black-100 border border-gray-300 rounded-xl">
                            <select
                                onChange={(e: any) => setForm({...form, developer_type: e.target.value})}
                                className="flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl"
                            >
                                <option selected disabled>Select Option</option>
                                <option value="Estate Surveyor and Valuer">Estate Surveyor and Valuer</option>
                                <option value="Graphic designers">Graphic designers</option>
                                <option value="Lawyers">Lawyers</option>
                                <option value="Legal Advisor / Property Lawyer">Legal Advisor / Property Lawyer</option>
                                <option value="Architects">Architects</option>
                                <option value="Surveyors">Surveyors</option>
                                <option value="Civil/Structural Engineer">Civil/Structural Engineer</option>
                                <option value="Quantity Surveyor (QS)">Quantity Surveyor (QS)</option>
                                <option value="Builder/Construction Manager">Builder/Construction Manager</option>
                                <option value="Mechanical and Electrical (M&E) Engineer">Mechanical and Electrical (M&E) Engineer</option>
                                <option value="Project Manager (technical & Commercial)">Project Manager (technical & Commercial)</option>
                                <option value="Land Surveyors">Land Surveyors</option>
                                <option value="Town Planner (Urban Planner)">Town Planner (Urban Planner)</option>
                                <option value="Environmental Consultant">Environmental Consultant</option>
                            </select>
                        </div>
                    </div>

                    <InputField
                        title="Password"
                        type='password'
                        value={form.password}
                        handleChangeText={(e: any) => setForm({...form, password: e.target.value})}
                        placeholder='Enter your password'
                        disabled={false}
                        required={true}
                        otherStyles='w-full mt-5'
                    />    

                    {
                        successMsg && 
                        <div className="bg-blue-500 p-1 w-full text-black mt-3 flex justify-center items-center space-x-3">
                            <p className='text-white'>Your sign up process was successful. </p><FaArrowRight className='text-white'/> <Link href="/sign-in" className='text-blue-500 p-1 bg-white rounded shadow-white hover:shadow-md'>Sign in here</Link>
                        </div>
                        }
                        {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <div className='col-md-12 my-5'>
                        <div className="flex justify-start items-center space-x-2 w-full bg-black-100 rounded-br-xl rounded-tr-xl">
                            <input
                                ref={termsAndConditionsRef}
                                type="checkbox"
                                disabled={false}
                                required={true}
                                className={``}
                            />
                            <label htmlFor="" className='text-sm'>This means that you agree with the <button onClick={() => setOpenModal(true)} className='underline text-main-100'>SpaceMatch terms and conditions</button></label>
                        </div>
                    </div>
                    <div className='col-md-12 my-5'>
                        <div className="flex justify-start items-center space-x-2 w-full bg-black-100 rounded-br-xl rounded-tr-xl">
                            <input
                                ref={refundPolicyRef}
                                type="checkbox"
                                disabled={false}
                                required={true}
                                className={``}
                            />
                            <label htmlFor="" className='text-sm'>This means that you agree with the <button onClick={() => setModalOpen(true)} className='underline text-main-100'>SpaceMatch refund policy.</button></label>
                        </div>
                    </div>

                    <div className='mt-5 '>
                    <button 
                        type='submit' 
                        onClick={onDeveloperSignUp}
                        disabled={loading}
                        className='bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded'
                    >
                        {
                        loading 
                        ?
                        <div className='flex justify-center items-center w-full'>
                            <Loader className='animate-spin'/>
                        </div>
                        :
                        "Sign Up"
                        }
                    </button>
                    <div className='mt-3'>
                        Already have an account? <Link href={"/sign-in"} className='text-blue-500'>Sign In</Link> here
                    </div>
                    </div>
                </div>

            </div>
        </div>
        <RefundPolicy modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <TermsAndConditions openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}

export default DeveloperSignup
