import { countryCodes } from '@/constants';
import { vendorTypes } from '@/constants/main';
import { useStateContext } from '@/context/ContextProvider';
import { checkPasswordStrength } from '@/lib/utils';
import axios from 'axios';
import { Eye, EyeOff, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { toast } from 'react-toastify';

function VendorSignUp({showForm, setShowForm, showLegalModal, setShowLegalModal}: {showForm: string | null, setShowForm: Dispatch<SetStateAction<string>> | any, showLegalModal: boolean|null, setShowLegalModal:Dispatch<SetStateAction<string>> | any,}) {
  const [isVendorAgreed, setIsVendorAgreed] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [strength, setStrength] = useState({ score: 0, label: '' });
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
  const {setUser, setToken} = useStateContext()


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
              const resData = response.data.resData;
              const data = JSON.parse(resData)
              setUser(data?.user)
              setToken(data?.token)
              setLoading(false)
              typeof window !== undefined && window.localStorage.setItem("currentView", 'onboarding')
              toast.success("Account successfully created. Redirecting...")
              router.push("/in/settings")
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

  return (
    <div className="bg-gray-100 min-h-screen pt-28 pb-20 font-sans ">
      {/* <header className="bg-white shadow-sm rounded-xl p-6 mb-8 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-800">Vendor Registration</h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our network of professionals and connect with clients to build their dream homes.
          </p>
        </div>
      </header> */}
      <main className="container mx-auto max-w-4xl">
        <section className="bg-white rounded-xl shadow-lg p-8">
          <form id="vendor-registration-form" className="space-y-6" onSubmit={handleVendorSignUp}>
            {/* Personal & Business Information */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>Personal & Business Information</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e: any) => setForm({...form, name: e.target.value})}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e: any) => setForm({...form, email: e.target.value})}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name *</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={form.business_name}
                    onChange={(e: any) => setForm({...form, business_name: e.target.value})}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex">
                  <div className="w-1/3 pr-2">
                    <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Code *</label>
                    <select
                      id="countryCode"
                      name="countryCode"
                      ref={codeRef}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {countryCodes.map((country, index) => (
                        <option key={index} value={country.code}>
                          {country.code} ({country.name})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-2/3 pl-2">
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number *</label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      onChange={(e: any) => setForm({...form, mobile: e.target.value})}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            <hr className="my-6 border-gray-200" />
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>Vendor Details</span>
              </h4>
              <div>
                <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700">Vendor Type *</label>
                <select
                  id="vendorType"
                  name="vendorType"
                  value={form.vendor_type}
                  onChange={(e: any) => setForm({...form, vendor_type: e.target.value})}
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                >
                  {vendorTypes.map((type, index) => (
                    <option key={index} value={type === 'Select Option' ? '' : type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password & Terms */}
            <hr className="my-6 border-gray-200" />
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
                <span>Password & Terms</span>
              </h4>
              

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className='flex justify-center items-center px-2 focus:ring-purple-700 focus:border-purple-700 border border-gray-300'>
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


              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsAgreed"
                  name="termsAgreed"
                  checked={isVendorAgreed}
                  onChange={(e) => setIsVendorAgreed(e.target.checked)}
                  required
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    This means that you agree with the <button type="button" onClick={() => setShowLegalModal(true)} className="text-main-100 hover:underline font-semibold">SpaceMatch terms and conditions</button>
                </label>
              </div>
            </div>

            <div className="text-center mt-6">
              <button 
                type="submit" 
                disabled={!isVendorAgreed}
                className={`flex justify-center items-center w-full mt-6 py-3 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 transition-all duration-200 ${isVendorAgreed ? 'bg-purple-700 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
               >
                    {
                    loading
                    ?
                    <Loader className='animate-spin'/>
                    :
                    "Sign Up"
                    }
            </button>
            </div>
          </form>
          <button onClick={() => setShowForm(null)} className="w-full mt-3 py-2 text-indigo-600 font-semibold rounded-md hover:underline">
            Back
          </button>
        </section>
      </main>
    </div>
  )
}

export default VendorSignUp
