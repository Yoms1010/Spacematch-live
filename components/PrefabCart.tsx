import { useStateContext } from '@/context/ContextProvider';
import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
var CurrencyFormat = require('react-currency-format');

declare interface ModalProps {
  modalOpen: boolean,
  setModalOpen: any
}

function PrefabCart({modalOpen, setModalOpen}: ModalProps) {

  const {token} = useStateContext()
  const [purchase, setPurchase] = useState<any>()
  

  const handlePurchaseItem = () => {
    const items = JSON.parse(localStorage.getItem("studio")!);

    setPurchase(items)
  }

  useEffect(() => {
    handlePurchaseItem()
  }, [modalOpen, setModalOpen])


  const handleStudioPurchase = () => {
    if (!token) alert("Kindly sign in first");
  }


  return (
    <div>
     {
      modalOpen
      &&
       <div className='absolute top-0 right-0 h-[100vh] w-[500px] shadow-lg z-[70] bg-white p-2'>
          <div className='flex flex-col gap-3 bg-gray-100 h-full w-full p-5'>
              <div className='flex justify-between items-center bg-white rounded p-2'>
                <h1 className='font-semibold text-xl'>Check Out {purchase[0]?.title}</h1>
                <CgClose
                 onClick={() => setModalOpen(false)}
                 className='text-red-500 size-7 cursor-pointer text-red-500/70'
                />
              </div>

              <div className='bg-white p-5 w-full overflow-y-scroll h-full'>
                    <div className='flex flex-col gap-2 shadow-md p-3'>
                      <div className='flex justify-between px-5 text-sm'>
                          <h1 className='font-semibold'>Home Type</h1><span>:</span><p>{purchase[0]?.title}</p>
                      </div>
                      <div className='flex justify-between px-5 text-sm'>
                          <h1 className='font-semibold'>Home Cost</h1><span>:</span><p><CurrencyFormat value={purchase[0]?.homecost} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                      </div>
                      <div className='mt-2 mb-1 border-b text-sm'>Additional Equipments</div>
                      <div className='flex justify-between px-5 text-sm'>
                          <h1 className='font-semibold '>0.6M Wardrobe</h1><span>:</span><p>{purchase[0]?.wardrobe}</p>
                      </div>
                      <div className='flex justify-between px-5 text-sm'>
                          <h1 className='font-semibold truncate w-[170px]'>Appliances (Wires, sockets, switches, lights, and water pipes)</h1><span>:</span><p>{purchase[0]?.appliance}</p>
                      </div>
                      <div className='flex justify-between px-5 text-sm'>
                          <h1 className='font-semibold truncate w-[170px]'>1.8Hotel mattress 1.8m bed + mattress</h1><span>:</span><p>{purchase[0]?.mattress}</p>
                      </div>
                      <div className='flex justify-between px-5 text-sm'>
                          <h1 className='font-semibold truncate w-[170px]'>Sofa (SOFA：210*89*80  SOFA BED：185*138*43)</h1><span>:</span><p><CurrencyFormat value={purchase[0]?.sofa} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                      </div>

                      <div className='flex justify-between px-5 py-2 border-t border-b my-3'>
                        <h1>Total Cost</h1><span>:</span><p><CurrencyFormat value={purchase[0]?.total} displayType={'text'} thousandSeparator={true} prefix={"₦"}/></p>
                      </div>

                      <button
                       onClick={handleStudioPurchase}
                       className='bg-main-100 p-2 rounded text-white'
                      >
                        Purchase
                      </button>
                    </div>
              </div>
          </div>
      </div>
     }
    </div>
  )
}

export default PrefabCart
