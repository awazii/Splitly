import React, { useState } from 'react'
import Addexpensebtn from "./Addexpensebtn"
import { IoReturnUpBack } from "react-icons/io5";
import { useParams, useNavigate } from 'react-router-dom'
import { CiFilter } from "react-icons/ci";
import Input from '../../../Input'
import Button from '../../../searchbtn'
import { GiExpense } from "react-icons/gi";
import { Basemodel } from '../../../basemodel';
import { Expensedetails } from './Expensedetails';
import { useSelector } from 'react-redux';
import { GroupExpenses } from '../../../../store/ExpenseSlice';
import { ExpenseCard } from '../../../Expenses/ExpenseCard';
export const Expenses = () => {
    const Navigate = useNavigate()
    const { Groupid } = useParams();
    const [popup, setpopup] = useState(false)
    const Expenses = useSelector(state => GroupExpenses(state, Groupid));
    const [CurrentExpenseid, setCurrentExpenseid] = useState("")
    const Openmodel = () => {
        setpopup(true)
    }
    const Closemodel = () => [
        setpopup(false)
    ]
    return (
        <div className='Expense-container'>
            <div className="header h-25  flex px-10 items-center justify-between">
                <div className="group-name center-flex  gap-3 ">
                    <button className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95" onClick={() => {
                        Navigate(`/Groups/${Groupid}`)
                    }} >
                        <IoReturnUpBack className='size-6 group-hover:text-primary' />
                    </button>
                    <h3 className='text-3xl '>Expenses</h3>
                </div>
                <div className="actions center-flex gap-3">
                    <Addexpensebtn />
                </div>
            </div>
            <div className='flex items-center justify-between mt-3 mx-9'>
                <div className="search flex gap-4  py-2 items-center mt-4">
                    <Input variant={"Expense"} />
                    <Button />
                </div>
                <div className="filter card-b p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex ">
                    <CiFilter className='size-5' />
                </div>
            </div>
            <div className="Expense-container mx-auto container mt-4">
                <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-fit'>Expenses<span> <GiExpense /></span></h2>
                <div className="expenses grid grid-cols-3 gap-3 overflow-auto">    {Expenses.map((expense, index) => {
                    return (
                        <ExpenseCard key={index} expense={expense} Openmodel={() => { 
                            setCurrentExpenseid(expense.id)
                            Openmodel()
                         }} ForGroup={true} />
                    )
                })}
                </div>
            </div>
            <Basemodel isOpen={popup}
                Closemodel={Closemodel}
                title="Expense Details"
            >
                <Expensedetails expenseid={CurrentExpenseid} />
            </Basemodel>
        </div>
    )
}
