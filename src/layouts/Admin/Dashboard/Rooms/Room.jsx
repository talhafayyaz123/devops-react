import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import Table from './Table'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { roomsRow } from '../../../../constants/tableData'
import CreateRoom from './CreateRoom'

const Room = ({ data, setShowNav, showNav,setData }) => {
    const [searchValue, setSearchValue] = useState("")
    const iconStyle = 'text-[#828893] text-lg cursor-pointer md:hidden block'

    const [createRoom, setCreateRoom] = useState(false)

    return (
        <div>
            {/* HEADER  */}
            <div className='w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]'>
                <h1 className='text-2xl font-medium'>Rooms 🛌</h1>
                {
                    showNav ? <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} /> : <GiHamburgerMenu onClick={() => setShowNav(!showNav)} className={iconStyle} />
                }
            </div>

            <div className='p-5'>

                <div className='mb-4 block md:flex justify-between items-start'>
                    <Input placeholder={"Search rooms  ...."} className={"sm:mb-0 mb-2 w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none text-[#828893]"} />
                    <Button onClickFunc={()=>setCreateRoom(true)} buttonTitle={"Create Room"} className={"w-[10rem] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"} />
                </div>
                <div>
                    <Table setData={setData} tr={roomsRow} data={data} />
                </div>
            </div>

            {
                createRoom && (
                    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
                        <div className='flex justify-center items-center h-screen'>
                            <CreateRoom setData={setData} setCreateRoom={setCreateRoom}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Room
