import React from 'react'
import { MdSort } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { SortIcons, FilterIcons } from '../utils/SortFiltersvgs';
import { selectGroupById } from '../store/GroupSlice';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { pageContainerVariants, cardContentVariants } from './../utils/animation'
export const FilterSortPanel = ({ queryOptions, type }) => {
  const group = useSelector(state => selectGroupById(state, queryOptions.Filter.details?.value))
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Active-filter-sort mb-3 center-flex w-fit gap-2'>
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
        className='Active-filters shadow w-fit h-15 bg-white center-flex gap-2 p-2 px-5 rounded-lg'>
        <motion.div
        variants={cardContentVariants}
        className='w-fit center-flex gap-1 '>
          <MdSort className="size-6 text-primary font-semibold" />
          <h3 className='font-semibold'>Sort:</h3>
        </motion.div>
        <motion.div
        variants={cardContentVariants}
         className='flex-1 center-flex gap-2'>
          <h3 className='border-l p-2 text-sm center-flex gap-1 '><span className='font-semibold
                    '>Sort By: </span> {SortIcons[queryOptions.Sort.type]} {queryOptions.Sort.type}</h3>
        </motion.div>
      </motion.div>
      <motion.div className='Active-filters shadow w-fit h-15 bg-white center-flex gap-2 p-2 px-5 rounded-lg'>
        <motion.div
        variants={cardContentVariants}
         className='w-fit center-flex gap-1 '>
          <CiFilter className="size-6 text-primary font-semibold" />
          <h3 className='font-semibold'>Filters:</h3>
        </motion.div>
        <motion.div
        variants={cardContentVariants}
         className='flex-1 center-flex gap-2'>
          <h3 className='border-l p-2 text-sm center-flex gap-1'><span className='font-semibold
                    '>Status:</span> <span className={
              `${queryOptions.Filter.active ? "bg-green-500" :
                "bg-red-500"
              }
                       rounded-full`}>
              {queryOptions.Filter.active ?
                <IoMdCheckmarkCircle className='text-white' />
                :
                <IoMdCloseCircle className='text-white' />}
            </span> {queryOptions.Filter.active ? "Active" : "InActive"}</h3>

          {queryOptions.Filter.active &&
            <>
              <h3 className='border-l p-2 text-sm center-flex gap-1'><span className='font-semibold
                    '>Filter Type: </span>{FilterIcons[queryOptions.Filter.type]}{queryOptions.Filter.type}</h3>

              {type === "expense" && <h3 className='border-l p-2 text-sm center-flex gap-1'><span className='font-semibold
                    '>{queryOptions.Filter.details.label}:</span> {
                  group ? group.Name : queryOptions.Filter.details.value}</h3>
              }
            </>}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
