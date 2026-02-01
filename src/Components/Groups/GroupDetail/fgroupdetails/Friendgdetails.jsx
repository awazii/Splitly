import React from 'react'
import { Fgoverview } from './Fgoverview'
import { Fbalanceg } from './fbalanceg'
import { Transactions } from './Transactionsfg'
export const Friendgdetails = ({ Currentfriend }) => {
  return (
    <div className='w-290 h-200 grid grid-cols-7 grid-rows-6 gap-2 mt-2'>
         <div className='Overview card-b rounded-lg col-span-5 row-span-1'>
            <Fgoverview Currentfriend={Currentfriend} />
         </div>
         <div className='Member card-b rounded-lg col-span-2 row-span-1 center-flex'>
              <div  className={` border-b-light flex-1 center-flex w-full gap-5`}>
                    <div className="logo  size-20 rounded-full center-flex">
                        <img src={Currentfriend.profilePic} className='Img-c' alt=" Profile pic" />
                        </div>
                    <div className="info w-40 h-2/3 center-flex flex-col items-start">
                        <div className="title text-lg font-semibold"> {Currentfriend.name}</div>
                        <div className="description text-text-secondary font-semibold">{Currentfriend.status}</div>
                    </div>
                </div>
         </div>
         <div className='Balance card-b rounded-lg col-span-4 row-span-5'>
          <Fbalanceg Currentfriend={Currentfriend}/>
         </div>
         <div className='card-b rounded-lg col-span-3 row-span-5'>
          <Transactions />
         </div>
    </div>
  )
}
