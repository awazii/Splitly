import React from 'react'
import { Overview } from '../../Expenses/Expensedetails/Overview'
import { Settlements } from '../../Expenses/Expensedetails/Settlements'
import { Insights } from '../../Expenses/Expensedetails/Insights'
import {Comparisongraph} from "../../Expenses/Expensedetails/Comparison_graph"
export const SummaryDashboard = () => {
    return (
        <div className='container mx-auto h-fit mt-2 mb-4 grid grid-cols-5 gap-2 grid-rows-span-6'>
            <div className="Overview col-span-3 h-30 row-span-1">
                <Overview />
            </div>
            <div className="insights col-span-2 row-span-1">
                <Insights/>
            </div>
            <div className="Comparisan-graph card-b col-span-3 row-span-4 rounded-lg h-160">
                <Comparisongraph/>
            </div>
            <div className="Settlements col-span-2 h-160 row-span-4">
                <Settlements />
            </div>
        </div>
    )
}
