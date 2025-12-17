import React, { useState } from 'react'
import Select_split from './Select-split';
import Split_btn from './Split-btn';
import { IoPerson } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
export const Stepthree = ({ allfriends }) => {
  const [Splitopt, setSplitopt] = useState("Equally");
  const Splits = [
    {
      label: "Equally",
      description: "Simple. Everyone pays the same share.",
      example: "Rs.20,500 / 8 = Rs.2,562.50 per person"
    },
    {
      label: "Unequally",
      description: "Assign specific amounts to each person.",
      example: "e.g., Person A pays Rs.5000, Person B pays Rs.2000..."
    },
    {
      label: "By Percentage",
      description: "Split the total by assigning percentages.",
      example: "e.g., Person A pays 50%, Person B pays 25%..."
    }
  ];
  return (
    <div className=' h-fit mt-2 grid grid-cols-5  rounded-lg gap-3  p-2'>
      <div className="friends-splits-container col-span-3 flex flex-col gap-2">
        {Splitopt !== "Equally" && <div className="progress h-30 rounded-lg shadow-md  p-4 bg-white ">
           <h3 className='font-semibold text-text-secondary'>Total Expense Amount</h3>
          {Splitopt === "By Percentage" ? <>
            <div className="amounts flex justify-between mt-2">
              <div className="remaining font-bold ">70%</div>
              <div className="paid font-bold ">Rs.20,500</div>
            </div></> :

            <div className="amounts flex justify-between mt-2">
              <div className="remaining font-bold ">Rs. 15,500</div>
              <div className="paid font-bold ">Rs. 20,500</div>
            </div>}
          <div className="progress-bar-container relative">
            <div className="progress-bar w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <div className="progress w-2/3 bg-primary h-3 rounded-full"></div>
            </div>
            <div className="total absolute  right-0  mt-1 text-sm">Total</div>
            <div className="remaining absolute  left-0 mt-1 text-sm">Remaining</div>
          </div>
        </div>}
        <div className={`friends-splits-list grid grid-cols-3 gap-3  overflow-auto  mt-2 ${Splitopt !== "Equally" ? "h-94" : "h-125"}`}>
          {allfriends.map((friend, index) => {
            return (
              <div key={index} className='friend-split  rounded-lg shadow-md  bg-highlight flex flex-col items-center justify-center gap-2 pt-1 relative cursor-pointer trans h-48'>
                <div className="info center-flex flex-col">
                  <div className="friend-img-container size-16">
                    {friend.type === "temporary" ? (
                      <div className="friend-img-container size-16 bg-neutral-300 rounded-full center-flex">
                        <IoPerson className='size-7 text-neutral-500' />
                      </div>
                    ) : (
                      <img src={friend.profilePic} className='Img-c' alt="friend-img" />
                    )}
                  </div>
                  <div className="friend-info center-flex flex-col">
                    <h2 className='text-sm font-semibold'>{friend.name}</h2>
                    <p className='text-[12px] text-text-secondary'>{
                      friend.type === "temporary" ? "Temporary Friend" :
                        friend.bio}</p>
                    {Splitopt === "By Percentage" && <p className='text-sm text-text-secondary'> 30% = 2,500 </p>}
                  </div>
                </div>
                <div className="payment-input flex center-flex gap-1 card-b bg-white border-none rounded-lg p-1 px-2 flex-row-reverse">
                  {
                    Splitopt === "Equally" ? <><FaRupeeSign className='text-green-500' />
                      <p className='w-18 text-left text-text-secondary' >
                        2,562</p></> : <>
                      {Splitopt !== "Unequally" ? <FaPercentage className='text-primary' /> : <FaRupeeSign className='text-green-500' />}
                      <input type="number" placeholder='0' className='w-18 text-left focus:outline-none' /></>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="select-split-container col-span-2  flex flex-col gap-2">
        <div className="Split-btn flex-1 center-flex">
          <Split_btn Splitopt={Splitopt} />
        </div>
        <div className="select-split">
          <Select_split splits={Splits} Splitopt={Splitopt} setSplitopt={setSplitopt} />
        </div>
      </div>
    </div>
  )
}
