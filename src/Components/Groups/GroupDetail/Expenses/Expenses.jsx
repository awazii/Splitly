import React,{useState} from 'react'
import Addexpensebtn from "./Addexpensebtn"
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CiFilter } from "react-icons/ci";
import Input from '../../../Input'
import Button from '../../../searchbtn'
import { categories } from '../../../Expenses/Expense';
import saad from "../../../../assets/saad.jpg"
import habib from "../../../../assets/habib.png"
import zuzu from "../../../../assets/zuzu.png"
import awazii from "../../../../assets/awazii.jpg"
import daud from "../../../../assets/daud.jpg"
import arshman from "../../../../assets/arshman.jpg"
import sheda from "../../../../assets/sheda.jpg"
import { GiExpense } from "react-icons/gi";
import Expensedetailbtn from '../../../Details';
import { Basemodel } from '../../../basemodel';
import { Expensedetails } from './Expensedetails';
export const Expenses = () => {
    const Navigate = useNavigate()
    const { Groupid } = useParams();
    const [popup, setpopup] = useState(false)
const Openmodel=()=>{
    setpopup(true)
}
const Closemodel=()=>[
    setpopup(false)
]
    const Expenses = [
        {
            id: "exp001",
            title: "Cold Drink & Chips",
            amount: 250,
            date: "11-Feb-2025",
            category: {
                name: categories[0].name,
                gradient: categories[0].gradient,
                icon: categories[0].icon,
            },
            members: [
                { name: "Saad Khalid", img: saad },
                { name: "Zuzu", img: zuzu },
                { name: "Awazii", img: awazii },
                { name: "Daud", img: daud },
                { name: "Habib", img: habib },
            ]
        },
        {
            id: "exp002",
            title: "Petrol for Bikes",
            amount: 1200,
            date: "14-Feb-2025",
            category: {
                name: categories[3].name,
                gradient: categories[3].gradient,
                icon: categories[3].icon,
            },
            members: [
                { name: "Awazii", img: awazii },
                { name: "Daud", img: daud },
                { name: "Habib", img: habib },
            ],
        },
        {
            id: "exp003",
            title: "Concert Tickets",
            amount: 4500,
            date: "28-Jan-2025",
            category: {
                name: categories[6].name,
                gradient: categories[6].gradient,
                icon: categories[6].icon,
            },
            members: [
                { name: "Arshman", img: arshman },
                { name: "Saad Khalid", img: saad },
            ],
        },
        {
            id: "exp004",
            title: "Dinner at Restaurant",
            amount: 3200,
            date: "02-Mar-2025",
            category: {
                name: categories[0].name,
                gradient: categories[0].gradient,
                icon: categories[0].icon,
            },
            members: [
                { name: "Zuzu", img: zuzu },
                { name: "Habib", img: habib },
                { name: "Awazii", img: awazii },
                { name: "Sheda", img: sheda },
            ],
        },
        {
            id: "exp005",
            title: "Snacks & Drinks",
            amount: 780,
            date: "10-Mar-2025",
            category: {
                name: categories[0].name,
                gradient: categories[0].gradient,
                icon: categories[0].icon,
            },
            members: [
                { name: "Daud", img: daud },
                { name: "Awazii", img: awazii },
            ],
        },
        {
            id: "exp006",
            title: "Hotel Room",
            amount: 6500,
            date: "18-Feb-2025",
            category: {
                name: categories[4].name,
                gradient: categories[4].gradient,
                icon: categories[4].icon,
            },
            members: [
                { name: "Saad Khalid", img: saad },
                { name: "Zuzu", img: zuzu },
                { name: "Daud", img: daud },
            ],
        },
        {
            id: "exp007",
            title: "Restaurant Bill",
            amount: 2100,
            date: "15-Mar-2025",
            category: {
                name: categories[0].name,
                gradient: categories[0].gradient,
                icon: categories[0].icon,
            },
            members: [
                { name: "Habib", img: habib },
                { name: "Arshman", img: arshman },
                { name: "Sheda", img: sheda },
            ],
        },
        {
            id: "exp008",
            title: "Mocktails & Shakes",
            amount: 620,
            date: "21-Mar-2025",
            category: {
                name: categories[1].name,
                gradient: categories[1].gradient,
                icon: categories[1].icon,
            },
            members: [
                { name: "Zuzu", img: zuzu },
                { name: "Habib", img: habib },
                { name: "Awazii", img: awazii },
            ],
        },
        {
            id: "exp009",
            title: "Vape Juice & Pods",
            amount: 1450,
            date: "23-Mar-2025",
            category: {
                name: categories[2].name,
                gradient: categories[2].gradient,
                icon: categories[2].icon,
            },
            members: [
                { name: "Daud", img: daud },
                { name: "Awazii", img: awazii },
            ],
        },
        {
            id: "exp010",
            title: "Random Essentials",
            amount: 980,
            date: "25-Mar-2025",
            category: {
                name: categories[5].name,
                gradient: categories[5].gradient,
                icon: categories[5].icon,
            },
            members: [
                { name: "Sheda", img: sheda },
                { name: "Saad Khalid", img: saad },
            ],
        }
    ];
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
                <div className="expenses grid grid-cols-3 gap-3 overflow-auto h-160 ">    {Expenses.map((expense, index) => {
                        return (
                            <div key={index} className='expense relative card-b h-40 rounded-lg'>
                                <div className='expense-detail-btn absolute bottom-4 right-5'>
                                    <Expensedetailbtn Openmodel={Openmodel}/>
                                </div>
                                <div className="expense-info  w-[92%] h-20 mx-auto mt-1  rounded-lg center-flex gap-3">
                                    <div className="expense-logo  size-15 rounded-lg  center-flex shadow-md" style={{ background: expense.category.gradient }}>
                                        {expense.category.icon}
                                    </div>
                                    <div className='expense-details flex-1  h-15 flex justify-between gap-1 items-center'>
                                        <div className='expense-left'>
                                            <h2 className='text-lg font-semibold line-clamp-1 '>{expense.title}</h2>
                                            <div className="category-date flex items-center gap-1">
                                                <span className='text-sm text-text-secondary'>{expense.category.name}</span>
                                                <span className='text-sm text-text-secondary'>•</span>
                                                <span className='text-sm text-text-secondary'>{expense.date}</span>
                                            </div>
                                        </div>
                                        <div className='expense-right text-right'>
                                            <h2 className='text-xl text-primary font-semibold '>Rs.{Number(expense.amount).toLocaleString()}</h2>
                                            <span className='text-[12px] text-text-secondary'>Total Amount</span>                               </div>
                                    </div>                   </div>     <div className='expense-members w-70 mx-auto h-15 flex items-center  gap-2'>
                                      <div className="about ml-2">
                                          <h4 className='text-md font-semibold line-clamp-1'>Participants</h4>
                                        <div className="members flex gap-1 mt-1">
                                            {
                                                expense.members.slice(0, 3).map((members, index) => {
                                                    return (
                                                        <div key={index} className="member size-7  rounded-lg shadow-md">
                                                            <img src={members.img} alt="" className='Img-c rounded-lg' />
                                                        </div>
                                                    )
                                                })
                                            }

                                            {
                                                expense.members.length > 3 && <div className="rest size-7 bg-highlight border-l shadow-md rounded-lg  center-flex">
                                                    <span className='text-[12px] '>+{expense.members.length - 3}</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
              <Basemodel  isOpen={popup}
             Closemodel={Closemodel}
             title="Expense Details"
             >
                 <Expensedetails/>        
             </Basemodel>
        </div>
    )
}
