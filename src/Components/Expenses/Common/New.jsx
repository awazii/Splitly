import React from 'react'
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {Addexpense} from '../Addexpense/AddExpense'
const New = () => {
    const Navigate = useNavigate()
    const { Groupid } = useParams();
    return (
        <div className='Add-expense-container flex flex-col '>
            <div className="header h-25  flex px-10 center-flex  gap-3  w-fit">
                <button className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95" onClick={() => { Navigate(`/Groups/${Groupid}/Expenses`) }}>
                    <IoReturnUpBack className='size-6 group-hover:text-primary' />
                </button>
                <h3 className='text-3xl '>Add New Expense</h3>
            </div>
            <div className="add-expense h-180 center-flex">
                    <Addexpense/>
            </div>
        </div>
    )
}
export default New;
