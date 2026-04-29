import React, { useEffect, useMemo } from 'react'
import CalculatorInput from '../../Expenses/Common/addcalinput';
import Selectall from '../../Common/Selectall';
import SpliterCheck from '../../Groups/Common/gcheck'
import Choosef from "../../Common/choosef"
import { IoPerson } from "react-icons/io5";
import Temporaryinput from '../Common/Temporary';
import Addtemp from '../Common/Addtemp';
import { useSelector } from 'react-redux';
import { selectAllFriends, selectPinnedFriends } from '../../../store/FriendsSlice';
import { useFormContext, Controller } from 'react-hook-form';
import { useState } from 'react';
export const Stepone = ({ }) => {
    const { control, register, setValue, trigger, getValues, watch, setError, clearErrors, formState: { errors } } = useFormContext();
    const temporary = watch("temporary") || [];
    const AllFriends = useSelector(selectAllFriends)
    const PinnedFriends = useSelector(selectPinnedFriends);
    const CurrentExpensemembers = getValues("splitMembers");
    const [SelectedFriends, setSelectedFriends] = useState(CurrentExpensemembers)
    const [isPinselected, setisPinselected] = useState(false)
    const NamePattern = /^[A-Za-z][A-Za-z0-9\s,._&'-]*$/;
    const Friends = useMemo(() => {
        return isPinselected ? PinnedFriends : [...temporary, ...AllFriends];
    }, [isPinselected, temporary, AllFriends, PinnedFriends]);
    const addTemporaryFriend = () => {
        const name = watch("tempname")
        if (name === '') return
        const current = watch("temporary") || [];
        if (current.length >= 5) {
            setError("tempname", {
                type: "manual",
                message: "You can only add up to 5 temporary friends"
            });
            return;
        }
        const exists = current.some(
            friend => friend.Name.toLowerCase() === value.toLowerCase()
        );
        if(exists) return
        clearErrors("tempname");
        const id = `temp_${current.length + 1}`;
        const newFriend = { id, Name: name, type: "temporary" };
        setValue("temporary", [...current, newFriend]);
        setValue("tempname", '')
    };
    useEffect(() => {
        register("splitMembers", {
            validate: (value) => value.length > 0 || "Please select at least one friend"
        });
    }, [register])

    useEffect(() => {
        setValue("splitMembers", SelectedFriends, { shouldValidate: true });
    }, [SelectedFriends, setValue])
    return (
        <>
            <div className="calculator-inputs flex gap-4 mt-4">
                <Controller
                    control={control}
                    name="expenseName"
                    rules={{
                        required: "Expense Name is required",
                        pattern: { value: NamePattern, message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ," },
                        maxLength: { value: 25, message: "Max 25 characters allowed" },
                        minLength: { value: 3, message: "At least 3 characters" }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <CalculatorInput variant="Expense Name" width={"650px"} type="text"
                                value={field.value}
                                onChange={(e) => {
                                    if (e.target.value.length <= 26) {
                                        field.onChange(e);
                                        trigger("expenseName");
                                    }
                                }}
                                fieldState={fieldState}
                            />
                        </>
                    )} />
                <Controller
                    control={control}
                    name="totalAmount"
                    rules={{
                        required: "Total Amount is required",
                        min: { value: 10, message: "Minimum Amount required is Rs. 10" },
                        max: { value: 1000000, message: "Max 10 lac allowed" },
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <CalculatorInput variant="Total Amount" width={"280px"} type="number"
                                value={field.value}
                                onChange={(e) => {

                                    field.onChange(e);
                                    trigger("totalAmount");

                                }}
                                fieldState={fieldState}
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}

                            />
                        </>
                    )} />
            </div>
            <div className='select-friends-container w-full my-5'>
                <div className='select-friends-container w-full '>
                    <div className='select-friend-option flex items-center justify-between'>
                        <h4 className='text-md font-semibold my-2 '>Select who shares this cost
                        </h4>
                        <div className='center-flex gap-2'>
                            <div className=' w-25 py-2 px-3 bg-neutral-100  rounded-lg  '>
                                <Selectall Selected={SelectedFriends}
                                    setSelected={setSelectedFriends} members={Friends}>
                                    <h5 className='text-[13px] text-text-secondary'>Select all</h5>
                                </Selectall>
                            </div>
                            <Choosef setisPinselected={setisPinselected} />
                        </div>
                    </div>
                    <div className="adding-temporay-friends  h-15 p-2 flex gap-3 ">
                        <Controller
                            control={control}
                            name="tempname"
                            rules={{
                                pattern: { value: NamePattern, message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ," },
                                maxLength: { value: 25, message: "Max 25 characters allowed" },
                                minLength: { value: 3, message: "At least 3 characters" },
                                validate: (value) => {
                                    const current = watch("temporary") || [];
                                    const exists = current.some(
                                        friend => friend.Name.toLowerCase() === value.toLowerCase()
                                    );
                                    return !exists || "Duplicate names are not allowed";
                                }
                            }}

                            render={({ field, fieldState }) => (
                                <>
                                    <Temporaryinput
                                        value={field.value}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 26) {
                                                field.onChange(e);
                                                trigger("tempname");
                                            }
                                        }}
                                    />
                                </>
                            )} />
                        <Addtemp onClick={addTemporaryFriend} />
                    </div>
                    {errors.tempname && <p className='text-red-500 text-sm'>{errors.tempname.message}</p>}
                    <div className='select-friends   mx-auto mt-3  '>
                        <div className="friend-lists  max-h-80 overflow-auto  grid grid-cols-6  gap-3  border-b-light px-2 ">
                            {Friends.map((friend, index) => {
                                return (
                                    <label key={index} className='select-friend rounded-lg shadow-md  bg-neutral-100 flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans h-38'>
                                        <div className="friend-img-container size-16">
                                            {friend.type === "temporary" ? (
                                                <div className="friend-img-container size-16 bg-neutral-300 rounded-full center-flex">
                                                    <IoPerson className='size-7 text-neutral-500' />
                                                </div>
                                            ) : (
                                                <img src={friend.Image} className='Img-c' alt="friend-img" />
                                            )}
                                        </div>
                                        <div className="friend-info center-flex flex-col">
                                            <h2 className='text-sm'>{friend.Name}</h2>
                                            <p className='text-[12px] text-text-secondary'>{
                                                friend.type === "temporary" ? "Temporary Friend" :
                                                    friend.Bio}</p>
                                        </div>
                                        <div className='absolute top-2 right-1'>
                                            <SpliterCheck id={friend.id} setSelected={setSelectedFriends} Selected={SelectedFriends} />
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                        {errors.splitMembers && <p className='text-red-500 text-sm  mt-2'>{errors.splitMembers.message}</p>}
                    </div>
                </div>
            </div>

        </>
    )
}
