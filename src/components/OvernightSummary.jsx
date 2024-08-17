import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {baseUrl} from '../constants/baseurl'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
const OvernightSummary = () => {

    const guestCount = useSelector(state => state.overnightGuestCount)
    const roomDetails = useSelector(state => state.overnightRoomInfo)
    const guestDetails = useSelector(state => state.overnightGuestDetails)
    const nav = useNavigate()

 
    const confirmBooking = async()=>{
     
        let result = await axios.post(`${baseUrl}/overnight/booking/create`,{guestCount,roomDetails,guestDetails})
        if(result){
            toast.success("Booking Created")
            nav("/overnight/confirmation")
        }
    }

    const makePaymentRequest=async()=>{
          try {
             const response = await axios.post(
                'https://p1m0w46ab6.execute-api.us-east-1.amazonaws.com/payment/payment-request',
                 {
                profile_id: 148877,
                tran_type: 'sale',
                tran_class: 'ecom',
                cart_id: '4244b9fd-c7e9-4f16-8d3c-4fe7bf6c48ca',
                cart_description: 'Dummy Order 35925502061445345',
                cart_currency: 'PKR',
                cart_amount: 46.17,
              //  callback: 'http://localhost:5000/payment/callback',
                return: 'https://webhook.site/0ec85c51-f061-40ce-818c-a7c33dac01b3',
                callback :'https://webhook.site/0ec85c51-f061-40ce-818c-a7c33dac01b3'
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              ); 
              
               if(response.data.body){
                const record=JSON.parse(response.data.body);
                if(typeof record.redirect_url==='string'){
                  window.location.href=record.redirect_url;
                }else{
                  console.log('error in payment request is  ',response.data);
                }

              
               }
          
          } catch (error) {
            if (error.response) {
              console.error('Error response data:', error.response.data);
              console.error('Error response status:', error.response.status);
              console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
              console.error('Error request data:', error.request);
            } else {
              console.error('Error message:', error.message);
            }
          }
           
            //https://support.paytabs.com/en/support/solutions/articles/60000799220-3-5-node-js-package-manage-the-return-and-callback-urls
            //https://support.paytabs.com/en/support/solutions/articles/60000712108--e-recieve-a-blank-response-or-no-response-at-all-via-your-return-callback-urls
       /*  try{
            const response = await axios.post(
                'http://localhost:5000/payment/request',
                {
                profile_id: 148877,
                tran_type: 'sale',
                tran_class: 'ecom',
                cart_id: '4244b9fd-c7e9-4f16-8d3c-4fe7bf6c48ca',
                cart_description: 'Dummy Order 35925502061445345',
                cart_currency: 'PKR',
                cart_amount: 46.17,
              //  callback: 'http://localhost:5000/payment/callback',
                return: 'http://localhost:5000/payment/callback'
               // return :'https://webhook.site/0ec85c51-f061-40ce-818c-a7c33dac01b3'
                }
                ,
                {
                  headers: {
                    'content-type': 'application/json'
                  }
                }
              );
    
              const redirectUrl = response.data.redirect_url;
              if (redirectUrl) {
                window.location.href=redirectUrl;
              }else{
                console.log('error in payment request is  ',response.data);
              }
        }catch(error){
         console.log(error);
        }  */

    }

    return (
        <div className='font-robotoFont py-4 px-2 h-[100%] relative'>
            <h1 className='text-xl font-bold'>Booking Summary</h1>
            <div className='w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2'></div>

            <div className='mt-3'>
                <h1 className='text-lg font-bold'>Staying Dates</h1>

                <div className='flex justify-between items-center mt-2'>
                    <p className='text-[#606970]'>Check-in</p>
                    <p>{roomDetails?.visitDate}</p>

                </div>

                <div className='flex justify-between items-center mt-1'>
                    <p className='text-[#606970]'>Check-out</p>
                    <p>{roomDetails?.endDate}</p>
                </div>

            </div>

            <div className='flex justify-between items-center gap-x-3 mt-4'>
                <input type="text" placeholder='Enter Discount Code / Voucher' name="" className='flex-1 h-[2.3rem] border-2 border-[black] pl-3 pr-3 rounded-md outline-none' />
                <button className='w-[6rem] h-[2.3rem] bg-black text-white rounded-md'>Apply</button>
            </div>

            <div className='flex  items-center gap-x-1 mt-4'>
                <input type="checkbox" />
                <p>I accept Jara’s booking terms and conditions</p>
            </div>

            <div className='absolute bottom-2 w-[96%] '>
                <button className='mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive' onClick={confirmBooking}>Hold | Bank Trasnfer</button>
                <button className='mt-3 bg-black w-[100%] h-[2.5rem] rounded-lg text-white font-cursive' onClick={makePaymentRequest}>Pay with Paytab</button>
            </div>

        </div>

        
    )
}

export default OvernightSummary
