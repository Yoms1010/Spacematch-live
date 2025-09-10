import React, { useEffect, useState } from 'react'

var CurrencyFormat = require('react-currency-format');

declare interface StudioPrefabProps {
    prefabEquipments: any, 
    homeData: any, 
    setModalOpen: any, 
    setOpenModal: any
}

function StudioBuild({prefabEquipments, homeData, setModalOpen, setOpenModal}: StudioPrefabProps) {

        const [studioTotalCost, setStudioTotalCost] = useState()
    
        const [equipsAmount, setEquipsAmount] = useState<any>({
            wardrobe: 0,
            appliance: 0,
            mattress: 0,
            sofa: 0
        })
    
        function handleEquipment(): void {
            const total = Number(equipsAmount.wardrobe) + Number(equipsAmount.appliance) + Number(equipsAmount.mattress) + Number(equipsAmount.sofa)
            setStudioTotalCost(total + homeData?.cost)
        }
    
        useEffect(() => {
            handleEquipment()
        }, [equipsAmount, setEquipsAmount])
    

     function onCheckout() {
    
            const studio = [
                {   
                    key: "studio",
                    title: homeData?.title,
                    homecost: homeData?.cost, 
                    wardrobe: equipsAmount.wardrobe ? equipsAmount.wardrobe : 0,
                    appliance: equipsAmount.appliance ? equipsAmount.appliance : 0,
                    mattress: equipsAmount.mattress ? equipsAmount.mattress : 0,
                    sofa: equipsAmount.sofa ? equipsAmount.sofa : 0,
                    total: studioTotalCost
                }
            ]
    
            localStorage.setItem("studio", JSON.stringify(studio))
            setOpenModal(false)
            setModalOpen(true)
        }

  return (
    <div className='flex flex-col gap-3 text-sm'>
        <div className='p-3 border overflow-scroll max-w-full h-[130px]'>
            <div>Details</div>
            <table className="table ">
                <thead >
                    <tr className='justify-start'>
                        <th scope='row'>#</th>
                        <th scope='row'>Header</th>
                        <th scope='row'>Detail</th>
                    </tr>
                </thead>
                <tbody className='text-left'>
                        <tr className='text-left'>
                            <td>1</td>
                            <th>Unit Price</th>
                            <td>₦15,500,000.00</td>
                        </tr>
                        <tr className='text-left'>
                            <td>2</td>
                            <th>Model</th>
                            <td>A65</td>
                        </tr>
                        <tr className='text-left'>
                            <td>4</td>
                            <th>Dimensions</th>
                            <td>
                                <div className='flex flex-col justify-end'>
                                    <p>L5650</p>
                                    <p>W2250</p>
                                    <p>H2450</p>
                                </div>
                            </td>
                        </tr>
                        <tr className='text-left'>
                            <td>4</td>
                            <th>Floor Space</th>
                            <td>13.05m</td>
                        </tr>
                        <tr className='text-left'>
                            <td>5</td>
                            <th>Type</th>
                            <td>One Room</td>
                        </tr>
                        <tr className='text-left'>
                            <td>6</td>
                            <th>Number of People</th>
                            <td>Two persons</td>
                        </tr>
                        <tr className='text-left'>
                            <td>7</td>
                            <th>Electrical Power</th>
                            <td>10kw</td>
                        </tr>
                        <tr className='text-left'>
                            <td>8</td>
                            <th>Net Weight</th>
                            <td>3.5tons</td>
                        </tr>
                </tbody>
            </table>
        </div>


        <div className='flex flex-col justify-between items-center border w-full h-[180px] overflow-y-scroll p-2 gap-3'>
            <div className='flex justify-center'>
                <span className='font-semibold mb-3'>Click to Select Equipment to Furnish your Home</span>
            </div>
            <div className='space-y-3'>
                <div className='grid grid-cols-3 gap-3'>

                    {/* {
                        prefabEquipments.map((item,i) => ( */}
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[0].value} 
                                    id={prefabEquipments[0].value} 
                                    className="" 
                                    value={prefabEquipments[0].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, wardrobe: e.target.value || 0 || 0})}
                                />
                                <label htmlFor={prefabEquipments[0].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[0].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[0].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[1].value} 
                                    id={prefabEquipments[1].value} 
                                    className="" 
                                    value={prefabEquipments[1].cost} 
                                onChange={(e) => setEquipsAmount({...equipsAmount, appliance: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[1].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[1].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[1].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[2].value} 
                                    id={prefabEquipments[2].value} 
                                    className="" 
                                    value={prefabEquipments[2].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, mattress: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[2].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[2].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[2].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[3].value} 
                                    id={prefabEquipments[3].value} 
                                    className="" 
                                    value={prefabEquipments[3].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, sofa: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[3].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[3].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[3].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                        {/* ))
                    } */}

                </div>
            </div>
        </div>

        <div className='flex justify-center items-center border p-2 w-full'>
            <span className='font-semibold text-xl'>
                <CurrencyFormat value={studioTotalCost || homeData?.cost} displayType={'text'} thousandSeparator={true} prefix={"₦"}/>
            </span>
        </div>

        <button
            onClick={onCheckout}
            className='bg-main-100 p-2 rounded text-white hover:bg-main-100/80'>
            Checkout
        </button>
    </div> 
  )
}

export default StudioBuild
