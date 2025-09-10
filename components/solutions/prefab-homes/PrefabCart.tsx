import { useStateContext } from '@/context/ContextProvider';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
var CurrencyFormat = require('react-currency-format');

declare interface ModalProps {
  modalOpen: boolean,
  setModalOpen: any
}

function PrefabCart({modalOpen, setModalOpen}: ModalProps) {

  const {token} = useStateContext()
  const [reload, setReload] = useState(false)
  const [purchaseStudio, setPurchaseStudio] = useState<any>()
  const [purchaseOneBed, setPurchaseOneBed] = useState<any>()
  const [purchaseTwoBed, setPurchaseTwoBed] = useState<any>()
  

  const handlePurchaseBuildItem = () => {
    const studioItems = JSON.parse(localStorage.getItem("studio")!);
    const oneBedItems = JSON.parse(localStorage.getItem("oneBed")!);
    const twoBedItems = JSON.parse(localStorage.getItem("twoBed")!);

    setPurchaseStudio(studioItems)
    setPurchaseOneBed(oneBedItems)
    setPurchaseTwoBed(twoBedItems)
  }

  useEffect(() => {
    handlePurchaseBuildItem()
  }, [modalOpen, setModalOpen, reload, setReload])


  const handleStudioPurchase = () => {
    if (!token) alert("Kindly sign in first");
  }


  function handleOneBedPurchase(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  // const onSquadcoPay = async () => {
  //         const requestData = {
  //             email: user && user.email, 
  //             amount: newAmount > 0 ? newAmount*100 : subData && subData.cost_naira*100, 
  //             currency: currency,
  //         }
          
  //         setIsLoading(true)
  //         // const res = await squadcoPay(requestData!)
  //         const squadInstance = new squad({
  //             onClose: () => console.log("Widget closed"),
  //             onLoad: () => console.log("Widget loaded successfully"),
  //             onSuccess: (res: any) => {onSquadcoPaySuccess(res); console.log(`Linked successfully`, res);},
  //             key: process.env.NEXT_PUBLIC_SQUADCO_SANDBOX_API_KEY,
  //             //Change key (test_pk_sample-public-key-1) to the key on your Squad Dashboard
  //             // transac: requestData.email,
  //             email: requestData.email,
  //             amount: requestData.amount,
  //             //Enter amount in Naira or Dollar (Base value Kobo/cent already multiplied by 100)
  //             currency_code: requestData.currency
  //         });
  //         squadInstance.setup();
  //         squadInstance.open();
  //         setIsLoading(false)
  //         // console.log(res);
  // }

    // const onSquadcoPaySuccess = (res: any) => {
    //     const payLoad = {
    //         client_id: user && user.whoId.split(";")[1],
    //         client_sc_id: subData && subData.id,
    //         title: subData && subData.title,
    //         amount: res.amount/100,
    //         currency: res.currency_code,
    //         transaction_ref: res.transaction_ref,
    //         payment_option: "card",
    //         status: "successful",
    //         active: "Yes"
    //     }

    //     axiosClient.post("/client/subscription", payLoad)
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

  function handleDeleteCart(item: any): void {
    localStorage.removeItem(item.key)
    setReload(true)

    setTimeout(() => setReload(false), 1000)
  }

  return (
    <div>
     {
      modalOpen
      &&
       <div className='absolute top-0 right-0 h-[100vh] w-[500px] shadow-lg z-[70] bg-white p-2'>
          <div className='flex flex-col gap-3 bg-gray-100 h-full w-full p-5'>
              <div className='flex justify-between items-center bg-white rounded p-2'>
                <h1 className='font-semibold text-xl'>Check Out</h1>
                <CgClose
                 onClick={() => setModalOpen(false)}
                 className='text-red-500 size-7 cursor-pointer text-red-500/70'
                />
              </div>
              <div className='bg-white p-5 w-full overflow-y-scroll h-full'>
                <div className='flex flex-col gap-5'>
                  {
                    purchaseStudio
                    &&
                    (
                      <div className='border'>
                        <div className='flex justify-between items-center p-2'>
                          <div className='font-bold'><p>{purchaseStudio[0]?.title}</p></div>
                          <button
                           onClick={() => handleDeleteCart(purchaseStudio[0])}
                           className='flex justify-center items-center'
                          >
                            <Trash2 className='text-red-500'/>
                          </button>
                        </div>
                        <div className='flex flex-col gap-2 shadow-md p-3'>
                          <div className='flex flex-col gap-2 overflow-y-scroll h-[200px]'>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold'>Home Type</h1><span>:</span><p>{purchaseStudio[0]?.title}</p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold'>Home Cost</h1><span>:</span><p><CurrencyFormat value={purchaseStudio[0]?.homecost} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                            <div className='mt-2 mb-1 border-b text-sm'>Additional Equipments</div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold '>0.6M Wardrobe</h1><span>:</span><p>{purchaseStudio[0]?.wardrobe}</p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>Appliances (Wires, sockets, switches, lights, and water pipes)</h1><span>:</span><p>{purchaseStudio[0]?.appliance}</p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>1.8Hotel mattress 1.8m bed + mattress</h1><span>:</span><p>{purchaseStudio[0]?.mattress}</p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>Sofa (SOFA：210*89*80  SOFA BED：185*138*43)</h1><span>:</span><p><CurrencyFormat value={purchaseStudio[0]?.sofa} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                          </div>

                          <div className='flex justify-between px-5 py-2 border-t border-b my-3'>
                            <h1>Total Cost</h1><span>:</span><p><CurrencyFormat value={purchaseStudio[0]?.total} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                          </div>

                          <button
                            onClick={handleStudioPurchase}
                            className='bg-main-100 p-2 rounded text-white'
                          >
                            Purchase Studio
                          </button>
                        </div>
                      </div>
                    )
                    }
                    {
                    purchaseOneBed
                    &&
                    ( 
                      <div className='border'>
                        <div className='flex justify-between items-center p-2'>
                          <div className='font-bold'><p>{purchaseOneBed[0]?.title}</p></div>
                          <button
                           onClick={() => handleDeleteCart(purchaseOneBed[0])}
                           className='flex justify-center items-center'
                          >
                            <Trash2 className='text-red-500'/>
                          </button>
                        </div>
                        <div className='flex flex-col gap-2 shadow-md p-3'>
                          <div className='flex flex-col gap-2 overflow-y-scroll h-[200px]'>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold'>Home Type</h1><span>:</span><p>{purchaseOneBed[0]?.title}</p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold'>Home Cost</h1><span>:</span><p><CurrencyFormat value={purchaseOneBed[0]?.homecost} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                            <div className='mt-2 mb-1 border-b text-sm'>Additional Equipments</div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold '>0.6M Wardrobe</h1><span>:</span><p><CurrencyFormat value={purchaseOneBed[0]?.wardrobe} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>Appliances (Wires, sockets, switches, lights, and water pipes)</h1><span>:</span><p><CurrencyFormat value={purchaseOneBed[0]?.appliance} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>1.8Hotel mattress 1.8m bed + mattress</h1><span>:</span><p><CurrencyFormat value={purchaseOneBed[0]?.mattress} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                            <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>Sofa (SOFA：210*89*80  SOFA BED：185*138*43)</h1><span>:</span><p><CurrencyFormat value={purchaseOneBed[0]?.sofa} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>
                          </div>
                          <div className='flex justify-between px-5 py-2 border-t border-b my-3'>
                            <h1>Total Cost</h1><span>:</span><p><CurrencyFormat value={purchaseOneBed[0]?.total} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                          </div>

                          <button
                            onClick={handleOneBedPurchase}
                            className='bg-main-100 p-2 rounded text-white'
                          >
                            Purchase One Bed
                          </button>
                        </div>
                      </div> 
                    )
                    }
                    {
                      purchaseTwoBed
                      &&
                      (
                        <div className='border'>
                          <div className='flex justify-between items-center p-2'>
                            <div className='font-bold'><p>{purchaseTwoBed[0]?.title}</p></div>
                            <button
                            onClick={() => handleDeleteCart(purchaseTwoBed[0])}
                            className='flex justify-center items-center'
                            >
                              <Trash2 className='text-red-500'/>
                            </button>
                          </div>
                          <div className='flex flex-col gap-2 shadow-md p-3'>

                            <div className='flex flex-col gap-2 overflow-y-scroll h-[200px]'>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold'>Home Type</h1><span>:</span><p>{purchaseTwoBed[0]?.title}</p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold'>Home Cost</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.homecost} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='mt-2 mb-1 border-b text-sm'>Additional Equipments</div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold '>0.6M Wardrobe</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.wardrobe} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>Appliances (Wires, sockets, switches, lights, and water pipes)</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.appliance} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>1.8Hotel mattress 1.8m bed + mattress</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.mattress} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>Sofa (SOFA：210*89*80  SOFA BED：185*138*43)</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.sofa} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>3M Cabinet</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.cabinet} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>2.04M Hanging cabinet</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.sofa} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>Steps</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.steps} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>Triplex Glass</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.triplexGlass} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>2+3P 2+3P Inverter Heating & Cooling Air-conditioning</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.inverterHeatingCoolingAC} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>17.1*2.34 curtain</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.curtain} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>Motorised curtain track</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.motorisedCurtainTrack} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                  <h1 className='font-semibold truncate w-[170px]'>Built-in single-head induction hob</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.washingMachine} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>595*595*850mm Washing machine</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.washingMachine} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>Refrigerator</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.refrigerator} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                              <div className='flex justify-between px-5 text-sm'>
                                <h1 className='font-semibold truncate w-[170px]'>Extractor hoods</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.extractorHood} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                              </div>
                            </div>

                            <div className='flex justify-between px-5 py-2 border-t border-b my-3'>
                              <h1>Total Cost</h1><span>:</span><p><CurrencyFormat value={purchaseTwoBed[0]?.total} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                            </div>

                            <button
                              onClick={handleOneBedPurchase}
                              className='bg-main-100 p-2 rounded text-white'
                            >
                              Purchase Two Bed
                            </button>
                          </div>
                        </div> 
                      )
                    }
                    {
                      !purchaseStudio && !purchaseOneBed && !purchaseTwoBed
                        &&
                      <div className='flex justify-center items-center h-[400px]'>
                        <span>No item for purchase yet</span>
                      </div>
                    }
                </div>
              </div>
          </div>
      </div>
     }
    </div>
  )
}

export default PrefabCart
