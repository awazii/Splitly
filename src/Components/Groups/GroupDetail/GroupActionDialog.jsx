import React, { useState } from 'react'
import { selectGroupById, deleteGroup, updateGroup } from '../../../store/GroupSlice'
import { useSelector, useDispatch } from 'react-redux';
import { MdGroupRemove } from "react-icons/md";
import { TbSnowflake } from "react-icons/tb";
import { pageContainerVariants, cardVariants, headerVariants } from "../../../utils/animation";
import { motion } from "framer-motion";
const ConfirmAction = ({ group, isnew, Closemodel, setIsConfirmed }) => {
  const dispatch = useDispatch();
  const groupParagraphs = {
    remove:
      "Removing this group will delete it from your list. This action only applies to new groups that have no balances or shared expenses. Once removed, the group will no longer be accessible.",
    freeze:
      "Freezing this group permanently prevents any new expenses, edits, or adding new members. The group becomes locked like history, and past records remain visible but cannot be changed."
  };

  function handleAction() {
    if (isnew) {
      dispatch(deleteGroup(group.id));
    }
    else {
      dispatch(updateGroup({ id: group.id, changes: { statusid: "Freeze" } }));
    }
    setIsConfirmed(true);
  }
  return (
    <div className="w-full h-full center-flex items-start flex-col gap-3 p-3 pt-0">
      <h2 className="text-xl font-semibold text-center">
        {`${isnew ? "Delete" : "Freeze"} ${group.Name}`}
      </h2>
      <div className="text-text-secondary">
        <p className="text-text-secondary">
          {`Are you sure you want to ${isnew
            ? "Delete "
            : "Freeze "}`}
          <span className="text-black font-semibold">{`${group.Name}?`}</span>
        </p>

        <p className="text-sm text-text-secondary mt-2">
          {groupParagraphs[isnew ? "remove" : "freeze"]}
        </p>
      </div>
      <div className="w-full flex justify-end gap-3 mt-4">
        <button
          className="px-4 py-2 rounded-lg border border-l hover:bg-gray-100 hover:border-primary shadow transition-colors cursor-pointer"
          onClick={() => {
            Closemodel()
          }}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white ${isnew ? "bg-red-500 hover:bg-red-600" : "bg-sky-500 hover:bg-sky-600"} transition-colors cursor-pointer center-flex gap-2`}
          onClick={() => {
            handleAction()
          }}
        >
          {isnew ? <MdGroupRemove className=' size-4' /> : <TbSnowflake className=' size-4' />}
          {isnew ? "Delete" : "Freeze"}
        </button>
      </div>
    </div>
  );
}
const ActionResult = ({ group, Groupinfo, Closemodel }) => {
  const groupResultTexts = {
    remove: ` has been successfully removed from your groups list.`,
    freeze: ` has been frozen permanently. You can no longer edit, add new expenses, or add new members in this group. It is now locked as history.`
  };

  const IconComponent = Groupinfo.isnew ? MdGroupRemove : TbSnowflake
  return (
    <motion.div variants={headerVariants} className="w-full h-full center-flex flex-col gap-4 p-4">
      <div className="p-8 shadow-md rounded-full bg-white">
        <IconComponent className={`size-8 ${Groupinfo?.isnew ? "text-red-500" : "text-sky-500"}`} />
      </div>
      <div className={`center-flex flex-col gap-2 `}>
        <h3 className='text-xl font-semibold'>Group {Groupinfo?.isnew ? "Deleted" : "Frozen"}</h3>
        <p className='text-sm text-center w-90 text-text-secondary'> <span className="font-semibold text-black">{Groupinfo?.name}</span> {groupResultTexts[Groupinfo?.isnew ? "remove" : "freeze"]}</p>
      </div>
      < button onClick={() => Closemodel()} className="px-4 py-2  rounded-lg bg-black text-white hover:bg-orange-600 transition-colors cursor-pointer"> Return to Group Page</button>
    </motion.div>
  );
}
export const GroupActionDialog = ({ isnew, groupId, Closemodel }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const group = useSelector((state) => selectGroupById(state, groupId));
  const [Groupinfo, setGroupinfo] = useState({
    name: group ? group.Name : '',
    isnew
  })
  return (
    <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" className="w-120 h-fit">
      {isConfirmed ? <ActionResult
        Groupinfo={Groupinfo} Closemodel={Closemodel} group={group} /> : <ConfirmAction group={group} isnew={isnew} setIsConfirmed={setIsConfirmed} Closemodel={Closemodel} />}
    </motion.div>
  )
}
