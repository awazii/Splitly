import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FriendsByGroupChart } from "./Fchart1";
import { TotalOwedChart } from "./Fchart2"
import { MultiPaidVsOwes } from './Fchart3';
import GroupExpensesChar from './Fchart4'
import GroupSizeChart from './Fchart5'
import AnimateOnSightWrapper from '../../utils/intersection'
export const Analytics = () => {
    return (
        <div className='Analytics h-full overflow-auto scrollbar-hide relative '>
            <h1 className="text-3xl font-semibold m-6 mb-1">Analytics</h1>
            <p className='text-text-secondary text-md mx-6 '>
                All graphs below update based on real stored data.</p>
            <div className="friends-analytics my-5 container mx-auto">
                <h2 className='text-xl font-semibold mb-3 center-flex gap-1 w-fit'>
                    Friends Analytics <span><FaUserFriends /></span>
                </h2>

                <div className="f-graphs-container grid grid-cols-4 grid-rows-4 gap-3">
                    <div className="card-b rounded-lg col-span-2 row-span-2">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Friend Group Memberships
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Showing the number of groups each friend is in
                        </p>
                        <AnimateOnSightWrapper>
                            <FriendsByGroupChart />
                        </AnimateOnSightWrapper>
                    </div>
                    <div className="card-b rounded-lg col-span-2 row-span-2">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Amounts Owed by Friends
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            A list of what each friend currently owes
                        </p>
                        <AnimateOnSightWrapper>
                            <TotalOwedChart />
                        </AnimateOnSightWrapper>
                    </div>

                    <div className="card-b rounded-lg col-span-4 row-span-2">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Friend Balances
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Summary of Contributions and Allocations
                        </p>
                        <AnimateOnSightWrapper>
                            <MultiPaidVsOwes />
                        </AnimateOnSightWrapper>
                    </div>
                </div>
            </div>
            <div className="group-analytics my-5 container mx-auto">
                <h2 className='text-xl font-semibold mb-3 center-flex gap-1 w-fit'>
                    Groups Analytics <span><HiMiniUserGroup /></span>
                </h2>

                <div className="g-graphs-container grid grid-cols-3 gap-3">
                    <div className="card-b rounded-lg col-span-2">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Group Member Counts
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Showing the total number of members in each group
                        </p>
                        <AnimateOnSightWrapper>
                            <GroupSizeChart />
                        </AnimateOnSightWrapper>
                    </div>
                    <div className="card-b rounded-lg col-span-1">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Highest Spending Groups
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Top 5 groups by total spend
                        </p>
                        <AnimateOnSightWrapper>
                            <GroupExpensesChar />
                        </AnimateOnSightWrapper>
                    </div>
                </div>

            </div>
        </div>
    )
}
