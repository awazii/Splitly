import React from 'react'
import { Overview } from '../../../Components/Expenses/Expensedetails/Overview'
import { Settlements } from '../../../Components/Expenses/Expensedetails/Settlements'
import { Insights } from '../../../Components/Expenses/Expensedetails/Insights'
import { Comparisongraph } from "../../../Components/Expenses/Expensedetails/Comparison_graph"
import { useSelector } from 'react-redux'
import { selectAllSplits } from '../../../store/SpliterSlice'
export const SummaryDashboard = () => {
    const Expense = useSelector(selectAllSplits)[0]
    return (
        <div
            className="container mx-auto h-fit mt-2 mb-4 grid grid-cols-5 gap-2 grid-rows-span-6"
        >
            <div  className="Overview  col-span-3 h-30 row-span-1">
                <Overview Expense={Expense} />
            </div>

            <div  className="insights col-span-2 row-span-1">
                <Insights data={Expense.Members} />
            </div>

            <div 
                className="Comparisan-graph bg-white shadow-md  col-span-3 row-span-4 rounded-lg h-160">
                <Comparisongraph Expense={Expense} />
            </div>
            <div  className="Settlements col-span-2 h-160 row-span-4">
                <Settlements Expense={Expense} />
            </div>
        </div>
    )
}
