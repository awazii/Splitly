import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdPayments } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
export const Transactiondetailsfg = ({ isdetailopen, setisdetailopen }) => {
    const currentTransaction = transactions.find(trans => trans.id === isdetailopen.id);
    return (
        <div className='transaction-details h-[94%] overflow-auto space-'>
            <div className="header center-flex w-fit gap-1 text-gray-800">
                <button className="backbtn rounded-lg cursor-pointer group trans hover:scale-102 active:scale-95 " onClick={() => { setisdetailopen({ open: false, id: null }) }}>
                    <GoArrowLeft className='size-6 group-hover:text-primary' />
                </button>
                <h3 className='font-semibold text-xl '>Transcation Details</h3>
            </div>
            <div className="transaction-info w-[50%] mx-auto my-2 py-4 bg-white rounded-xl h-fit shadow-md center-flex flex-col">
                <div className="expense-info center-flex gap-2 flex-col">
                    <div className="expense-logo size-15 rounded-full  center-flex shadow-md" style={{ background: currentTransaction.category.gradient }}>
                        {currentTransaction.category.icon}
                    </div>
                    <p className='expense-name'>{currentTransaction.title}</p>
                </div>
                <div className="Total-particpants text-text-secondary center-flex gap-1 mb-1">
                    <IoMdPerson className='size-4' />
                    <h3 className=' text-sm '>participants: <span className=' font-semibold'> {currentTransaction.details.split.length}
                    </span> </h3>
                </div>
                <div className="expense-amount">
                    <h2 className={`text-3xl font-semibold center-flex gap-1 `}>Rs.{Math.abs(currentTransaction.details.total).toLocaleString()} <span className='text-[13px]'>{`(Total expense)`}</span></h2>
                </div>
                <div className="expense-date text-text-secondary text-sm">
                    <p>{currentTransaction.date} <span>•</span> <span>{currentTransaction.time}</span></p>
                </div>
            </div>
            <div className="payment-details mt-2">
                <div className="heading  center-flex gap-1 text-gray-800 mx-2">
                    <h3 className='text-xl font-semibold'>Paid by</h3>
                    <MdPayments className='size-5' />
                </div>
                <div className="paidby-list my-2 space-y-2 px-3 h-fit bg-white rounded-xl shadow-md w-[70%] mx-auto overflow-y-auto  py-2 ">
                    {currentTransaction.details.paidBy.map((person, index) => {
                        return (
                            <div key={index} className="paidby-item flex justify-between items-center border-b border-b-light  pb-2 last:border-b-0">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={Friends.find(friend => friend.id === person.userId)?.profilePic} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className=''>{`${person.name} paid`}</p>
                                </div>
                                <div className="amount text-lg font-semibold text-text-primary">
                                    Rs.{person.amount.toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="splitdetails">
                <div className="heading  center-flex gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-xl font-semibold'>Split Details</h3>
                    <IoTicket className='size-5' />
                </div>
                <div className="split-list my-2 space-y-2">
                    <div className="split-method">
                        <h4 className='text-md font-semibold text-text-secondary center-flex gap-1'>Split Method: <span className='text-text-primary'>{currentTransaction.details.splitMethod}</span></h4>
                    </div>
                    <div className="split-items mt-2 space-y-2 px-3 h-40  w-[70%] mx-auto overflow-y-auto ">
                    {currentTransaction.details.split.map((person, index) => {
                        return (
                            <div key={index} className="split-item  bg-white p-2 rounded-lg shadow-md flex justify-between items-center">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={Friends.find(friend => friend.id === person.userId)?.profilePic} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className=''>{`${person.name + "'s share"}`}</p>
                                </div>
                                <div className="amount text-lg font-semibold text-text-primary">
                                    Rs.{person.amount.toLocaleString()} {person.percent && <span className='text-sm text-text-secondary'>({person.percent}%)</span>}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className="settelemnts">
                <div className="heading  center-flex gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-xl font-semibold'>Settelemnts</h3>
                    <FaMoneyBillTransfer className='size-5' />
                </div>
                <div className={`settelemnts-list mt-2 space-y-2 ${currentTransaction.details.settlements.length!==0 ? "h-30" : "h-fit"}  w-[70%] mx-auto overflow-y-auto`}>
                    {currentTransaction.details.settlements.length!==0
                        ? <>
                            {currentTransaction.details.settlements.map((settlement, index) => {
                                return (
                                    <div key={index} className="settlement-item  bg-white p-2 rounded-lg shadow-md flex justify-between items-center">
                                        <div className="about center-flex gap-3">
                                            <div className={`logo size-9 center-flex  rounded-full ${settlement.to === "Awazii" ? "bg-green-600" : "bg-red-600"}`}>
                                                <FaMoneyBillTransfer className='size-5 text-white' />
                                            </div>
                                            <p className=''>{`${settlement.from} owes ${settlement.to}`}</p>
                                        </div>
                                        <div className={`amount text-lg font-semibold ${settlement.to === "Awazii" ? "text-green-600" : "text-red-600"}`}>
                                            Rs.{settlement.amount.toLocaleString()}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        : <div className='text-center text-text-secondary'>No settlements needed</div>
                    }

                </div>
            </div>
        </div>
    )
}
