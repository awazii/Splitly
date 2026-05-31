import React, { useState } from 'react'
import Addexpensebtn from "./Common/Addexpensebtn"
import { IoReturnUpBack } from "react-icons/io5";
import { useParams, useNavigate } from 'react-router-dom'
import { CiFilter } from "react-icons/ci";
import Input from '../Common/Input'
import Button from '../Common/searchbtn'
import { GiExpense } from "react-icons/gi";
import { Basemodel } from '../basemodel';
import { Expensedetails } from './Expensedetails/Expensedetails';
import { useSelector } from 'react-redux';
import { GroupExpenses } from '../../store/ExpenseSlice';
import { ExpenseCard } from './ExpenseCard';
import { RiHandCoinLine } from "react-icons/ri";
import { UniversalEmptyState } from '../UniversalEmptyState';
import { motion } from "framer-motion";
import { pageContainerVariants, itemVariants, cardVariants } from "../../utils/animation";
import {
  HiTag,
  HiCurrencyDollar,
  HiBarsArrowDown,
  HiBarsArrowUp,
} from "react-icons/hi2";
import { FilterHeader } from '../filter';
export const expenseGroupSorts = [
  {
    label: "New to Old",
    icon: (
      <HiBarsArrowDown
        size={18}
        className="text-[#3b82f6]"
      />
    ),
  },

  {
    label: "Old to New",
    icon: (
      <HiBarsArrowUp
        size={18}
        className="text-[#a855f7]"
      />
    ),
  },

  {
    label: "Most Expenses",
    icon: (
      <HiCurrencyDollar
        size={18}
        className="text-[#14b8a6]"
      />
    ),
  },
];
export const expenseGroupFilters = [
  {
    label: "Category",
    icon: (
      <HiTag
        size={18}
        className="text-[#ec4899]"
      />
    ),
  },
];
export const Expenses = () => {
  const Navigate = useNavigate()
  const { Groupid } = useParams();
  const [popup, setpopup] = useState(false)
  const Expenses = useSelector(state => GroupExpenses(state, Groupid));
  const [CurrentExpenseid, setCurrentExpenseid] = useState("")
  const [isFilteropen, setisFilteropen] = useState(false)
  const Openmodel = () => setpopup(true)
  const Closemodel = () => setpopup(false)

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Expense-container'
    >
      <motion.div variants={itemVariants} className="header h-25 flex px-10 items-center justify-between">
        <div className="group-name center-flex gap-3">
          <button
            className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95"
            onClick={() => Navigate(`/Groups/${Groupid}`)}
          >
            <IoReturnUpBack className='size-6 group-hover:text-primary' />
          </button>
          <h3 className='text-3xl'>Expenses</h3>
        </div>
        <div className="actions center-flex gap-3">
          <Addexpensebtn />
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className='flex items-center justify-between mt-3 mx-9'>
        <div className="search flex gap-4 py-2 items-center mt-4">
          <Input variant={"Expense"} />
          <Button />
        </div>
        <button className="filter bg-white shadow-md  p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={()=>setisFilteropen(true)}>
          <CiFilter className='size-5' />
        </button>
      </motion.div>
      <motion.div variants={cardVariants} className="Expense-container mx-auto container mt-4">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-fit'>
          Expenses <span><GiExpense /></span>
        </h2>

        {Expenses.length > 0 ? (
          <motion.div variants={pageContainerVariants} className="expenses grid grid-cols-3 gap-3">
            {Expenses.map((expense, index) => (
              <motion.div key={index} variants={cardVariants} >
                <ExpenseCard
                  expense={expense}
                  Openmodel={() => {
                    setCurrentExpenseid(expense.id)
                    Openmodel()
                  }}
                  ForGroup={true}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
            title="No expenses in this group"
            description="Keep track of shared costs. Add your first expense to this group."
            textsize=""
          >
            <div className="p-10 shadow-md bg-gray-50 rounded-full">
              <RiHandCoinLine className="size-10 text-primary" />
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Expense Details">
        <Expensedetails expenseid={CurrentExpenseid} />
      </Basemodel>
        <Basemodel isOpen={isFilteropen} Closemodel={() => setisFilteropen(false)} title="Expense Filters">
          <FilterHeader Sorts={expenseGroupSorts} Filters={expenseGroupFilters} ActiveSort={"New to Old"} type="expense" />
        </Basemodel>
    </motion.div>
  )
}
