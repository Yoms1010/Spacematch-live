import React, { useEffect, useState } from 'react'

var CurrencyFormat = require('react-currency-format');

declare interface TwoBedPrefabProps {
    prefabEquipments: any, 
    homeData: any, 
    setModalOpen: any, 
    setOpenModal: any
}

function TwoBedBuild({prefabEquipments, homeData, setModalOpen, setOpenModal}: TwoBedPrefabProps) {

        const [twoBedTotalCost, setTwoBedTotalCost] = useState()
    
        const [equipsAmount, setEquipsAmount] = useState<any>({
            wardrobe: 0,
            appliance: 0,
            mattress: 0,
            sofa: 0,
            cabinet: 0,
            hangingCabinet: 0,
            inverterHeatingCoolingAC: 0,
            steps: 0,
            triplexGlass: 0,
            curtain: 0,
            motorisedCurtainTrack: 0,
            refrigerator: 0,
            inductionHub: 0,
            washingMachine: 0,
            extractorHood: 0
        })
    
        function handleEquipment(): void {
            const total = Number(equipsAmount.wardrobe) 
            + Number(equipsAmount.appliance) 
            + Number(equipsAmount.mattress) 
            + Number(equipsAmount.sofa) 
            + Number(equipsAmount.cabinet) 
            + Number(equipsAmount.hangingCabinet) 
            + Number(equipsAmount.steps) 
            + Number(equipsAmount.triplexGlass) 
            + Number(equipsAmount.inverterHeatingCoolingAC) 
            + Number(equipsAmount.curtain) 
            + Number(equipsAmount.motorisedCurtainTrack) 
            + Number(equipsAmount.refrigerator) 
            + Number(equipsAmount.inductionHub) 
            + Number(equipsAmount.washingMachine) 
            + Number(equipsAmount.extractorHood)

            setTwoBedTotalCost(total + homeData?.cost)
        }
    
        useEffect(() => {
            handleEquipment()
        }, [equipsAmount, setEquipsAmount])
    

     function onCheckout() {
    
            const twoBed = [
                {
                    key: "twoBed",
                    title: homeData?.title,
                    homecost: homeData?.cost, 
                    wardrobe: equipsAmount.wardrobe ? equipsAmount.wardrobe : 0,
                    appliance: equipsAmount.appliance ? equipsAmount.appliance : 0,
                    mattress: equipsAmount.mattress ? equipsAmount.mattress : 0,
                    sofa: equipsAmount.sofa ? equipsAmount.sofa : 0,
                    cabinet: equipsAmount.cabinet ? equipsAmount.cabinet : 0,
                    hangingCabinet: equipsAmount.hangingCabinet ? equipsAmount.hangingCabinet : 0,
                    inverterHeatingCoolingAC: equipsAmount.inverterHeatingCoolingAC ? equipsAmount.inverterHeatingCoolingAC : 0,
                    steps: equipsAmount.steps ? equipsAmount.steps : 0,
                    triplexGlass: equipsAmount.triplexGlass ? equipsAmount.triplexGlass : 0,
                    curtain: equipsAmount.curtain ? equipsAmount.curtain : 0,
                    motorisedCurtainTrack: equipsAmount.motorisedCurtainTrack ? equipsAmount.motorisedCurtainTrack : 0,
                    refrigerator: equipsAmount.refrigerator ? equipsAmount.refrigerator : 0,
                    inductionHub: equipsAmount.inductionHub ? equipsAmount.inductionHub : 0,
                    washingMachine: equipsAmount.washingMachine ? equipsAmount.washingMachine : 0,
                    extractorHood: equipsAmount.extractorHood ? equipsAmount.extractorHood : 0,
                    total: twoBedTotalCost
                }
            ]
    
            localStorage.setItem("twoBed", JSON.stringify(twoBed))
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
                            <td>₦145,000,000.00</td>
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
                            <td>tWO Bedroom</td>
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
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[4].value} 
                                    id={prefabEquipments[4].value} 
                                    className="" 
                                    value={prefabEquipments[4].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, cabinet: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[4].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[4].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[4].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[5].value} 
                                    id={prefabEquipments[5].value} 
                                    className="" 
                                    value={prefabEquipments[5].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, hangingCabinet: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[5].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[5].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[5].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[6].value} 
                                    id={prefabEquipments[6].value} 
                                    className="" 
                                    value={prefabEquipments[6].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, steps: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[6].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[6].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[6].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[7].value} 
                                    id={prefabEquipments[7].value} 
                                    className="" 
                                    value={prefabEquipments[7].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, triplexGlass: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[7].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[7].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[7].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[8].value} 
                                    id={prefabEquipments[8].value} 
                                    className="" 
                                    value={prefabEquipments[8].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, inverterHeatingCoolingAC: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[8].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[8].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[8].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[9].value} 
                                    id={prefabEquipments[9].value} 
                                    className="" 
                                    value={prefabEquipments[9].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, curtain: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[9].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[9].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[9].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[10].value} 
                                    id={prefabEquipments[10].value} 
                                    className="" 
                                    value={prefabEquipments[10].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, motorisedCurtainTrack: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[10].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[10].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[10].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[11].value} 
                                    id={prefabEquipments[11].value} 
                                    className="" 
                                    value={prefabEquipments[11].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, refrigerator: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[11].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[11].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[11].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[12].value} 
                                    id={prefabEquipments[12].value} 
                                    className="" 
                                    value={prefabEquipments[12].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, inductionHub: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[12].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[12].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[12].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[13].value} 
                                    id={prefabEquipments[13].value} 
                                    className="" 
                                    value={prefabEquipments[13].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, washingMachine: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[13].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[13].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[13].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
                                    </p>
                                </label>
                            </div> 
                            <div className="checkbox-toolbar">
                                <input 
                                    type="checkbox" 
                                    name={prefabEquipments[14].value} 
                                    id={prefabEquipments[14].value} 
                                    className="" 
                                    value={prefabEquipments[14].cost} 
                                    onChange={(e) => setEquipsAmount({...equipsAmount, extractorHood: e.target.value || 0})}
                                />
                                <label htmlFor={prefabEquipments[14].value} className='flex flex-col justify-center items-center space-y-2'>
                                    <p className='text-center'>{prefabEquipments[14].title}</p>
                                    <p className='font-semibold text-center'>
                                        <CurrencyFormat value={prefabEquipments[14].cost} displayType={'text'} thousandSeparator={true} prefix={"₦"} />
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
                <CurrencyFormat value={twoBedTotalCost || homeData?.cost} displayType={'text'} thousandSeparator={true} prefix={"₦"}/>
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

export default TwoBedBuild
