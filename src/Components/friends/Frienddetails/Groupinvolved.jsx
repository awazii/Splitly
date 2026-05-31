import React from 'react'
import { CategoryExtrator } from '../../../utils/CategoryExtractor';
import Detailbtn from '../../Groups/Common/detailbtn';
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { RiGroupLine } from "react-icons/ri";
export const Groupinvolved = ({ friendGroups ,friend }) => {
    return (
        <div className="groups-involved space-y-3 w-140 h-80 overflow-auto  py-2">
            {friendGroups.length > 0 ? (
                <div className='grid grid-cols-4 gap-3 auto-rows-min'>
                 {    friendGroups.map(group => (
                    <div
                        key={group.id}
                        className="group-item flex items-center flex-col gap-1 bg-white rounded-xl shadow-md p-4 h-40 
                         hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    >
                        <div className="icon flex-shrink-0 size-20 rounded-full center-flex bg-lightest">
                            <img
                                src={CategoryExtrator(group).Img}
                                alt={group.Name}
                                className="Img-c"
                            />
                        </div>
                        <div className="info center-flex flex-col flex-1">
                            <h4 className="font-semibold text-text-secondary text-sm truncate w-26 text-center">{group.Name}</h4>
                            <Detailbtn groupid={group.id} title = "Visit" />
                        </div>
                    </div>
                    ))
                }
                </div>

            ) : (
                <UniversalEmptyState
                    title="No groups yet"
                    description={`${friend.Name} is not involved in any groups yet.`}
                    textsize=""
                >
                    <div className="p-10 shadow-md bg-gray-50 rounded-full">
                        <RiGroupLine className="size-10 text-primary" />
                    </div>
                </UniversalEmptyState>
            )}
        </div>
    )
}
