import React from 'react'
import { useParams } from 'react-router-dom'
import { groups } from "../Grouplist"
import { Insights } from '../../ExpenseCalculator/Summary/Insights'
import { Recent } from '../../dashboard/Recent'
import { Overview } from './Overview'
import { Balance } from './Balance'
import { IoReturnUpBack } from "react-icons/io5";
import Terminatebtn from "./Teminatebtn"
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { GiExpense } from "react-icons/gi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import Addexpensebtn from "./Addexpensebtn"
export const Groupdetail = () => {
  const Navigate = useNavigate()
  const { Groupid } = useParams();
  const CurrentGroup = groups.find(f => f.id === Groupid);
  const extra = [{
    value: CurrentGroup.status.text, gradient: CurrentGroup.status.bgColor, color: CurrentGroup.status.textColor, label: "Status"
  }, {
    value: CurrentGroup.date, icon: <MdOutlineAccessTimeFilled className='text-white size-5' />,
    gradient: 'linear-gradient(135deg, #ffcc70, #f9a825, #ff6f61, #d84315)', label: "Created on"
  }, {
    value: 45, icon: <GiExpense className='text-white size-5' />,
    gradient: 'linear-gradient(135deg, #a0d8ef, #00aaff, #0055aa)', label: "Expense Count"
  },

  ]
  const dateformator = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US")
  }
  return (
    <div className='Indiviual-group  h-full scrollbar-hide overflow-auto'>
      <div className="header h-25  flex px-10 items-center justify-between">
        <div className="group-name center-flex  gap-3 ">
          <button className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95" onClick={() => { Navigate("/Groups") }}>
            <IoReturnUpBack className='size-6 group-hover:text-primary' />
          </button>
          <h3 className='text-3xl '>{CurrentGroup.name}</h3>
        </div>
        <div className="actions center-flex gap-3">
          <Terminatebtn />
          <div className="settingbtn card-b size-11 rounded-lg center-flex group trans hover:scale-102 active:scale-95">
            <IoSettingsOutline className='size-5  group-hover:text-primary' />
          </div>
        </div>
      </div>
      <div className='grid container mx-auto grid-cols-12 grid-rows-6 gap-3 '>
        <div className="overview col-span-7 row-span-1 ">
          <Overview CurrentGroup={CurrentGroup} />
        </div>
        <div className="insights col-span-5 row-span-1">
          <Insights />
        </div>
        <div className="Friends-balance col-span-8 row-span-5 card-b rounded-lg h-170">
          <Balance />
        </div>
        <div className="Recent-&-Status col-span-4 row-span-5 flex flex-col gap-3 ">
          <div className="Extra card-b h-20 shadow-md rounded-lg grid grid-cols-5 border-l p-2">
            {extra.map((ex, i) => (
              <div
                key={i}
                className={`center-flex gap-3 ${i === 0 || i === 1 ? "border-r border-b-light pr-2" : "pl-2"
                  } ${ex.label === "Status" ? "col-span-1" : "col-span-2"}`}
              >
                {ex.label !== "Status" ? <div className={`logo size-11 rounded-full center-flex`} style={{ background: ex.gradient }}>
                  {ex.icon}
                </div> : ""}
                <div className="info">
                  <h3 className={`font-semibold`}>
                    {ex.label === "Created on"  ?  dateformator(ex.value) : ex.label === "Status" ? ex.label : ex.value}
                  </h3>
                  <p className="font-semibold text-[13px] center-flex gap-1">
                    {ex.label === "Status" ? <span className='size-3 rounded-full' style={{ background: ex.gradient }}></span> : ""}
                    {ex.label !== "Status" ? ex.label : ex.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="Recent-container  border-l flex-1 card-b shadow-md">
            <div className="recent">
              <Recent h={`h-[400px]`} />
            </div>
            <div className='btn-container w-full center-flex  flex-col gap-3 mt-2'>
                   <Addexpensebtn />
              <button className="allexpenses text-primary underline  cursor-pointer font-semibold" onClick={()=>{
                Navigate("./Expenses")
              }}>
                See all Expenses
              </button >
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
