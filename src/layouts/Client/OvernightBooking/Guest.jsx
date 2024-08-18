import React, { useState } from 'react'
import OvernightSteps from '../../../components/OvernightSteps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OvernightReservation from '../../../components/OvernightReservation'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {useDispatch,useSelector } from 'react-redux'
//import { insert } from '../../../store/slices/overnight/overnightGuest.slice'
import {insert} from '../../../store/slices/overnight/overnightGuest.slice';
const Guest = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [guestNumber, setguestNumber] = useState({ adults: 0, children: 0, toddler: 0, infants: 0 })
    const nav = useNavigate()
    const dispatch = useDispatch()
    const overnightGuestCount=useSelector((state)=>state.overnightGuestCount);
    const OnNext = () => {
        dispatch(insert(guestNumber));
        nav("/overnight/room-details")
    }

    return (

        <div>

            <div className='xl:flex w-screen justify-between items-start p-[1rem] font-robotoFont flex-wrap'>

                <div className='flex-1 gap-x-3'>

                    {/* SETPS  */}
                    <div className='w-[100%] flex justify-center items-center'>
                        <div className='w-[100%] lg:w-[90%]'>
                            <OvernightSteps step={1} />
                        </div>
                    </div>

                    {/* MAIN CONTENT  */}
                    <div className='mt-6 lg:mt-10 w-[100%] flex justify-center items-center'>

                        <div className='w-[100%] lg:w-[55%]'>
                            <h1 className='text-xl font-bold '>Guest(s)  Details</h1>
                            <p className='text-[#606970] text-sm mt-2 w-[100%] lg:w-[70%]'>Please select the number of guests you want to book for (infants and toddlers included).</p>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className="mt-4">
                                <h1 className="text-lg font-bold">Adults</h1>
                                <div className="flex items-center w-full lg:w-4/5 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                      
                                        <div className="w-[12rem] h-10 flex justify-center items-center bg-white text-gray-700 border-t border-b border-gray-300">
                                            {guestNumber.adults}
                                        </div>

                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                            onClick={() => setguestNumber({ ...guestNumber, adults: guestNumber.adults > 0 ? guestNumber.adults - 1 : guestNumber.adults })}
                                        >
                                            <AiOutlineMinus />
                                        </button>


                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                            onClick={() => setguestNumber({ ...guestNumber, adults: guestNumber.adults + 1 })}
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-4">
                                <h1 className="text-lg font-bold">Children</h1>
                                <div className="flex items-center w-full lg:w-4/5 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                      
                                        <div className="w-[12rem] h-10 flex justify-center items-center bg-white text-gray-700 border-t border-b border-gray-300">
                                            {guestNumber.children}
                                        </div>

                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                            onClick={() => setguestNumber({ ...guestNumber, children: guestNumber.children > 0 ? guestNumber.children - 1 : guestNumber.children })}
                                        >
                                            <AiOutlineMinus />
                                        </button>


                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                           onClick={() => setguestNumber({ ...guestNumber, children: guestNumber.children + 1 })}
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                    </div>
                                </div>
                            </div>

 
                            <div className="mt-4">
                                <h1 className="text-lg font-bold">Age of child 1</h1>
                                <div className="flex items-center w-full lg:w-4/5 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                      
                                        <div className="w-[12rem] h-10 flex justify-center items-center bg-white text-gray-700 border-t border-b border-gray-300">
                                            {guestNumber.toddler}
                                        </div>

                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                           onClick={() => setguestNumber({ ...guestNumber, toddler: guestNumber.toddler > 0 ? guestNumber.toddler - 1 : guestNumber.toddler })}
                                        >
                                            <AiOutlineMinus />
                                        </button>


                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                          onClick={() => setguestNumber({ ...guestNumber, toddler: guestNumber.toddler + 1 })}
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h1 className="text-lg font-bold">Age of child 2</h1>
                                <div className="flex items-center w-full lg:w-4/5 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                      
                                        <div className="w-[12rem] h-10 flex justify-center items-center bg-white text-gray-700 border-t border-b border-gray-300">
                                            {guestNumber.infants}
                                        </div>

                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                           onClick={() => setguestNumber({ ...guestNumber, infants: guestNumber.infants > 0 ? guestNumber.infants - 1 : guestNumber.infants })}
                                        >
                                            <AiOutlineMinus />
                                        </button>


                                        <button
                                            className="w-10 h-10 flex justify-center items-center bg-[#75A9BF] text-white"
                                         onClick={() => setguestNumber({ ...guestNumber, infants: guestNumber.infants + 1 })}
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESERVATION  */}
                <div className='-translate-x-3/4 min-w-[16rem] h-[33rem] mt-6 lg:mt-0 shadow-shadow1 bg-white border-2 border-[#C8D5E0] rounded-md'>
                    <OvernightReservation />
                </div>
            </div>


            {/* FOOTER  */}
            <div className='w-screen bg-white'>

                <div className='flex justify-between items-center px-7 pt-4'>

                    <div className='flex gap-x-1 items-center text-[#75A9BF] cursor-pointer' onClick={() => nav("/")}>
                        <MdKeyboardArrowLeft />
                        <p>Back</p>
                    </div>
                    <div style={{transform:'translateX(-273px)'}}>
                        <button  disabled={`${isDisabled ? 'disabled' :'' }`} onClick={OnNext} 
                        className={`${
                            isDisabled ? 'cursor-not-allowed opacity-50' : ''
                        }  w-[10rem] h-[3rem] bg-black text-white rounded-md flex items-center justify-center font-robotoFont'
                        `}>
                            Continue
                            <MdKeyboardArrowRight className='ml-2 text-lg' />
                        </button>

                        <div className="flex items-center mt-3">
                        <input  id="checked-checkbox" onClick={ ()=> setIsDisabled( !isDisabled ) }  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">By Proceeding</label>
                    </div>
                    </div>
                </div>

                <div className='flex justify-between items-center px-7 mt-3 pb-3'>
                    <p>© 2023 JARA BEACH RESORT</p>
                    <p>owned and operated by Little Company Nigeria Limited</p>
                </div>

            </div>

        </div>
    )
}

export default Guest
