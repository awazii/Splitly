import React, { useState } from 'react'
import { Spliter } from '../../Components/Spliter/Spliterform/Spliter';
import { SummaryDashboard } from './Summary/Summary';
import Resplitbtn from "../../Components/Spliter/Common/Resplit"
import { useSelector } from 'react-redux'
import { selectAllSplits } from '../../store/SpliterSlice';
export const Spliter_main = () => {
   const Splits= useSelector(selectAllSplits)
    return (
        <div className='ExpenseCalculator-main h-full overflow-auto scrollbar-hide relative'>
            <h1 className="text-3xl font-semibold mb-1 m-6">Spliter</h1>
            {Splits.length === 0 && (
            <p className="text-text-secondary text-md mx-6">
                Add people, split expenses by equal or custom shares, and see who owes whom — all calculated temporarily.
            </p>)
            }
            {Splits.length > 0 && <div className="Summary-heading relative flex justify-between items-center mx-10 p-2 mt-4">
                <div>
                    <p className="text-2xl font-medium ">Quick Split Summary</p>
                </div>
                <div className="Resplitbtn-container" 
                >
                    <Resplitbtn id={Splits[0].id} />
                </div>
            </div>}
            {Splits.length > 0 ? <SummaryDashboard />:<Spliter/> }

        </div>
    )
}
