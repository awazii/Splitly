import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FriendsByGroupChart } from "./Fchart1";
import { TotalOwedChart } from "./Fchart2"
import { MultiPaidVsOwes } from './Fchart3';
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
                            Friends by group count
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Top 10 friends ranked by group participation
                        </p>
                        <FriendsByGroupChart />
                    </div>

                    <div className="card-b rounded-lg col-span-2 row-span-2">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Total owed by friend
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Top 10 friends ranked by amount owed
                        </p>
                        <TotalOwedChart />
                    </div>

                    <div className="card-b rounded-lg col-span-4 row-span-2">
                        <h3 className="font-semibold mt-4 text-xl text-center">
                            Friend Contributions
                        </h3>
                        <p className="text-text-secondary mt-1 text-md text-center">
                            Top 10 contributors by payments vs debts
                        </p>
                        <MultiPaidVsOwes />
                    </div>
                </div>
            </div>
            <div className="group-analytics">

            </div>
        </div>
    )
}
// | Feature                              | Graph Type                  | Difficulty  | Why                     |
// | ------------------------------------ | --------------------------- | ----------- | ----------------------- |
// | Friends by group count               | Vertical Bar                | Easy        | Clean ranking           |
// | Total owed by friend                 | Horizontal Bar              | Easy        | Names fit better        |
// | Paid vs Owes (overall app)           | Stacked Bar (1 bar)         | Medium      | Quick balance check     |
// | Group size                           | Bar Chart                   | Easy        | Counts look great       |
// | ⭐ Friend vs Group Contribution Ratio | **Stacked Bar (multi-bar)** | Medium-High | Most meaningful insight |

