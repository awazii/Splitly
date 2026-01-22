import React from 'react'
import { transactions } from './Balancewith'
import { GoArrowLeft } from "react-icons/go";
import { MdPayments } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
export const Transationdetail = ({ Currentbalancewith, setisdetailopen, isdetailopen, CurrentFriend }) => {
    const currentTransaction = transactions.find(trans => trans.id === isdetailopen.id);
    return (
        <div className='transaction-details'>
            <div className="header center-flex w-fit gap-1 text-gray-800">
                <button className="backbtn rounded-lg cursor-pointer group trans hover:scale-102 active:scale-95 " onClick={() => { setisdetailopen({ open: false, id: null }) }}>
                    <GoArrowLeft className='size-6 group-hover:text-primary' />
                </button>
                <h3 className='font-semibold text-xl '>Transcation Details</h3>
            </div>
            <div className="transaction-info w-[60%] mx-auto mt-2 py-4 bg-white rounded-xl h-fit shadow-md center-flex flex-col">
                <div className="expense-info center-flex gap-2 flex-col">
                    <div className="expense-logo size-15 rounded-full  center-flex shadow-md" style={{ background: currentTransaction.category.gradient }}>
                        {currentTransaction.category.icon}
                    </div>
                    <p className='expense-name'>{currentTransaction.title}</p>
                </div>
                <div className="expense-amount">
                    <h2 className={`text-3xl font-semibold center-flex gap-1 `}>Rs.{Math.abs(currentTransaction.details.total).toLocaleString()} <span className='text-[13px]'>{`(shared)`}</span></h2>
                </div>
                <div className="expense-date text-text-secondary text-sm">
                    <p>{currentTransaction.date} <span>•</span> <span>{currentTransaction.time}</span></p>
                </div>
            </div>
            <div className="payment-details mt-2">
                <div className="heading w-fit center-flex gap-1 text-gray-800 mx-2">
                    <h3 className='text-xl font-semibold'>Paid by</h3>
                    <MdPayments className='size-5' />
                </div>
                <div className="paidby-list mt-2 space-y-2 px-3 h-fit bg-white rounded-xl shadow-md w-[80%] mx-auto overflow-y-auto  py-2">
                    {currentTransaction.details.paidBy.map((person, index) => {
                        return (
                            <div key={index} className="paidby-item flex justify-between items-center border-b border-b-light  pb-2 ">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={person.name === "Other" ? Currentbalancewith.profilePic : CurrentFriend.profilePic} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className='text-lg'>{`${person.name === "Other" ? Currentbalancewith.name : person.name} paid`}</p>
                                </div>
                                <div className="amount text-xl font-semibold text-text-primary">
                                    Rs.{person.amount.toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex justify-between gap-2'>
                        <div className="about center-flex gap-3">
                            <div className={`logo size-9 center-flex ${currentTransaction.balancebgClass} rounded-full`}>
                                <FaMoneyBillTransfer className='size-5 text-white' />
                            </div>
                            <h4>
                                {currentTransaction.amount < 0 ? `You owes ${Currentbalancewith.name}` : `${Currentbalancewith.name} owes you`} </h4>
                        </div>
                        <div className={`amount text-xl font-semibold ${currentTransaction.balancetextClass}`}>
                            Rs.{Math.abs(currentTransaction.amount).toLocaleString()}
                        </div>
                    </div>

                </div>
            </div>
            <div className="splitdetails">
                <div className="heading w-fit center-flex gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-xl font-semibold'>Split Details</h3>
                    <IoTicket className='size-5' />
                </div>
                <div className="split-list mt-2 space-y-2  h-45  w-[80%] mx-auto overflow-y-auto">
                    <div className="split-method">
                        <h4 className='text-md font-semibold text-text-secondary center-flex gap-1'>Split Method: <span className='text-text-primary'>{currentTransaction.details.splitMethod}</span></h4>
                    </div>
                    {currentTransaction.details.split.map((person, index) => {
                        return (
                            <div key={index} className="split-item  bg-white p-2 rounded-lg shadow-md flex justify-between items-center">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={person.name === "Other" ? Currentbalancewith.profilePic : CurrentFriend.profilePic} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className='text-lg'>{`${person.name === "Other" ? Currentbalancewith.name + "'s share" : person.name+ "r's share"}`}</p>
                                </div>
                                <div className="amount text-xl font-semibold text-text-primary">
                                    Rs.{person.amount.toLocaleString()} {person.percent && <span className='text-sm text-text-secondary'>({person.percent}%)</span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}
