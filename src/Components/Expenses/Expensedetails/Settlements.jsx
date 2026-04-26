import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { aggregatesettlements, updateExpense } from '../../../store/ExpenseSlice';
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { useSelector, useDispatch } from 'react-redux';
import { Memberdetails } from '../../../utils/Memberdetails';
import { RiHandCoinLine } from "react-icons/ri";
export const Settlements = ({ Expense }) => {
    const Settlements = []
    Expense.Settlements.forEach(settlement => {
        const existing = Settlements.find(s => s.from === settlement.from)
        if (existing) {
            existing.to.push(
                {
                    id: settlement.to,
                    amount: settlement.amount
                }
            )
            existing.totalAmount += settlement.amount
        }
        else {
            Settlements.push({
                from: settlement.from,
                to: [
                    {
                        id: settlement.to,
                        amount: settlement.amount
                    }
                ],
                totalAmount: settlement.amount
            })
        }
    })
    return (
        <div className='size-full card-b rounded-lg shadow p-4'>
            <h3 className='font-semibold text-lg center-flex w-fit gap-2'> Final Settlements<span><FaMoneyBillTransfer className='size-6 ' /></span></h3>
            {
             Settlements.length > 0 ?   
                <div className='debts h-138 mt-2 overflow-auto space-y-4 '>
                {Settlements.map((settlement, index) => (
                    <div key={index} className="debt  w-full min-h-30  center-flex justify-between px-5 gap-2 ">
                        <div className="Debtor w-80 shadow-md rounded-lg h-25 center-flex gap-2 bg-white relative">
                            <div className="flag absolute top-2 right-2 scale-x-[-1]"><GiPayMoney className='text-red-600 size-5' /></div>
                            <div className="logo size-13 rounded-full">
                                <img src={Memberdetails(settlement.from)?.Image} className='Img-c border-none' alt="" />
                            </div>
                            <div className="info w-35">
                                <div className="name font-semibold text-sm">{Memberdetails(settlement.from)?.Name}</div>
                                <div className="description text-[12px]  text-text-secondary"> {Memberdetails(settlement.from)?.Bio}</div>
                                <p className='font-semibold text-right text-red-600'>Rs. {settlement.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="marker w-20  h-10 rounded-2xl center-flex">
                            <FaArrowRightLong className='text-primary size-10' />
                        </div>
                        <div className="creditors w-75 space-y-2 my-2">
                            {settlement.to.map((to, index) => (
                                <div key={index} className="creditor shadow-md rounded-lg h-25 center-flex gap-2 bg-white relative">
                                    <div className="flag absolute top-2 right-2"><GiReceiveMoney className='text-green-600 size-5' /></div>
                         <div className="logo  size-13 rounded-full">
                            <img src={Memberdetails(to.id)?.Image} className='Img-c border-none' alt="" />
                                    </div>
                                    <div className="info w-35">
                                        <div className="name font-semibold text-sm">{Memberdetails(to.id)?.Name}</div>
                                        <p className="description text-[12px] text-text-secondary">{Memberdetails(to.id)?.Bio || "temporary"}</p>
                                        <p className='font-semibold text-right text-green-600 '>Rs. {to.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> : <UniversalEmptyState
                title="No settlements"
                textsize="text-sm"
                description='No partial payments or settlements have been made for this expense.'
            >
                <div className="p-8 shadow-md bg-gray-50 rounded-full">
                    <RiHandCoinLine className="size-8 text-primary" />
                </div>
            </UniversalEmptyState>}

        </div>
    )
}
