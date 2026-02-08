import React from 'react'
import { Fgoverview } from './Fgoverview'
import { Transactions } from './Transactionsfg'
export const Friendgdetails = ({ Currentfriend }) => {
  return (
    <div className='w-190 h-185 grid grid-cols-8 grid-rows-6 gap-2 mt-2'>
         <div className='Overview card-b rounded-lg col-span-5 row-span-1'>
            <Fgoverview Currentfriend={Currentfriend} />
         </div>
         <div className='Member card-b rounded-lg col-span-3 row-span-1 p-2 center-flex'>
              <div  className={` border-b-light flex-1 center-flex w-full gap-2`}>
                    <div className="logo  size-18 rounded-full center-flex ">
                        <img src={Currentfriend.profilePic} className='Img-c' alt="CurrentFriend image Profile pic" />
                        </div>
                    <div className="info w-fit h-2/3 center-flex flex-col">
                        <span className="title text-lg font-semibold"> {Currentfriend.name}</span>
                        <span className="description text-sm text-text-secondary font-semibold">{Currentfriend.status}</span>
                    </div>
                </div>
         </div>
         <div className='card-b rounded-lg col-span-8 row-span-5'>
          <Transactions />
         </div>
    </div>
  )
}
