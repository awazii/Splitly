import React, { useState, useEffect } from 'react'
import { UniversalEmptyState } from '../../UniversalEmptyState'
import { selectAllFriends } from '../../../store/FriendsSlice'
import { useSelector } from 'react-redux'
import { TbMoodHappy } from "react-icons/tb";
import Selectall from '../../Common/Selectall'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../../../store/GroupSlice'
import Gcheckbox from '../Common/gcheck'
import { RenderSelectfriends } from '../AddGroup/Newg'
import { IoPersonAdd } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { headerVariants, pageContainerVariants } from "../../../utils/animation";
import { addActivity } from "../../../store/ActivitySlice"
const ActionResult = ({ Selected, Closemodel }) => {
    return (
        <motion.div variants={headerVariants} className="w-full h-full center-flex flex-col gap-4 p-4">
            <div className="p-7 shadow-md rounded-full bg-white">
                <FaUserPlus className={`size-9  text-orange-500 `} />
            </div>
            <div className={`center-flex flex-col gap-2 `}>
                <h3 className="text-xl font-semibold">
                    Member{Selected.length !== 1 ? "s" : ""} Added!
                </h3>
                <p className="text-sm text-center w-90 text-text-secondary">
                    {Selected.length} Member{Selected.length !== 1 ? "s" : ""}
                    {Selected.length === 1 ? " has" : " have"} been successfully added to the group
                    and can now be included in shared expenses.
                </p>

            </div>
            < button onClick={() => Closemodel()} className="px-4 py-2  rounded-lg bg-black text-white hover:bg-orange-600 transition-colors cursor-pointer"> Done</button>
        </motion.div>
    );
}
export const Addmember = ({ CurrentGroup, Closemodel }) => {
    const AllFriends = useSelector(selectAllFriends);
    const AvailableFriends = AllFriends.filter(friend => !CurrentGroup.Members.includes(friend.id))
    const [selectedfriends, setSelectedfriends] = useState([]);
    const dispatch = useDispatch()
    const [isSubmitted, setisSubmitted] = useState(false)
    const handleAddMembers = () => {
        dispatch(updateGroup({ id: CurrentGroup.id, changes: { Members: [...CurrentGroup.Members, ...selectedfriends] } }))
        dispatch(addActivity({
            title:`${selectedfriends.length} Members Added`,
            selfTitle: true,
            description: null,
            icon: "memberJoined",
            visibility: {
                global: true,
                friend: true,
                group: true
            },
            friends: selectedfriends,
            friendImages: null,
            groupid: CurrentGroup.id,
            groupinfo: {
                name: CurrentGroup.Name,
                Category: CurrentGroup.Category
            },
            category: "group",
        }))
        setisSubmitted(true)
    };
    useEffect(() => {
        console.log("Addmember component rendered", AvailableFriends);
    }, [AvailableFriends])
    return (
        <motion.div variants={pageContainerVariants}
            initial="hidden"
            animate="visible" className='w-140 h-fit '>
            {isSubmitted ? <ActionResult Selected={selectedfriends} Closemodel={Closemodel} />
                :
                AvailableFriends.length > 0 ? <div
                    className='select-friends-container w-full bg-white rounded-lg p-5 flex flex-col items-center'>
                    {!isSubmitted && <>
                        <div className='select-friend-option w-full flex items-center justify-between'>
                            <h4 className='text-md font-semibold my-2 '>Bring more friends on board
                            </h4>
                            <div className='center-flex gap-2'>
                                <div className=' w-25 py-2 px-3 bg-neutral-100 rounded-lg  '>
                                    <Selectall setSelected={setSelectedfriends} members={AvailableFriends} Selected={selectedfriends}>
                                        <h5 className='text-[13px] text-text-secondary'>Select all</h5>
                                    </Selectall>
                                </div>
                            </div>
                        </div>
                        <div className='select-friends  mx-auto mt-3 w-full '>
                            <RenderSelectfriends Friends={AvailableFriends} setSelectedfriends={setSelectedfriends} Selectedfriends={selectedfriends} styles="w-full grid-cols-4 " />
                        </div>
                        <button
                            disabled={selectedfriends.length === 0}
                            type='submit'
                            className={`w-30 mt-4 px-4 py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100  gap-2 disabled:opacity-50 ${selectedfriends.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} center-flex `}
                            onClick={handleAddMembers}
                        >
                            Add
                            <IoPersonAdd className='size-4' />
                        </button>
                    </>}
                </div> : <UniversalEmptyState
                    title="Everyone's Here!"
                    description="You’ve already added all your available friends to this group. To add more people, Add them to your friends list first."
                    textsize=""
                >
                    <div className="p-8 shadow-md bg-gray-50 rounded-full">
                        <TbMoodHappy className="size-12 text-primary" />
                    </div>
                </UniversalEmptyState>}

        </motion.div>
    )
}
