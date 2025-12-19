import React from 'react'
import Input from '../Input'
import Button from '../searchbtn'
import { GiExpense } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import mountain from "../../assets/groups/mountain.jpg"
import Expensedetailbtn from './Details';
import saad from "../../assets/saad.jpg"
import habib from "../../assets/habib.png"
import zuzu from "../../assets/zuzu.png"
import awazii from "../../assets/awazii.jpg"
import daud from "../../assets/daud.jpg"
import arshman from "../../assets/arshman.jpg"
import sheda from "../../assets/sheda.jpg"
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
import { FaArrowRight } from "react-icons/fa6";
import Linechart from './Linechartgraph';
export const categories = [
    {
        name: "Food & Snacks",
        gradient: "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 50%, #FF99AC 100%)",
        icon: <LuUtensils className="size-6 text-white" />
    },
    {
        name: "Drinks & Beverages",
        gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
        icon: <RiDrinks2Line className="size-6 text-white" />
    },
    {
        name: "Vapes & Smoking",
        gradient: "linear-gradient(135deg, #00DBDE 0%, #FC00FF 100%)",
        icon: <MdSmokeFree className="size-6 text-white" />
    },
    {
        name: "Transport",
        gradient: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)",
        icon: <FaCar className="size-6 text-white" />
    },
    {
        name: "Hotel & Stay",
        gradient: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
        icon: <MdHotel className="size-6 text-white" />
    },
    {
        name: "Others",
        gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 50%, #DD2476 100%)",
        icon: <IoSparklesSharp className="size-6 text-white" />
    },
    {
        name: "Movie & Events",
        gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
        icon: <IoTicketSharp className="size-6 text-white" />
    }
];
export const Expense = () => {

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
            group: {
                name: "Trip to Murree",
                img: mountain,
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
            group: {
                name: "Sea View Hangout",
                img: beach,
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
            group: {
                name: "Atif Aslam Concert",
                img: concert,
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
            group: {
                name: "Birthday Party",
                img: Restaurant,
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
            group: {
                name: "Gaming Night",
                img: Other,
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
            group: {
                name: "Northern Trip",
                img: mountain,
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
            group: {
                name: "Friends Meetup",
                img: Restaurant,
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
            group: {
                name: "Cafe Chill Session",
                img: Restaurant,
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
            group: {
                name: "Night Drive",
                img: mountain,
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
            group: {
                name: "Errand Run",
                img: Other,
            },
            members: [
                { name: "Sheda", img: sheda },
                { name: "Saad Khalid", img: saad },
            ],
        }
    ];


    const expenseoverview = [
        {
            label: "Total Expenses",
            weeklyreport: {
                percenpage: 12,
                isIncrease: true,
            },
            amount: 12340,
            icon: <FaMoneyCheck className='text-white size-10' />,
            gradient: 'linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)',
        },
        {
            label: "Expense Count",
            amount: 55,
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
                <div className="expenses grid grid-cols-3 gap-3  pb-5">
                    {Expenses.sort(() => Math.random() - 0.5)
                        .map((expense, index) => {
                            return (
                                <div key={index} className='expense relative card-b h-40 rounded-lg'>
                                    <div className='expense-detail-btn absolute bottom-4 right-5'>
                                        <Expensedetailbtn />
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
                                                <span className='text-[12px] text-text-secondary'>Total Amount</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='expense-members w-70 mx-auto h-15 flex items-center  gap-2'>
                                        <div className="group-logo size-14 rounded-full border-b-light shadow-md border">
                                            <img src={expense.group.img} alt="" className='Img-c' />
                                        </div>
                                        <div className="about ml-2">
                                            <h4 className='text-md font-semibold line-clamp-1'>{expense.group.name}</h4>
                                            <div className="members flex gap-1 mt-1">
                                                {
                                                    expense.members.slice(0, 3).map((members, index) => {
                                                        return (
                                                            <div className="member size-7  rounded-lg shadow-md">
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

        </div>
    )
}
