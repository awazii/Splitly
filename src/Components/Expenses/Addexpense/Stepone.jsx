import React, { useEffect, useState } from 'react'
import CalculatorInput from '../Common/addcalinput';
import Expensecheck from '../../Groups/Common/gcheck';
import Selectall from '../../Common/Selectall';
import Categories from "../Common/expensecategories"
import { useParams } from 'react-router-dom';
import { selectGroupById } from '../../../store/GroupSlice';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { useSelector } from 'react-redux';
import { useFormContext, Controller } from 'react-hook-form';
export const Stepone = () => {
    const { Groupid } = useParams();
    const currentGroup = useSelector(state => selectGroupById(state, Groupid))
    const allFriends = useSelector(selectAllFriends)
    const Groupmembers = allFriends.filter(friend => currentGroup.Members.includes(friend.id))
    const { control, register, setValue, trigger, getValues ,formState: { errors } } = useFormContext();
   const ExpenseNamePattern = /^[A-Za-z][A-Za-z0-9\s,._&'-]*$/;
    const CurrentExpensemembers = getValues("splitMembers");
    const [SelectedFriends, setSelectedFriends] = useState(CurrentExpensemembers);
    useEffect(() => {
        register("splitMembers", {
            validate: (value) => value.length > 0 || "Please select at least one friend"
        });
    }, [register])

    useEffect(() => {
        setValue("splitMembers", SelectedFriends, { shouldValidate: true });
    }, [SelectedFriends,setValue])
    return (
        <>
            <div className="calculator-inputs flex gap-4 mt-4">
                <Controller
                    control={control}
                    name="expenseName"
                    rules={{
                        required: "Expense Name is required",
                        pattern: { value: ExpenseNamePattern, message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ," },
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
            <div className="Select-categories mt-6 space-y-3">
                <h4 className='text-md font-semibold my-3'>Choose Category</h4>
                <Controller
                    name="Category"
                    control={control}
                    rules={{ required: "Please select a category" }}
                    render={({ field, fieldState }) => (
                        <>
                            <Categories
                                start={0}
                                end={4}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    trigger("Category");
                                }}
                            />
                            <Categories
                                start={4}
                                end={7}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    trigger("Category");
                                }}
                            />
                            {fieldState.error && (
                                <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
            <div className='select-friends-container w-full my-5'>
                <div className='select-friends-container w-full '>
                    <div className='select-friend-option flex items-center justify-between'>
                        <h4 className='text-md font-semibold my-2 '>Select who shares this cost        </h4>
                           {errors.splitMembers && <p className='text-red-500 text-sm  mt-2'>{errors.splitMembers.message}</p>}
                        <div className='center-flex gap-2'>
                            <div className=' w-25 py-2 px-3 bg-highlight  rounded-lg  '>
                                <Selectall Selected={SelectedFriends}
                                    setSelected={setSelectedFriends} members={Groupmembers}>
                                    <h5 className='text-[13px] text-text-secondary'>Select all</h5>
                                </Selectall>
                            </div>
                        </div>
                    </div>
                    <div className='select-friends mx-auto mt-3'>  
                   <div className="friend-lists h-60 overflow-auto  grid grid-cols-6  gap-3  border-b-light px-2 border-l p-2 ">
                        {Groupmembers.map((friend, index) => {
                            return (<label key={index} className='select-friend rounded-lg shadow-md  bg-highlight flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans h-38'>
                                <div className="friend-img-container size-16">
                                    <img src={friend.Image} className='Img-c' alt="friend-img" />
                                </div>
                                <div className="friend-info center-flex flex-col">
                                    <h2 className='text-sm'>{friend.Name}</h2>
                                    <p className='text-[12px] text-text-secondary'>
                                        {friend.Bio}</p>
                                </div>
                                <div className='absolute top-2 right-1'>
                                    <Expensecheck id={friend.id} setSelected={setSelectedFriends} Selected={SelectedFriends}  />
                                </div>
                            </label>
                            )
                        })}
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}
