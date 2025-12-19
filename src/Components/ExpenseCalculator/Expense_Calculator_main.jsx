import React, { useState } from 'react'
import { Friends } from "../friends/Friendslist"
import { ExpenseCalculator } from './ExpenseCalculator';
import { SummaryDashboard } from './Summary';
import Resplitbtn from "./Resplit"
export const temporaryfriends = [{ type: "temporary", name: "ali" }, { type: "temporary", name: "sami" }, { type: "temporary", name: "hassan" }, { type: "temporary", name: "laraib" }];
const allfriends = [...temporaryfriends, ...Friends];
export const Expense_Calculator_main = () => {
    const [Summary, setSummary] = useState(true)
    return (
        <div className='ExpenseCalculator-main h-full overflow-auto scrollbar-hide relative'>
            <h1 className="text-3xl font-semibold mb-1 m-6">Expense Calculator</h1>
            {!Summary && <p className="text-text-secondary text-md mx-6">
                Add people, split expenses by equal or custom shares, and see who owes whom — all calculated temporarily.
            </p>}
            {Summary && <div className="Summary-heading relative flex justify-between items-center mx-10 p-2 mt-4">
                <div>
                    <p className="text-2xl font-medium ">Quick Split Summary</p>
                </div>
                <div className="Resplitbtn-container" onClick={()=>{
                    setSummary(!Summary)
                }}>
                    <Resplitbtn />
                </div>
            </div>}
            {!Summary ? <ExpenseCalculator allfriends={allfriends} setSummary={setSummary} Summary={Summary} /> : <SummaryDashboard />}

        </div>
    )
}
