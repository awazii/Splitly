import React from 'react'
import CalculatorInput from '../Expenses/Common/addcalinput';
import Calcheckbox from '../Expenses/Common/Calcheckbox';
import Choosef from "../Common/choosef"
import { IoPerson } from "react-icons/io5";
import Temoraryinput from './Temoray';
import Addtemp from './Addtemp';
export const Stepone = ({ allfriends }) => {
    return (
        <>
            <div className="calculator-inputs flex gap-4 mt-4">
                <CalculatorInput variant="Expense Name" width={"680px"} type="text" />
                <CalculatorInput variant="Total Amount" width={"300px"} type="number" />
            </div>
            <div className='select-friends-container w-full my-5'>
                <div className='select-friends-container w-full '>
                    <div className='select-friend-option flex items-center justify-between'>
                        <h4 className='text-md font-semibold my-2 '>Select who shares this cost
                        </h4>
                        <div className='center-flex gap-2'>
                            <div className=' w-25 py-2 px-3 bg-highlight  rounded-lg  '>
                                <Calcheckbox>
                                    <h5 className='text-[13px] text-text-secondary'>Select all</h5>
                                </Calcheckbox>
                            </div>
                            <Choosef />
                        </div>
                    </div>
                    <div className="adding-temporay-friends  h-15 p-2 flex gap-3 ">
                        <Temoraryinput />
                        <Addtemp />
                    </div>
                    <div className='select-friends   mx-auto mt-3  '>
                        <div className="friend-lists  max-h-80 overflow-auto  grid grid-cols-6  gap-3  border-b-light px-2 ">
                            {allfriends.map((friend, index) => {
                                return (
                                    <label key={index} className='select-friend rounded-lg shadow-md  bg-highlight flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans h-38'>
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
                                            <h2 className='text-sm'>{friend.name}</h2>
                                            <p className='text-[12px] text-text-secondary'>{
                                                friend.type === "temporary" ? "Temporary Friend" :
                                                    friend.bio}</p>
                                        </div>
                                        <div className='absolute top-2 right-1'>
                                            <Calcheckbox />
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
