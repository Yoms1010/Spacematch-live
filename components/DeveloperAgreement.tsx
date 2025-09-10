'use client'

import { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import SignaturePad from "react-signature-canvas";
import axiosClient from '@/axios-client'
import { useStateContext } from '@/context/ContextProvider';
import "../sig-canvas.css"
import Image from 'next/image';

interface UserProps{
    currentUser: {
        id: number
        whoId: any
        name: string
    }
}
const DeveloperAgreement = ({currentUser}: UserProps) => {
  const [open, setOpen] = useState(false)
  const sigCanvas = useRef<any>(null);
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageURL, setImageURL] = useState<any>(null); // create a state that will contain our image url
  const [vendor, setVendor] = useState<any>()
  const {notification, setNotification} = useStateContext()
  
  const now = new Date();

  useEffect(() => {
    axiosClient.get(`/developer/${currentUser.whoId.split(";")[1]}`)
    .then((data) => {
        console.log(data.data.data);
        // const vend = data.data
        setVendor(data.data.data)
    })
    .catch(err => {
        console.log(err);
    })
  }, [])

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    setImageURL(sigCanvas.current.toDataURL("image/png"));
  }

  // const convertDataUrlToImage = () => {
  //   if (!imageURL) return;

  //   const arr = imageURL.split(',');
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   const file = new File([u8arr], "signature", { type: mime });
  //   setImageFile(file);
  //   console.log(file);
    
  //   return alert(file)

  // }


  const onAgreementChange = async (event: ChangeEvent<HTMLInputElement>) => {

    if (!imageURL) return alert("You are yet to sign");

    const arr = imageURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const signature = new File([u8arr], "vendor-signature", { type: mime });

    const formData = new FormData();
    formData.append('signature', signature);

      if (event.target.checked) {
        if (!window.confirm("By clicking 'Ok', you agree with our policy and you automaticatically signed the agreement electronically.")) {
            setIsChecked(false)  
          return alert("Kindly click 'OK' to submit your Signature")
        }

        setIsChecked(true) 
        setIsLoading(true) 

        await axiosClient.post("/policy-agreement-signing/developer", formData)
        .then(res => {
          setIsChecked(false) 
          setIsLoading(false) 
          setNotification('Policy Agreement Signed Successfully..')
          console.log(res)
        })
        .catch(err => {
          setIsChecked(false) 
          setIsLoading(false) 
          console.log(err);
          
        })
      }

  }
  

  return (
    <Suspense
        fallback={<div className="h-screen flex justify-center items-center text-30 font-bold w-full">
        <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-spin shadow-sm rounded-full"/>
        </div>}
    >
        <div>
            <div className="overflow-y-scroll max-h-[450px] bg-white p-3">               
            <p>This Sales Partnership Agreement (the “Agreement”) is entered into on [Insert Date] by and between SpaceMatch Ltd (hereinafter referred to as “SpaceMatch”) and [Developer’s Name/Entity] (hereinafter referred to as the “Developer”).</p><br />
            <b>1. Scope of the Agreement</b><br />
            <p className='ml-4'>1.1. Purpose: The Developer appoints SpaceMatch as a marketing and sales facilitator to promote and facilitate the sale of properties listed by the Developer through the SpaceMatch platform.</p><br />
            <p className='ml-4'>1.2. Non-Exclusive Relationship: This Agreement does not establish an exclusive partnership unless otherwise stated in a written amendment.</p><br />
            <b>2. Responsibilities of the Developer</b>
            <p className='ml-4'>2.1. Commission Payment: The Developer agrees to pay SpaceMatch a standard sales commission of [Insert Percentage]% for every property successfully sold through the platform. Payment will be made within 30 days of the property sale closing.</p><br />
            <p className='ml-4'>2.2. Property Details: The Developer must provide accurate and complete details of all properties listed on the platform, including but not limited to:
            <p className='ml-4'>•	Property dimensions and descriptions.</p>
            <p className='ml-4'>•	Permitted building types and limitations, such as height restrictions, zoning laws, and approved use (e.g., residential, commercial).</p>
            <p className='ml-4'>•	Compliance with state or governing council regulations related to property development.</p>
            </p><br />
            <p className='ml-4'>2.3. Regulatory Compliance: The Developer assumes full responsibility for ensuring compliance with all legal, regulatory, and municipal requirements.</p>
            <p className='ml-4'>2.4. Indemnity for Losses: The Developer acknowledges that SpaceMatch will not bear any financial loss or liability resulting from:
            <p className='ml-4'>•	Disputes or legal actions related to property sales or ownership.</p>
            <p className='ml-4'>•	Non-compliance with governmental or regulatory bodies.</p>
            <p className='ml-4'>•	Misrepresentation or omission of critical property details.</p>
            </p><br />
            <b>3. Responsibilities of SpaceMatch</b>
            <p className='ml-4'>3.1. Marketing Services: SpaceMatch will promote properties listed by the Developer using its platform and associated marketing tools, including digital campaigns and customer outreach.</p><br />
            <p className='ml-4'>3.2. Buyer Liaison: SpaceMatch will serve as the intermediary between the Developer and potential buyers to facilitate transactions and address inquiries.</p><br />
            <p className='ml-4'>3.3. Platform Transparency: SpaceMatch will ensure the accuracy of property listings on the platform based on the information provided by the Developer.</p><br />
            <b>4. Buyer Protection and Disclosures</b>
            <p className='ml-4'>4.1. Information Accuracy: SpaceMatch relies on the Developer to provide truthful, accurate, and complete information about each property. The Developer assumes all responsibility for discrepancies or omissions.</p><br />
            <p className='ml-4'>4.2. Buyer Liability: SpaceMatch will not be held liable for any disputes or litigation arising from the buyer's use or ownership of a property.</p><br />
            <p className='ml-4'>4.3. Conflict Resolution: Any disputes between the Developer and buyers must be resolved directly between the parties involved.</p><br />
            <b>5. Confidentiality and Data Use</b><br />
            <p className='ml-4'>5.1. Confidential Information: Both parties agree to keep confidential all proprietary information exchanged under this Agreement.</p><br />
            <p className='ml-4'> 5.2. Customer Data: SpaceMatch retains the right to use anonymized customer data for platform improvement and marketing purposes, in compliance with data protection laws.</p><br />
            <b>6. Term and Termination</b>
            <p className='ml-4'>6.1. Term: This Agreement will remain in effect for a period of [Insert Duration] and may be renewed upon mutual agreement.</p><br />
            <p className='ml-4'>6.2. Termination: Either party may terminate this Agreement with 30 days’ written notice. Termination will not affect any ongoing transactions or payments owed.</p><br />
            <b>7. Dispute Resolution and Governing Law</b>
            <p className='ml-4'>7.1. Arbitration: Any disputes arising under this Agreement will be resolved through binding arbitration in accordance with [Insert Arbitration Rules].</p><br />
            <p className='ml-4'>7.2. Jurisdiction: This Agreement will be governed by the laws of [Insert Jurisdiction].</p><br />
            <b>8. Miscellaneous</b>
            <p className='ml-4'>8.1. Amendments: Any amendments to this Agreement must be in writing and signed by both parties.</p><br />
            <p className='ml-4'>8.2. Force Majeure: Neither party will be held liable for delays or failures caused by unforeseen circumstances beyond their control.</p><br />
            <p className='ml-4'>8.3. Entire Agreement: This Agreement constitutes the entire understanding between the parties and supersedes any prior agreements.</p><br /><br />
            <b>9. Signatures</b>
            <p>By signing below, both parties acknowledge and agree to the terms outlined in this Agreement.</p>
            <b>For SpaceMatch Ltd</b>
            <p> Name: ___________________________</p>
            <p>Signature: ________________________</p>
            <p>Date: ____________________________</p><br />
            <b> For Developer</b>
            <p> Name: {currentUser.name}</p>
            <p>Signature: {
                    vendor && vendor.is_signed == "Yes" 
                    ? 
                    <Image 
                        src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${vendor.sign.signature_path}`}
                        width={60}
                        height={50}
                        alt=''
                        className='h-[50px] w-[60px] shadow-md shadow-gray-300'
                    /> 
                    : <button onClick={() => setOpen(true)} className='cursor-pointer text-main-100 text-sm border px-2 py-1'>Click to Sign Agreement</button>}</p>
            <p>Date: {now.toLocaleDateString()}</p><br /><br />
            
            <p>This document ensures clear accountability, protects SpaceMatch from liability, and lays out expectations for a transparent and successful partnership.</p>
        </div>

        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 min-h-[400px]">
                    <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h1" className="text-xl font-bold text-gray-900 mb-5">
                            Sign on Signature Pad Below
                        </DialogTitle>

                        <div className='flex flex-col justify-center items-center gap-3'>
                            <SignaturePad
                            ref={sigCanvas}
                            canvasProps={{
                                className: "signatureCanvas"
                            }}
                            />

                            <div className='w-[170px] min-h-[80px] border py-2'>
                            {imageURL ? (
                                <img
                                    src={imageURL}
                                    alt="my signature"
                                    style={{
                                    display: "block",
                                    margin: "0 auto",
                                    border: "1px solid black",
                                    width: "150px"
                                    }}
                                />
                                ) : null}
                            </div>

                            <div className='flex justify-center items-center space-x-2'>
                            <button 
                                onClick={save}
                                className='bg-blue-500 p-2 text-white'
                            >Check</button>
                            {/* <button 
                                onClick={convertDataUrlToImage}
                                className='bg-green-500 p-2 text-white'
                            >Convert</button> */}
                            <button 
                                onClick={clear}
                                className='border p-2 bg-red-400 text-white'
                            >Clear</button>
                            </div>
                            <div className='text-center animate-pulse text-sm my-3 text-main-100'>
                            Once you are satisfied with your signature, just check the box below to automatically submit your signature
                            </div>

                            {notification 
                            && 
                            <div className='bg-blue-500 p-2 mt-3 rounded-md text-white shadow-lg'>
                            <p>{notification}</p>
                            </div>
                            }
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-center items-center">
                    <div className='flex flex-row justify-center items-center space-x-2'>
                    <input 
                        type="checkbox" 
                        value={"Signed"}
                        onChange={onAgreementChange}
                        checked={isChecked}
                    /> 
                    <label htmlFor="agreement">By clicking this, you agree with our policy.</label>
                    </div>
                    <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="m-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                    Cancel
                    </button>
                </div>
                </DialogPanel>
            </div>
            </div>
        </Dialog>
        </div>
    </Suspense>
  )
}

export default DeveloperAgreement;
