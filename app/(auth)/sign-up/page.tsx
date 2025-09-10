'use client'


import { countryCodes } from '@/constants';
import { clientOccupations, legalContent, vendorTypes } from '@/constants/main';
import { checkPasswordStrength } from '@/lib/utils';
import axios from 'axios';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const LegalModal = ({ onClose, content }: {onClose: any, content: any}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="prose max-w-none text-gray-800">
          {content}
        </div>
      </div>
    </div>
  );
};

const SignUp = () => {
  const [showForm, setShowForm] = useState<string| null>(null);
  const [showLegalModal, setShowLegalModal] = useState<boolean|null>(null);
  const [isVendorAgreed, setIsVendorAgreed] = useState(false);
  const [isClientAgreed, setIsClientAgreed] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [strength, setStrength] = useState({ score: 0, label: '' });
  // const [openModal, setOpenModal] = useState<boolean>(false)
  // const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        business_name: "",
        mobile: "",
        vendor_type: "",
        terms_and_conditions: "",
        refund_policy: ""
      })
    const codeRef = useRef<any>(null)
    const router = useRouter()


    const handlePasswordChange = (e: any) => {
      const newPassword = e.target.value;
      setForm({...form, password: newPassword});
      setStrength(checkPasswordStrength(newPassword));
    };

        // A sub-component for the visual strength bar
    const PasswordStrengthMeter = ({ score }: any) => {
      const getBarColor = () => {
        switch (score) {
          case 0:
            return 'bg-gray-300'; // No input
          case 1:
            return 'bg-red-500'; // Weak
          case 2:
            return 'bg-orange-500'; // Medium
          case 3:
            return 'bg-yellow-500'; // Strong
          case 4:
          case 5:
            return 'bg-green-500'; // Very Strong
          default:
            return 'bg-gray-300';
        }
      };

      // Width is 20% for each point of score
      const barWidth = `${score * 20}%`;

      return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${getBarColor()}`}
            style={{ width: barWidth }}
          ></div>
        </div>
      );
    };

    const handleVendorSignUp = async (e: any) => {
      e.preventDefault();
        try {
          const payLoad = {
            name: form.name,
            email: form.email,
            code: codeRef.current.value,
            mobile: form.mobile,
            password: form.password,
            business_name: form.business_name,
            developer_type: form.vendor_type,
            terms_and_conditions: isVendorAgreed && "Yes",
            refund_policy: isVendorAgreed && "Yes"
          }

          if (/[A-Z]/.test(form.password) && /[0-9]/.test(form.password) && /[^A-Za-z0-9]/.test(form.password)) {
            console.log("✅ The string meets all criteria.");
          } else {
            console.log("❌ The string is missing a required character type.");
            return toast.error("❌ Your password is missing the required character(s).");
          }

          setLoading(true)
          const res = await axios.post("/api/signup/vendor", payLoad)
          console.log(res);
          setLoading(false)
          const response = res;
          if (response.status === 200) {
            if(response.data.status === 201){
              toast.success("Account successfully created. Redirecting...")
              router.push("/sign-in")
            }else if (response.data.errorData.status === 422) {
              toast.error("That email has already been taken")
            }else{
              toast.error("Kindly check your network connection")
            }
          }
        } catch (error: any) {
          setLoading(false)
          console.log(error);
          if (error.status === 403) {
            toast.error("Error: A network error occured")
          }
          toast.error("Error: An error occured, please contact support team.")
        }
    }

    // const handleSignUp = (e: any) => {
    //   e.preventDefault();
    //     const payLoad = {
    //       name: form.name,
    //       email: form.email,
    //       code: codeRef.current.value,
    //       mobile: form.mobile,
    //       password: form.password,
    //       business_name: form.business_name,
    //       developer_type: form.vendor_type,
    //       terms_and_conditions: isVendorAgreed && "Yes",
    //       refund_policy: isVendorAgreed && "Yes"
    //     }
  
    //     // return console.log(payLoad);

    //     setLoading(true);
    //     axiosClient.post("/signup/developer", payLoad)
    //     .then((data) => {
    //       setLoading(false);
    //       if (data.status == 201) {
    //         setSuccessMsg(true)
    //       }
    //     }) 
    //     .catch(err => {
    //       setLoading(false);
    //       console.log(err)
    //       const response = err.response;
    //           if (response && response.status === 422) {
    //                   setLoading(false)
    //                   setErrorNotify("An error occurred, kindly fix it before you can proceed.")
    //                   // console.log(data);
    //               if (response.data.errors) {
    //                       setErrors(response.data.errors)
    //                       console.log(response.data.errors);
                          
    //               }else{
    //                   setErrors({
    //                       email: [response.data.msg]
    //                   })
    //               }
    //           }else{
    //             setLoading(false)
    //             setErrorNotify("Oops!! Some errors occurred.")
    //           }
    //     })
    //   }

  const renderForm = () => {
    switch (showForm) {
      case 'sensitization':
        return (
          <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-xl mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-main-100">Steps to Submitting Properties</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">✨</span> 1. Create an Account
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your initial data is required and needed by our system to recognize you as a partner.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">🔑</span> 2. Access Your Control Panel
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You will be granted access to your dashboard after a successful signup and verification.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">📝</span> 3. Complete Your Profile
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You will be required to complete your profile upon dashboard access to help get and store your full information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">💳</span> 4. Choose a Plan
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You would then need to choose a plan already made available in your dashboard so we can properly map your account to enjoy appropriate functionalities and tools on the Spacematch platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">🏠</span> 5. Upload Your Properties
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  After which you can go ahead to upload your properties for publishing to available clients who would be interested to make a purchase.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowForm('vendor')}
              className="w-full mt-6 py-3 px-4 bg-main-100 text-white font-semibold rounded-md shadow-md hover:bg-main-100 focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200"
            >
              Proceed to Vendor Registration
            </button>
            <button 
              onClick={() => setShowForm(null)} 
              className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline"
            >
              Back
            </button>
          </div>
        );
      case 'client-sensitization':
        return (
          <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-xl mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-main-100">Steps to a Property Match</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">✨</span> 1. Create an Account
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your initial data is required and needed by our system to recognize you as a partner.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">🔑</span> 2. Access Your Control Panel
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You will be granted access to your dashboard after a successful signup and verification.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">📝</span> 3. Complete Your Profile
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You will be required to complete your profile upon dashboard access to help get and store your full information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">💳</span> 4. Choose A plan
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You would then need to choose a plan already made available in your dashboard so we can properly map your your account to enjoy appropriate functionalities and tools on the spacematch platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">🤝</span> 5. Match preferred property
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Property matching access will be granted after subscription has been successfully done.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
                  <span className="text-main-100 mr-2 text-2xl">💰</span> 6. Property Purchase
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Then a purchase can be initiated.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowForm('client')}
              className="w-full mt-6 py-3 px-4 bg-main-100 text-white font-semibold rounded-md shadow-md hover:bg-main-100 focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200"
            >
              Proceed to Create an Account
            </button>
            <button 
              onClick={() => setShowForm(null)} 
              className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline"
            >
              Back
            </button>
          </div>
        );
      case 'vendor':
        return (
          <form onSubmit={handleVendorSignUp} className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl mt-20">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Vendor Sign Up</h2>
              <div className="space-y-4">
                  <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-3'>
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input 
                        type="text" 
                        name='name'
                        onChange={(e: any) => setForm({...form, name: e.target.value})} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="John Doe" 
                        required
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        onChange={(e: any) => setForm({...form, email: e.target.value})} 
                        placeholder="you@example.com" 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100"
                        required
                      />
                  </div>
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                   type="text" 
                   name='business_name'
                   onChange={(e: any) => setForm({...form, business_name: e.target.value})} 
                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" 
                   placeholder="Your Company Inc." 
                  />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                      <select ref={codeRef} className="p-2 border border-gray-300 rounded-l-md focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700 w-[30%]" required>
                      {countryCodes.map((c, index) => (
                          <option key={`${c.code}-${index}`} value={c.code}>{c.code} {c.name}</option>
                      ))}
                      </select>
                      <input type="tel" onChange={(e: any) => setForm({...form, mobile: e.target.value})} className="flex-1 block w-full p-2 border border-gray-300 rounded-r-md focus:ring-main-100 focus:border-main-100" placeholder="e.g., 809 554 6085" />
                  </div>
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700">Vendor Type</label>
                  <select onChange={(e: any) => setForm({...form, vendor_type: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700" required>
                      <option value="">Select Option</option>
                      {vendorTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                      ))}
                  </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className='flex justify-center items-center px-2 focus:ring-main-100 focus:border-main-100 border border-gray-300'>
                      <input 
                        type={isPasswordShown ? "text" : "password"} 
                        onChange={(e: any) => handlePasswordChange(e)} 
                        className="mt-1 block w-full p-1 rounded-md shadow-sm focus:outline-none" 
                        required
                      />
                      <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
                        {
                          isPasswordShown
                          ?
                          <Eye/>
                          :
                          <EyeOff/>
                        }
                      </div>
                    </div>
                    {/* Password Strength Indicator */}
                      {form.password.length > 0 && (
                        <div className="mt-2">
                          <PasswordStrengthMeter score={strength.score} />
                          <p className="text-sm text-right font-medium mt-1 text-gray-600">
                            Strength: <span className="font-bold">{strength.label}</span>
                          </p>
                        </div>
                      )}
                      <p className='text-red-500 mt-2'>Password must be atleast 8 characters, including Upercase, special characters and numbers</p>
                  </div>

                  <div className="flex items-center space-x-2">
                  <input 
                      type="checkbox" 
                      id="agreeTerms" 
                      name="agreeTerms" 
                      checked={isVendorAgreed}
                      onChange={(e) => setIsVendorAgreed(e.target.checked)}
                      className="h-4 w-4 text-main-100 border-gray-300 rounded focus:ring-main-100"
                      required
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                      This means that you agree with the <button type="button" onClick={() => setShowLegalModal(true)} className="text-main-100 hover:underline font-semibold">SpaceMatch terms and conditions</button>
                  </label>
                  </div>
              </div>

              {/* <div className='my-5'>
                  {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                      {Object.keys(errors).map(key => (
                          <p key={key}>{errors[key][0]}</p>
                      ))}
                  </div>
                }
              </div> */}
              <button 
                  type="submit" 
                  disabled={!isVendorAgreed}
                  className={`flex justify-center items-center w-full mt-6 py-3 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 ${isVendorAgreed ? 'bg-main-100 hover:bg-main-100' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                  {
                    loading
                    ?
                    <Loader className='animate-spin'/>
                    :
                    "Sign Up as Vendor"
                  }
              </button>
              <button onClick={() => setShowForm(null)} className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline">
                  Back
              </button>
          </form>
        );
      case 'client':
        return (
          <form className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl mt-20">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Client Sign Up</h2>
            <div className="space-y-4">
              <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-3'>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select className="p-2 border border-gray-300 rounded-l-md focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700 w-[30%]">
                    <option value=""><input className='w-full p-2'/></option>
                    {countryCodes.map((c, index) => (
                      <option key={`${c.code}-${index}`} value={c.code}>{c.code} {c.name}</option>
                    ))}
                  </select>
                  <input type="tel" className="flex-1 block w-full p-2 border border-gray-300 rounded-r-md focus:ring-main-100 focus:border-main-100" placeholder="e.g., 809 554 6085" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation</label>
                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700">
                  <option value="">
                    <input className='w-full p-2'/>
                  </option>
                  {clientOccupations.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="agreeTerms" 
                  name="agreeTerms" 
                  checked={isClientAgreed} 
                  onChange={(e) => setIsClientAgreed(e.target.checked)}
                  className="h-4 w-4 text-main-100 border-gray-300 rounded focus:ring-main-100"/>
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  This means that you agree with the <button type="button" onClick={() => setShowLegalModal(true)} className="text-main-100 hover:underline font-semibold">SpaceMatch terms and conditions</button>
                </label>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={!isClientAgreed}
              className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 ${isClientAgreed ? 'bg-main-100 hover:bg-main-100' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Sign Up as Client
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <a href="#" className="font-medium text-main-100 hover:underline">Sign in here</a>
            </p>
            <button onClick={() => setShowForm(null)} className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline">
              Back
            </button>
          </form>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Join Spacematch</h2>
            <p className="text-gray-600 text-center mb-8">Choose your account type to get started.</p>
            <div className="flex flex-col space-y-4 w-full">
              <button
                onClick={() => setShowForm('sensitization')}
                className="w-full py-4 px-6 bg-main-100 text-white font-semibold rounded-lg shadow-md hover:bg-main-100 focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Sign Up as a Vendor
              </button>
              <button
                onClick={() => setShowForm('client-sensitization')}
                className="w-full py-4 px-6 bg-main-100 text-white font-semibold rounded-lg shadow-md hover:bg-main-100 focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Sign Up as a Client
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-[Inter]">
      <div className="w-full flex flex-col items-center space-y-8">
        {/* <h1 className="text-4xl font-extrabold text-main-100 animate-pulse">Spacematch</h1> */}
        {renderForm()}
      </div>
      {showLegalModal && <LegalModal onClose={() => setShowLegalModal(false)} content={legalContent} />}
    </div>
  );
};

export default SignUp;
