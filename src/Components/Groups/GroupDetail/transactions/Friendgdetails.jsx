import React from 'react'
import { Fgoverview } from '../transactions/Fgoverview'
import { Transactions } from './Transactionsfg'
import {FaBan} from "react-icons/fa"
export const Friendgdetails = ({ Currentfriend }) => {
  return (
    <div className='w-190 h-185 grid grid-cols-8 grid-rows-6 gap-2 mt-2'>
         <div className='Overview card-b rounded-lg col-span-5 row-span-1'>
            <Fgoverview Currentfriend={Currentfriend} />
         </div>
         <div className='Member card-b rounded-lg col-span-3 row-span-1 p-2 center-flex'>
              <div  className={` border-b-light flex-1 center-flex w-full gap-2`}>
                    <div className={` logo size-18 rounded-full relative ${Currentfriend.isBanned ? "border-red-500" : "border-primary"} border-2`}>
                        <img src={Currentfriend.Image} className='Img-c' alt="CurrentFriend image Profile pic" />
                        {Currentfriend.isBanned && (
                            <div className="absolute top-9/12 left-1 p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg">
                                <FaBan className="size-3" /> 
                            </div>
                        )}
                    </div>
                    <div className="info w-fit h-2/3 center-flex flex-col">
                        <span className="title text-lg font-semibold"> {Currentfriend.Name}</span>
                        <span className={`description text-sm ${Currentfriend.isBanned ? "text-red-500" : "text-text-secondary"} font-semibold `}>{Currentfriend.isBanned ? "(Banned)" : Currentfriend.status}</span>
                    </div>
                </div>
         </div>
         <div className='card-b rounded-lg col-span-8 row-span-5'>
          <Transactions Currentfriend={Currentfriend} />
         </div>
    </div>
  )
}
