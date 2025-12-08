import React from 'react'
import { FaCalculator } from "react-icons/fa";
import CalculatorInput from './addcalinput';
import Calcheckbox from './Calcheckbox';
import { Friends } from "../friends/Friendslist"
import Choosef from "../choosef."
import { IoPerson } from "react-icons/io5";
import Temoraryinput from './Temoray';
import Addtemp from './Addtemp';
import Next from './Next';
import Prev from './Prev';
const temoraryfriends=["ali","hamza"];
export const ExpenseCalculator = () => {
    return (
        <div className='ExpenseCalculator-main h-full overflow-auto scrollbar-hide relative'>
            <h1 className="text-3xl font-semibold m-6 mb-1">Expense Calculator</h1>
            <p className="text-text-secondary text-md mx-6">
                Add people, split expenses by equal or custom shares, and see who owes whom — all calculated temporarily.
            </p>
            <div className="Expense-calculator w-230 h-fit card-b rounded-2xl  mx-auto mt-10 py-4 pb-2 px-6 relative">
                <div className="header  center-flex flex-col gap-1">
                    <div className="logo rounded-full size-18 center-flex" style={{
                        background: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)"
                    }}>
                        <FaCalculator className='size-7 text-white' />
                    </div>
                    <h2 className='text-xl font-semibold'>Quick Split</h2>
                    <p className='text-text-secondary text-sm'>Split Bills instantly without a group</p>
                </div>
                <div className="calculator-inputs flex gap-4 mt-4">
                    <CalculatorInput variant="Expense Name" width={"580px"} type="text" />
                    <CalculatorInput variant="Total Amount" width={"270px"} type="number" />
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
                            <div className="friend-lists  h-80 overflow-auto  grid grid-cols-5  gap-3  border-b-light px-2 ">
                                {temoraryfriends.map((name, index) => {
                                     return (
                                        <label key={index} className='select-friend rounded-lg shadow-md  bg-highlight flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans'>
                                            <div className="friend-img-container size-16 bg-neutral-300 rounded-full center-flex">
                                                <IoPerson className='size-7 text-neutral-500' />
                                            </div>
                                            <div className="friend-info center-flex flex-col">
                                                <h2 className='text-sm'>{name}</h2>
                                                <p className='text-[12px] text-text-secondary'>
                                                    Temporary Friend
                                                </p>
                                            </div>
                                            <div className='absolute top-2 right-1'>
                                                <Calcheckbox />
                                            </div>
                                        </label>
                                    )
                                })}
                                {Friends.map((friend, index) => {
                                    return (
                                        <label key={index} className='select-friend rounded-lg shadow-md  bg-highlight flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans'>
                                            <div className="friend-img-container size-16">
                                                <img src={friend.profilePic} className='Img-c' alt="friend-img" />
                                            </div>
                                            <div className="friend-info center-flex flex-col">
                                                <h2 className='text-sm'>{friend.name}</h2>
                                                <p className='text-[12px] text-text-secondary'>{friend.bio}</p>
                                            </div>
                                            <div className='absolute top-2 right-1'>
                                                <Calcheckbox />
                                            </div>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                         <div className="progress center-flex flex-col mt-6 ">
                    <h3 className='text-text-secondary'>Step 1 of 2</h3>
                    <div className="progress-bar h-3 bg-highlight rounded-full mt-2 w-60 shadow ">
                        <div className="progress-fill h-full bg-primary w-1/2 rounded-full trans"></div>
                    </div>
                </div>
                        <div className="next absolute bottom-4 right-6">
                            <Next />
                        </div>
                        <div className="prev absolute bottom-4 left-6">
                            <Prev />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
