import React ,{useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Insights } from '../../Expenses/Expensedetails/Insights'
import { Recent } from '../../Recent'
import { Overview } from './Overview'
import { Balance } from './Spendings'
import Actionbtn from "../Common/Actionbtn"
import { IoReturnUpBack, IoSettingsOutline } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
import { statuses } from '../GroupCard'
import { useSelector } from 'react-redux'
import { selectGroupById } from '../../../store/GroupSlice'
import { GroupExpenses, FriendsGroupSpendings } from "../../../store/ExpenseSlice"
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { cardVariants, cardContentVariants, pageContainerVariants } from "../../../utils/animation";
import { motion } from 'framer-motion'
import { Basemodel } from '../../basemodel';
import {GroupActionDialog} from './GroupActionDialog'
import { MdGroupOff } from "react-icons/md";
import {Updateg} from './Updateg'
import { GroupActivities } from '../../../store/ActivitySlice'
export const Groupdetail = () => {
  const Navigate = useNavigate()
  const { Groupid } = useParams();
  const [restrictpopup, setrestrictpopup] = useState(false)
  const [updatepopup, setupdatepopup] = useState(false)
  const CurrentGroup = useSelector((state) => selectGroupById(state, Groupid));
  const activities = useSelector(state=>GroupActivities(state,CurrentGroup))
  const GExpenses = useSelector((state) => GroupExpenses(state, Groupid));
  const MembersSpendings = useSelector(state => FriendsGroupSpendings(state, Groupid))
  const isnew = GExpenses.length === 0 && MembersSpendings.length === 0
  const extra = [
    {
      value: statuses[CurrentGroup?.statusid]?.label,
      gradient: statuses[CurrentGroup?.statusid]?.bgColor,
      color: statuses[CurrentGroup?.statusid]?.textColor,
      label: "Status"
    },
    {
      value: CurrentGroup?.joinedDate,
      icon: <MdOutlineDateRange className='text-white size-5' />,
      gradient: 'linear-gradient(135deg, #ffcc70, #f9a825, #ff6f61, #d84315)',
      label: "Created on"
    },
    {
      value: GExpenses?.length,
      icon: <GiExpense className='text-white size-5' />,
      gradient: 'linear-gradient(135deg, #a0d8ef, #00aaff, #0055aa)',
      label: "Expense Count"
    },
  ]

  return (
    <div className='Indiviual-group h-full scrollbar-hide overflow-auto'>
    { CurrentGroup ? (
      <> <div className="header h-25 flex px-10 items-center justify-between">
        <div className="group-name center-flex gap-3">
          <button
            className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95"
            onClick={() => { Navigate("/Groups") }}
          >
            <IoReturnUpBack className='size-6 group-hover:text-primary' />
          </button>
          <h3 className='text-3xl'>{CurrentGroup.Name}</h3>
        </div>
       {CurrentGroup.statusid!== "Freeze" && <div className="actions center-flex gap-3">
          <Actionbtn isnew={isnew} onClick={() => setrestrictpopup(true)} />
          <button className="settingbtn card-b size-11 rounded-lg center-flex group trans hover:scale-102 active:scale-95 cursor-pointer" onClick={() => setupdatepopup(true)}>
            <IoSettingsOutline className='size-5 group-hover:text-primary' />
          </button>
        </div>}
      </div>
      <div className='grid container mx-auto grid-cols-12 grid-rows-6 gap-3'>
        <div className="overview col-span-7 row-span-1">
          <Overview CurrentGroup={CurrentGroup} />
        </div>

        <div className="insights col-span-5 row-span-1">
          <Insights data={MembersSpendings} />
        </div>

        <div className="Friends-balance col-span-8 row-span-5 bg-white shadow-md rounded-lg h-170">
          <Balance CurrentGroup={CurrentGroup} />
        </div>

        <div className="Recent-&-Status col-span-4 row-span-5 flex flex-col gap-3">
          <motion.div
           variants={pageContainerVariants}
                initial="hidden"
                animate="visible"
           className="Extra bg-white h-20 shadow-md rounded-lg grid grid-cols-5 p-2">
            {extra.map((ex, i) => (
              <motion.div  variants={cardContentVariants}
                key={i}
                className={`center-flex gap-3 ${i === 0 || i === 1 ? "border-r border-b-light pr-2" : "pl-2"} ${ex.label === "Status" ? "col-span-1" : "col-span-2"}`}
              >
                {ex.label !== "Status" ? (
                  <div className="logo size-11 rounded-full center-flex" style={{ background: ex.gradient }}>
                    {ex.icon}
                  </div>
                ) : ""}
                <div className="info">
                  <h3 className="font-semibold">
                    {ex.label === "Status" ? ex.label : ex.value}
                  </h3>
                  <p className={`font-semibold text-[13px] center-flex gap-1 `}
                  style={{
                    color : ex.label === "Status" ? ex.color :''
                  }}
                  >
                    {ex.label === "Status" ? <span className='size-3 rounded-full' style={{ background: ex.gradient }}></span> : ""}
                    {ex.label !== "Status" ? ex.label : ex.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="Recent-container rounded-lg flex-1 bg-white shadow-md">
            <div className="recent h-[540px] border-l m-2">
              <Recent h={`h-[440px]`} d={
                <>No recent activity in <span className="font-semibold text-gray-800">{CurrentGroup.Name}</span>. All expenses, settlements, and updates for this group will appear here.</>
              }
              activities={activities}
              location={"Group"}
              />
            </div>
            <div className='btn-container w-full center-flex flex-col gap-3 mt-2'>
              <button
                className="allexpenses text-primary underline cursor-pointer font-semibold"
                onClick={() => { Navigate("./Expenses") }}
              >
                See all Expenses
              </button>
            </div>
          </div>
        </div>
      </div> </>) :(
              <motion.div variants={pageContainerVariants}
                initial="hidden"
                animate="visible"
                className='h-full center-flex'>
                <motion.div variants={cardVariants}>
                  <UniversalEmptyState
                    title="This Group has been removed or does not exist."
                    textsize="text-sm"
                    button={{type:"Groups",
                      Link : "/Groups"         
                    }}
                  >
                    <div className="p-8 shadow-md border-l rounded-full">
                      <MdGroupOff className="size-8 text-primary" />
                    </div>
                  </UniversalEmptyState>
                </motion.div>
              </motion.div>
            )}
     <Basemodel isOpen={restrictpopup} Closemodel={() => setrestrictpopup(false)}>
        <GroupActionDialog groupId={CurrentGroup?.id} isnew={isnew} Closemodel={() => setrestrictpopup(false)} />
     </Basemodel> 
      <Basemodel isOpen={updatepopup} Closemodel={() => setupdatepopup(false)} title="Update Group Info">
        <Updateg groupId={CurrentGroup?.id} />
     </Basemodel>
    </div>
  )
}
