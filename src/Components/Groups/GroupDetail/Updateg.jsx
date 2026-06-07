import React, { useState, useEffect } from 'react'
import { updateGroup, selectGroupById } from '../../../store/GroupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { TbIdBadge, TbEdit } from "react-icons/tb";
import Loader from '../../Common/loader';
import { Groupcategories } from '../../../pages/Group/Grouplist'
import { IoCheckmark } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi2";
import { addActivity } from "../../../store/ActivitySlice"
export const Updateg = ({ groupId }) => {
    const CurrentGroup = useSelector((state) => selectGroupById(state, groupId));
    const [showSuccess, setshowSuccess] = React.useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const GroupnamePattern = /^[A-Za-z][A-Za-z0-9\s,._-]*$/;
    const [selectedOption, setSelectedOption] =
        useState(CurrentGroup?.Category);
    const { register, handleSubmit, reset, trigger, getValues, control, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues: {
            Name: CurrentGroup.Name || "",
        }
    });
    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await dispatch(updateGroup({ id: groupId, changes: { Name: data.Name, Category: selectedOption } }));
            dispatch(addActivity({
                title: "Group Info Updated",
                selfTitle: false,
                description: null,
                icon: "groupUpdate",
                visibility: {
                    global: true,
                    friend: false,
                    group: true
                },
                friends: null,
                friendImages: null,
                groupid: groupId,
                groupinfo: {
                    name: data.Name,
                    Category: selectedOption
                },
                category: "group",
            }));
            setshowSuccess(true);
              setTimeout(() => {
                setshowSuccess(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to update group:", error);
        }
    };
    function CategoryExtractor(categoryId) {
        const category = Groupcategories.find(category => category.id === categoryId);
        return category
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-90 h-fit bg-white rounded-xl shadow p-5 center-flex flex-col '>
            <div className="size-32 rounded-full  cursor-pointer mb-4">
                <img src={CategoryExtractor(selectedOption).Img} className="Img-c" alt="Preview" />
            </div>
            <div className="w-full space-y-4">
                <Controller
                    name="Name"
                    control={control}
                    rules={{
                        required: "Name is required",
                        maxLength: { value: 15, message: "Max 15 characters allowed" },
                        minLength: { value: 3, message: "At least 3 characters" },
                        pattern: {
                            value: GroupnamePattern,
                            message: "Must start with a letter, followed by letters, numbers, or underscores"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="flex items-center gap-3 w-full p-4 border-l rounded-2xl focus-within:ring-2 focus-within:ring-primary transition-all bg-transparent">
                                <TbIdBadge className="size-6 text-gray-400 shrink-0" />
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Display Name"
                                    className="w-full outline-none bg-transparent font-medium"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        trigger("Name");
                                        if (!hasInteracted) setHasInteracted(true);
                                    }}
                                />
                            </div>
                            {fieldState.error && (
                                <p className="text-red-600 text-sm">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
                <div className="mt-4">
                    <label className="mb-2 block text-sm text-[#8a8a8a]">
                        Selected Category Option
                    </label>
                    <div className="relative w-full">
                        <button
                            type='button'
                            onClick={() => setIsOpen(!isOpen)
                            }
                            className="flex w-full items-center justify-between rounded-2xl border border-[#ebebeb] bg-white px-4 py-3 text-sm text-[#555] shadow-md transition-all hover:border-[#ff7a3d] cursor-pointer"
                        >
                            <span>{CategoryExtractor(selectedOption).variant}</span>

                            <HiChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute left-0 z-50  w-full h-25 overflow-y-auto rounded-2xl border border-[#ebebeb] bg-white p-2 shadow-xl mt-1">
                                {Groupcategories.map((option) => {
                                    const isSelected =
                                        selectedOption === option.id;

                                    return (
                                        <button
                                            type='button'
                                            key={option}
                                            onClick={() => {                       
                                                if (selectedOption !== option.id) {
                                                    setSelectedOption(option.id);
                                                    if (!hasInteracted) setHasInteracted(true);
                                                }

                                                setIsOpen(false);
                                            }}

                                            className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition-all cursor-pointer ${isSelected
                                                ? "bg-[#fff2eb] text-[#ff7a3d]"
                                                : "text-[#555] hover:bg-[#f8f8f8]"
                                                }`}
                                        >
                                            <span>{option.variant}</span>

                                            {isSelected && (
                                                <IoCheckmark
                                                    size={16}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                disabled={!hasInteracted}
                type='submit'
                className={`w-30 mt-4 px-4 py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50 ${(isSubmitting || !hasInteracted) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {isSubmitting && <Loader />}
                {!isSubmitting && <>Update <TbEdit className='size-5' /></>}
            </button>
            {isSubmitting && <p className="text-sm text-gray-500 mt-2">Updating...</p>}
            {showSuccess && <p className="text-sm text-green-600 mt-2">Updated successfully!</p>}
        </form>
    )
}
