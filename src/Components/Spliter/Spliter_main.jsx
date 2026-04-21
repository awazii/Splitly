import React, { useState } from 'react'
import { Spliter } from './Spliter';
import { SummaryDashboard } from './Summary/Summary';
import Resplitbtn from "./Resplit"
export const temporaryfriends = [{ type: "temporary", name: "ali" }, { type: "temporary", name: "sami" }, { type: "temporary", name: "hassan" }, { type: "temporary", name: "laraib" }];
export const Spliter_main = () => {
    const [Summary, setSummary] = useState(true)
    return (
        <div className='ExpenseCalculator-main h-full overflow-auto scrollbar-hide relative'>
            <h1 className="text-3xl font-semibold mb-1 m-6">Spliter</h1>
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
            {!Summary ? <Spliter allfriends={allfriends} setSummary={setSummary} Summary={Summary} /> : <SummaryDashboard />}

        </div>
    )
}
