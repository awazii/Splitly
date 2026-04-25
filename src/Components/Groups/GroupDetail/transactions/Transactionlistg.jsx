import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
import { GroupExpenses } from "../../../../store/ExpenseSlice"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { categories } from '../../../../pages/Expenses/Expenses';
import { indicators } from '../../../../pages/friends/Friendslist';
export const Transactionlist = ({ setisdetailopen, Currentfriend }) => {
  const { Groupid } = useParams()
  const transactions = useSelector(state => GroupExpenses(state, Groupid)).filter(t => t.Members.some(m => m.id === Currentfriend.id))
  function Payment({ expense }) {
    const member = expense.Members.find(m => m.id === Currentfriend.id)
      if (!member) return null 
    const netBalance = Number(member.spent || 0) - Number(member.share || 0)
    const textcolor = netBalance<0 ? indicators.debtor.balancetextClass : netBalance > 0 ? indicators.creditor.balancetextClass :indicators.settled.balancetextClass
     const displayAmount =
    netBalance === 0 ? Math.abs(member.spent) : Math.abs(netBalance);
    return (
      <div className='expense-right text-right'>
        <h2 className={`text-xl font-semibold ${textcolor}`}>{`Rs. ${displayAmount}`}</h2>
        <span className='text-[12px] text-text-secondary'>{netBalance > 0 ? 'You lent ' : netBalance === 0 ? 'You paid' : ' You borrowed'}</span>
      </div>
    )
  }
  return (
    <div className="transactions-container h-full px-2 ">
      <div className="title w-fit center-flex gap-1 text-gray-800">
        <FaHistory className='size-5 ' />
        <h3 className='text-xl font-semibold '>Transaction History</h3>
      </div>
      <div className="transcations h-[85%] mt-2 overflow-y-auto space-y-2 ">
        {transactions.map((trans, index) => {
          return (
            <div key={index} className='expense relative bg-white shadow h-32 rounded-lg'>
              <div className='expense-detail-btn absolute bottom-4 right-5'>
              </div>
              <div className="expense-info  w-[92%] h-20 mx-auto mt-1  rounded-lg center-flex gap-3">
                <div className="expense-logo  size-13 rounded-lg  center-flex shadow-md" style={{ background: categories[trans.Category]?.gradient }}>
                  {categories[trans.Category]?.icon}
                </div>
                <div className='expense-details flex-1  h-15 flex justify-between gap-1 items-center'>
                  <div className='expense-left'>
                    <h2 className='font-semibold line-clamp-1 '>{trans.Name}</h2>
                    <div className="category-date flex items-center gap-1">
                      <span className='text-sm text-text-secondary'>{trans.Category}</span>
                      <span className='text-sm text-text-secondary'>•</span>
                      <span className='text-sm text-text-secondary'>{trans.createdDate}</span>
                    </div>
                  </div>
                  <Payment expense={trans} />
                </div>
              </div>
              <div className={`h-10 flex items-center  mx-5 justify-end`}>
                <button className="details-btn cursor-pointer text-text-secondary hover:text-primary center-flex hover:scale-105  trans border-l" onClick={() => {
                  setisdetailopen({ open: true, trans });
                }}>
                  <MdKeyboardArrowRight className='size-7' />
                </button>
              </div>
            </div>)
        })}
      </div>
    </div>
  )
}
