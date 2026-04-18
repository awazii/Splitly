import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
export const Transactionlist = ({setisdetailopen}) => {
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
                    {!trans.payment ? <div className="expense-logo  size-13 rounded-lg  center-flex shadow-md" style={{ background: trans.category.gradient }}>
                       {trans.category.icon}
                     </div>: 
                     <div className={`expense-logo  size-13 rounded-lg  center-flex shadow-md ${trans.balancebgClass}`}>
                       {trans.icon}
                     </div>}
                     <div className='expense-details flex-1  h-15 flex justify-between gap-1 items-center'>
                       <div className='expense-left'>
                         <h2 className='font-semibold line-clamp-1 '>{trans.title}</h2>   
                         <div className="category-date flex items-center gap-1">
                           <span className='text-sm text-text-secondary'>{!trans.payment ? trans.category.name : "Settlement"}</span>
                           <span className='text-sm text-text-secondary'>•</span>
                           <span className='text-sm text-text-secondary'>{trans.date}</span>
                         </div>
                       </div>
                       <div className='expense-right text-right'>
                         <h2 className={`text-xl ${trans.balancetextClass} font-semibold `}>Rs.{ trans.netAmount ? Math.abs(trans.netAmount).toLocaleString() :  trans.netAmount === 0 ? Math.abs(trans.details.paidBy[0].amount).toLocaleString() : Math.abs(trans.amount).toLocaleString()}</h2>
                         {!trans.payment ? <span className='text-[12px] text-text-secondary'>{trans.netAmount > 0 ? 'You lent ' : trans.netAmount ===0 ? 'You paid' : ' You borrowed'}</span> : <span className='text-[12px] text-text-secondary'>{`You ${trans.payment}`}</span>}
                       </div>
                     </div>
                   </div>
                   <div className={`h-10 flex items-center  mx-5  ${trans.payment ? 'justify-between' : 'justify-end' }`}>
                     {trans.payment && 
                       <div className={`payment-indicator w-fit center-flex p-1 border-l`}>
                        <p className={`text-sm font-semibold center-flex ${trans.balancetextClass}`}>
                        <span><TiTick  className='size-5'/></span> {trans.payment}
                         </p> 
                       </div>}
                   { !trans.payment && <button className="details-btn cursor-pointer text-text-secondary hover:text-primary center-flex hover:scale-105  trans border-l" onClick={()=>{
                       setisdetailopen({open: true, id: trans.id});
                   }}>
                       <MdKeyboardArrowRight className='size-7' />
                     </button>}
                   </div>
                 </div>)
             })}
           </div>
         </div>
  )
}
