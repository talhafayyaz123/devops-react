import React from 'react'
import { useSelector } from 'react-redux'

const OvernightReservation = () => {
    const guestCount = useSelector(state => state.overnightGuestCount)
    const roomDetails = useSelector(state => state.overnightRoomInfo)

    const calPrice = ()=>{
        let totalRoomPrice = 0;
        if(roomDetails?.selectedRooms?.length>0){
            for (const room of roomDetails?.selectedRooms) {
                const roomPrice = parseInt(room.price, 10);
                if (isNaN(roomPrice)) {
                  console.error("Error: Invalid price format for room", room);
                  continue;
                }
                totalRoomPrice += roomPrice;
            }
        }
        return totalRoomPrice
    }

    return (
        <div className='font-robotoFont p-4 mb-10'>
            <h1 className='text-xl font-bold'>Your Reservation</h1>
            <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>

            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Guests</h1>
                <div className='flex justify-between items-center'>
                    <p className='text-[#606970]'>Adults</p>
                    <p>{guestCount.adults ? guestCount.adults : 0}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-[#606970]'>Children</p>
                    <p>{guestCount.children ? guestCount.children : 0}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-[#606970]'>Toodler</p>
                    <p>{guestCount.toodler ? guestCount.toodler : 0}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-[#606970]'>Infants</p>
                    <p>{guestCount.infants ? guestCount.infants : 0}</p>
                </div>
            </div>

            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Stay Duration</h1>
                {
                    !roomDetails?.visitDate || !roomDetails?.endDate ?
                        <p className='mt-1'>No days selected yet.</p> :
                        <p className='mt-1'>{roomDetails?.visitDate} To {roomDetails?.endDate}</p>
                }
                <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>
            </div>


            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Rooms</h1>
                {
                    roomDetails?.selectedRooms?.length > 0 ?
                        <div className='flex gap-2 flex-wrap items-center'>
                            {
                                roomDetails?.selectedRooms?.map((item, index) => (
                                    <p key={item.id}>{item.title}</p>
                                ))
                            }
                        </div> :
                        <p className='mt-1'>No rooms are selected yet.</p>
                }
                <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>
            </div>

            <div className='mt-3'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-base font-bold'>Sub-total</h1>
                        <h1 className='text-base font-bold'>₦{calPrice()}
                        </h1>
                </div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-base font-bold'>Room Discount (%)</h1>
                    <h1 className='text-base font-bold'>0%</h1>
                </div>
            </div>


            <div className='bg-[#F1F5F8] mt-3 h-[6rem] rounded-md shadow-shadow1 p-2 flex justify-center items-start flex-col z-50'>
                <div className='flex justify-between items-center w-[100%]'>
                    <p className='text-sm '>Consumption Tax and VAT (12.5%)</p>
                    <p className='text-sm font-bold'>₦{(12.5/100)*calPrice()}</p>
                </div>
                <div className='flex justify-between items-center mt-3 w-[100%]'>
                    <p className='font-bold text-lg'>Total</p>
                    <p className='font-bold text-lg'>₦{(12.5/100)*calPrice()+calPrice()}</p>
                </div>
            </div>
        </div >
    )
}

export default OvernightReservation
