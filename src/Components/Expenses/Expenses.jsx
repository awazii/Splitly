import React, { useState } from 'react'
import Input from '../Input'
import Button from '../searchbtn'
import { GiExpense } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
import { LuUtensils } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { MdSmokeFree } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
import { IoTicketSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import Linechart from './Linechartgraph';
import { Basemodel } from '../basemodel';
import { Expensedetails } from '../Groups/GroupDetail/Expenses/Expensedetails';
import { useSelector } from 'react-redux';
import { selectAllExpenses , TotalExpenses } from '../../store/ExpenseSlice';
import { selectFriendById } from "../../store/FriendsSlice";
import { selectGroupById } from '../../store/GroupSlice';
import { ExpenseCard } from './ExpenseCard';
export const categories = {
    "Food & Snacks": {
        name: "Food & Snacks",
        gradient: "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 50%, #FF99AC 100%)",
        icon: <LuUtensils className="size-6 text-white" />
    },
    "Drinks & Beverages": {
        name: "Drinks & Beverages",
        gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
        icon: <RiDrinks2Line className="size-6 text-white" />
    },
    "Vapes & Smoking": {
        name: "Vapes & Smoking",
        gradient: "linear-gradient(135deg, #00DBDE 0%, #FC00FF 100%)",
        icon: <MdSmokeFree className="size-6 text-white" />
    },
    "Transport": {
        name: "Transport",
        gradient: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)",
        icon: <FaCar className="size-6 text-white" />
    },
    "Hotel & Stay": {
        name: "Hotel & Stay",
        gradient: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
        icon: <MdHotel className="size-6 text-white" />
    },
    "Movie & Events": {
        name: "Movie & Events",
        gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
        icon: <IoTicketSharp className="size-6 text-white" />
    },
    "Others": {
        name: "Others",
        gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 50%, #DD2476 100%)",
        icon: <IoSparklesSharp className="size-6 text-white" />
    }
};
export const Expense = () => {
    const Expenses = useSelector(selectAllExpenses);
    const Totalexpensesamount = useSelector(TotalExpenses)
    const [popup, setpopup] = useState(false)
    const [CurrentExpenseid, setCurrentExpenseid] = useState("")
    const Openmodel = () => {
        setpopup(true)
    }
    const Closemodel = () => [
        setpopup(false)
    ]
    const expenseoverview = [
        {
            label: "Total Expenses",
            weeklyreport: {
                percenpage: 12,
                isIncrease: true,
            },
            amount: Totalexpensesamount.toLocaleString(),
            icon: <FaMoneyCheck className='text-white size-10' />,
            gradient: 'linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)',
        },
        {
            label: "Expense Count",
            amount: Expenses.length,
            weeklyreport: {
                percenpage: 8,
                isIncrease: false,
            },
            icon: <GiExpense className='text-white size-10' />,
            gradient: 'linear-gradient(135deg, #3F51B5 0%, #2196F3 50%, #00BCD4 100%)',
        }

    ];
    return (
        <div className='Expense-main h-full overflow-auto scrollbar-hide relative'>
            <h1 className="text-3xl font-semibold m-6 mb-1">Expenses</h1>
            <p className="text-text-secondary text-md mx-6 mb-2">
                This section displays all expenses from different groups with live data updates.
            </p>
            <div className="expense-overview center-flex  w-280 mx-auto  gap-5">
                {expenseoverview.map((item, index) => (
                    <div key={index} className="expense-card card-b rounded-lg p-4 center-flex flex-col w-75 " >
                        <div className="icon mb-2 center-flex size-28 rounded-full" style={{ background: item.gradient }}>
                            {item.icon}
                        </div>
                        <div className="info center-flex flex-col mt-1">
                            <div className="label font-semibold text-xl">{item.label}</div>
                            <div className="amount text-2xl  mt-1">{`${index === 0 ? "Rs." : ""}${item.amount.toLocaleString()}`}</div>
                            <p className={`weekly-report ${item.weeklyreport.isIncrease ? "text-green-500" : "text-red-500"} center-flex gap-1`}>{item.weeklyreport.isIncrease ? <FaArrowUp className='size-4' /> : <FaArrowDown className='size-4' />} {`${item.weeklyreport.percenpage}% from last week`}</p>
                            <Linechart type={item.label === "Total Expenses" ? "expenses" : "count"} />
                        </div>
                    </div>
                ))}
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
                <div className="expenses grid grid-cols-3 gap-3  pb-5">    {Expenses.map((expense, index) => {
                    return (
                        <ExpenseCard key={index} expense={expense} Openmodel={() => { 
                            setCurrentExpenseid(expense.id)
                            Openmodel()
                         }} />
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
