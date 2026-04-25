import React from 'react'
import { Overview } from '../Spliter/Summary/Overview'
import { Settlements } from '../Spliter/Summary/Settlements'
import { Insights } from '../Spliter/Summary/Insights'
import {Comparisongraph} from "../Spliter/Summary/Comparison_graph"
import { useSelector } from 'react-redux'
import {selectExpenseById} from '../../store/ExpenseSlice'
export const Expensedetails = ({expenseid}) => {
    const Expense = useSelector(state=>selectExpenseById(state,expenseid))
  return (
     <div className='container mx-auto h-fit mt-2  grid grid-cols-5 gap-2 grid-rows-span-6'>
                <div className="Overview col-span-3 h-30 row-span-1">
                    <Overview  Expense={Expense}/>
                </div>
                <div className="insights col-span-2 row-span-1">
                  <Insights data={Expense.Members}/>
                </div>
                <div className="Comparisan-graph card-b col-span-3 row-span-4 rounded-lg h-160">
                    <Comparisongraph Expense={Expense}/>
                </div>
                <div className="Settlements col-span-2 h-160 row-span-4">
                    <Settlements Expense={Expense} />
                </div>
            </div>
  )
}
