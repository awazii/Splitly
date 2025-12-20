import React from 'react'
import { Overview } from './Summary_Components/Overview'
import { Settelments } from './Summary_Components/Settelments'
import { Insights } from './Summary_Components/Insights'
import {Comparisongraph} from "./Summary_Components/Comparison_graph"
export const SummaryDashboard = () => {
    return (
        <div className='container mx-auto h-fit mt-2 mb-4 grid grid-cols-5 gap-2 grid-row-span-6'>
            <div className="Overview col-span-3 h-30 row-span-1">
                <Overview />
            </div>
            <div className="insights col-span-2 row-span-1">
                <Insights/>
            </div>
            <div className="Comparisan-graph col-span-3  border-l row-span-4">
                <Comparisongraph/>
            </div>
            <div className="Settlements col-span-2 h-160 row-span-4">
                <Settelments />
            </div>
        </div>
    )
}
