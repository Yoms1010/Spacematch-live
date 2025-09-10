'use client'

import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Link from 'next/link';

function PropertySolutions() {

  const [prefab, setPrefab] = useState(false)
  const [trad, setTrad] = useState(false)
  const [block, setBlock] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)


  const handlePrefab = () => {
    setPrefab(true)
    setTrad(false)
    setBlock(false)
    setModalOpen(true)
  }

  const handleTrad = () => {
    setTrad(true)
    setPrefab(false)
    setBlock(false)
    setModalOpen(true)
  }
  const handleBlock = () => {
    setBlock(true)
    setTrad(false)
    setPrefab(false)
    setModalOpen(true)
  }

  return (
    <section className=" p-5">
        <div className='container flex flex-col items-center gap-3 text-center mb-5 '>
            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-3'>
              <span className='flex justify-center items-center border rounded-l-2xl p-3'>
                Spacematch is not a property developer: we're a collaborative property matching platform. Our core business is helping individuals pool resources to co-own in land and build tailored living or rental solutions.
              </span>
              <span className='flex justify-center items-center border rounded-r-2xl p-3'>
                To support this process, we advertise a curated range of housing products from verified vendors directly on our platform, ensuring seamless operations, order accuracy, and transparent transactions. Spacematch manages the fulfillment process end-to-end, so you get exactly what you paid for, and vendors are paid only upon confirmation of delivery.
              </span>
            </div>
            <p className='text-main-100 text-xl font-semibold'>
              Once your land acquisition and co-ownership plan is in place, you can explore these available building options:
            </p>
        </div>
        <div className="">
          <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-3'>
            
            <div className={`min-h-[400px] w-full text-white border-b-4 border-main-100 rounded-tl-xl rounded-tr-xl grid bg-cover bg-[url(/solutions/sol-1.jpeg)]`}>
              <div className="col-start-1 row-start-1 bg-gray-950/30 w-full h-full rounded-tl-xl rounded-tr-xl"></div>
              <div className="col-start-1 z-10 row-start-1">
                <div className='flex flex-col gap-1 items-start p-5 justify-end h-full'>
                  <div className='text-2xl max-sm:text-xl font-bold'>Prefab Homes</div>
                  {/* <div className='text-xs max-sm:text-xl italic'>Starting from ₦20 million (less than the cost of a new SUV)</div> */}
                  <div className='text-sm mb-1 mt-3'>
                    One-floor, fully furnished modular homes delivered in under 2 months. No foundation required, ideal for launching an Airbnb or quick personal housing solution.
                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <button 
                      onClick={handlePrefab}
                      className='bg-main-100 py-1 px-2 rounded  font-semibold hover:shadow-2xl hover:shadow-white w-full'
                    >
                      How it Works
                    </button>
                  </div>
                </div>  
              </div>
            </div>

            <div className={`min-h-[350px] w-full text-white border-b-4 border-main-100 rounded-tl-xl rounded-tr-xl grid bg-cover bg-[url(/solutions/sol-2.jpg)]`}>
              <div className="col-start-1 row-start-1 bg-gray-950/30 w-full h-full rounded-tl-xl rounded-tr-xl"></div>
              <div className="col-start-1 z-10 row-start-1">
                <div className='flex flex-col gap-1 items-start p-5 justify-end h-full'>
                  <div className='text-2xl max-sm:text-xl font-bold'>Traditional Buildings</div>
                  {/* <div className='text-xs max-sm:text-xl italic'>Starting from ₦30 million</div> */}
                  <div className='text-sm mb-1 mt-3'>
                    Custom-built using conventional methods and modern finishes, perfect for permanent residences, offices, or commercial spaces.
                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <button 
                      onClick={handleTrad}
                      className='bg-main-100 py-1 px-2 rounded text-white font-semibold hover:shadow-2xl hover:shadow-white w-full'
                    >
                      How it Works
                    </button>
                  </div>
                </div>  
              </div>
            </div>

            <div className={`min-h-[400px] w-full text-white border-b-4 border-main-100 rounded-tl-xl rounded-tr-xl grid bg-cover bg-[url(/solutions/sol-3.jpeg)]`}>
              <div className="col-start-1 row-start-1 bg-gray-950/30 w-full h-full rounded-tl-xl rounded-tr-xl"></div>
              <div className="col-start-1 z-10 row-start-1">
                <div className='flex flex-col gap-1 items-start p-5 justify-end h-full'>
                  <div className='text-2xl max-sm:text-xl font-bold'>Prefab Block of Flats</div>
                  {/* <div className='text-xs max-sm:text-xl italic'>Starting from ₦40 million.</div> */}
                  <div className='text-sm mb-1 mt-3'>Pre-designed multi-unit apartments optimized for fast construction and high rental returns, perfect for co-investors seeking long-term income.</div>
                  <div className='w-full flex justify-center items-center'>
                    <button 
                      onClick={handleBlock}
                      className='bg-main-100 py-1 px-2 rounded text-white font-semibold hover:shadow-2xl hover:shadow-white w-full'
                    >
                      How it Works
                    </button>
                  </div>
                </div>  
              </div>
            </div>

          </div>
        </div>

        <div className='modal z-570'>
          <Dialog open={modalOpen} onClose={setModalOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
              <div className="flex min-h-full items-start  justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-[500px]">
                    <div className="flex max-sm:items-start mb-5 border-b-2">
                      <div className="flex flex-row justify-between items-center mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full space-x-2">
                        {
                          prefab
                          ?
                          <div className="flex flex-col items-center text-center gap-1  text-gray-900">
                            <label className='text-xl max-sm:text-sm font-bold'>Prefab Single-Unit Capsule Homes</label>
                            <div className='border-b-2 border-main-100 w-[100px]'></div>
                            <p className='max-sm:text-xs'>How it works</p>
                          </div>
                          :
                          trad
                          ?
                          <div className="flex flex-col items-center text-center gap-1  text-gray-900">
                            <label className='text-xl max-sm:text-sm font-bold'>Traditional Buildings</label>
                            <div className='border-b-2 border-main-100 w-[100px]'></div>
                            <p className='max-sm:text-xs'>How it works</p>
                          </div>
                          :
                          <div className="flex flex-col items-center text-center gap-1  text-gray-900">
                            <label className='text-xl max-sm:text-sm font-bold'>Modular Apartments</label>
                            <div className='border-b-2 border-main-100 w-[100px]'></div>
                            <p className='max-sm:text-xs'>How it works</p>
                          </div>
                        }
 
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setModalOpen(false)}
                          className="border-2 border-red-600 p-2"
                        >
                          X
                        </button>
                      </div>
                    </div>

                    {
                      prefab
                      ?
                      <div className='flex flex-col gap-4 how-it-works p-3 overflow-y-scroll h-[400px] z-800'>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟦 Step 1: Try for Free
                          </label>
                          <p className='italic text-sm'>
                          Explore sample capsule designs, view demo plots, and test our matching system—no payment required.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟫 Step 2: Subscribe to Unlock Full Access
                          </label>
                          <p className='italic text-sm'>
                          Choose a plan to gain access to verified prefab vendors, land options, and furniture add-ons.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟩 Step 3: Get matched
                          </label>
                          <p className='italic text-sm'>
                          our smart system pairs you with the best-fit land and prefab design based on your location, purpose, and budget.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟨 Step 4: Fund Smart Wallet
                          </label>
                          <p className='italic text-sm'>
                          once your build plan and vendor are confirmed, fund your secure project wallet.
                          This wallet safely holds your payment and releases funds in milestone-based tranches (Purchase of capsule, shipping, and foundation, assembly, connecting power, drainage and supply of water).
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟧 Step 5: Build, Approve & Move In
                          </label>
                          <p className='italic text-sm'>
                            Your prefab home is built in phases. After each phase, you approve progress before payment is released. Move in or lease when completed.
                          </p>
                        </div>

                      </div>
                      : 
                      trad
                      ?
                      <div className='flex flex-col gap-4 how-it-works p-3 overflow-y-scroll h-[400px] z-800'>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🔷 Step 1: Explore Designs & Location Options (Free)
                          </label>
                          <p className='italic text-sm'>
                          Browse sample architectural models, view demo plots, and interact with our matching system , all with no commitment. Use this to understand what’s possible based on your location and preferred plot size (starting from 50 sqm).
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🔶 Step 2: Choose Preferences & Subscribe
                          </label>
                          <p className='italic text-sm'>
                            Select your desired location, indicate your preferred space requirements, and choose an architectural model that suits your lifestyle. Subscribe to unlock access to our smart matching system.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟩 Step 3: Get Matched to Land, Co-Owners & Team
                          </label>
                          <p className='italic text-sm'>
                            Our system matches you with suitable land, connects you with potential co-owners (if applicable), and suggests architectural designs that comply with estate or LGA regulations. You'll also be paired with verified local professionals for your build.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟨 Step 4: Confirm Match, Sign Contract & Lock Funds
                          </label>
                          <p className='italic text-sm'>
                            Once matched, review your package: land, team, cost estimate, and timeline. Sign the digital agreement and project terms. Then, lock your funds into a secure digital wallet, funds are held in escrow and only released upon milestone completion.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟦 Step 5: Meet Your Dedicated Project Manager
                          </label>
                          <p className='italic text-sm'>
                            Get introduced to your personal project manager who will oversee your entire project, coordinating vendors, verifying milestones, and keeping you updated throughout each stage of the build.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟫 Step 6: Construction Begins: Milestone by Milestone
                          </label>
                          <p className='italic text-sm'>
                          Once the project kicks off, payments are disbursed only after you confirm completion of key phases (e.g., foundation, lintel, roofing, finishing). This ensures transparency and quality delivery.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟧 Step 7: Materials & Interior Personalization
                          </label>
                          <p className='italic text-sm'>
                          You have full ownership and responsibility for purchasing building materials (guided by our experts). As your home nears completion, you can select interior styling and furniture packages to suit your taste and budget.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟩 Step 8: Final Handover & Move-In
                          </label>
                          <p className='italic text-sm'>
                            Following the final inspection and project sign-off, your keys are handed over. Your dream space is now yours, designed, funded, and built with confidence.
                          </p>
                        </div>

                      </div>
                      :
                      <div className='flex flex-col gap-4 how-it-works p-3 overflow-y-scroll h-[400px] z-800'>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟦 Step 1: Start with a Free Trial
                          </label>
                          <p className='italic text-sm'>
                          Explore how modular apartments work, check out sample floor plans, and view open co-building opportunities.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟫 Step 2: Subscribe & Join a Build Group
                          </label>
                          <p className='italic text-sm'>
                          Join an active modular project. Get matched to land, co-owners, and contractors, based on unit type and city of interest.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟩 Step 3: Design Unit & Confirm Build Plan
                          </label>
                          <p className='italic text-sm'>
                          Choose your unit layout and customize your space within the allocated floor area.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟨 Step 4: Fund Secure Wallet for Phased Payment
                          </label>
                          <p className='italic text-sm'>
                          Fund your escrow-style wallet. Payments are disbursed to your contractors in tranches—only after you approve each project milestone.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟧 Step 5: Purchase Building Materials
                          </label>
                          <p className='italic text-sm'>
                          As the homeowner, it is your responsibility to purchase all necessary building materials. Contractors/vendors will use these materials during the construction phases.
                          </p>
                        </div>

                        <div className='flex flex-col gap-1 step-on'>
                          <label htmlFor="" className='font-semibold flex justify-start items-center'>
                          🟫 Step 6: Build, Approve & Furnish
                          </label>
                          <p className='italic text-sm'>
                          Stay in control throughout the process. Upon final approval and payment, receive a fully built and optionally furnished unit.
                          </p>
                        </div>

                      </div>
                    }
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex flex-row justify-center items-center">
                    {
                      prefab
                      ?
                      <Link 
                      // href="#"
                        href={{
                          pathname: "/property/solutions",
                          query: {type: "prefab-homes"}
                        }}
                       className='flex justify-center items-center p-2 bg-main-100 font-semibold w-full text-white hover:shadow-xl rounded'
                      >
                        Check it Out
                      </Link>
                      :
                      trad
                      ?
                      <Link 
                      href="#"
                      //  href={{
                      //     pathname: "/property/solutions",
                      //     query: {type: "traditional-buildings"}
                      //   }}
                       className='flex justify-center items-center p-2 bg-main-100 font-semibold w-full text-white hover:shadow-xl rounded'
                        aria-disabled
                      >
                        Check it Out
                      </Link>
                      :
                      <Link 
                      href="#"
                      //  href={{
                      //     pathname: "/property/solutions",
                      //     query: {type: "modular-apartments"}
                      //   }}
                       className='flex justify-center items-center p-2 bg-main-100 font-semibold w-full text-white hover:shadow-xl rounded'
                       aria-disabled
                      >
                        Check it Out
                      </Link>
                    }
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
    </section>
  )
}

export default PropertySolutions
