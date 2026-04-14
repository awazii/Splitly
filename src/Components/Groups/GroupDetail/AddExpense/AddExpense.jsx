import React, { useState } from 'react'
import Next from '../../../newexpense/Next';
import Prev from '../../../newexpense/Prev';
import { Stepone } from './Stepone';
import { Steptwo } from './Steptwo';
import { Stepthree } from './Stepthree';
import { GiExpense } from "react-icons/gi";
import { useForm, FormProvider } from 'react-hook-form';
export const Addexpense = () => {
    const [step, setstep] = useState(1);
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            expenseName: "",
            totalAmount: 0,
            Category: "",
            splitMethod: "Equally",
            splitMembers: [],
            MasterMembers: [],
            Share: {
                "Equally": {},
                "Unequally": {},
                "By Percentage": {}
            }
        }
    })
    const { trigger, handleSubmit, getValues, setValue, setError, clearErrors } = methods;
    const handleNext = async () => {
        let isStepValid = false;
        if (step == 1) {
            isStepValid = await trigger(["expenseName", "totalAmount", 'splitMembers', 'Category'])
            if (isStepValid) {
                const selectedFriends = getValues("splitMembers") || [];
                const existingMasterData = getValues("MasterMembers") || [];
                const MasterData = selectedFriends.map(friendId => {
                    const existingfriend = existingMasterData.find(f => f.id === friendId);
                    if (existingfriend) {
                        return existingfriend;
                    }
                    else {
                        return {
                            id: friendId,
                            spent: 0,
                            share: 0
                        }
                    }
                })
                setValue("MasterMembers", MasterData);
            }
        }
        else if (step == 2) {
            const totalAmount = Number(getValues("totalAmount"));
            const Collected = getValues("MasterMembers").reduce((sum, member) => sum + Number(member.spent || 0), 0);
            const difference = Math.abs(totalAmount - Collected);
            if ((Collected !== totalAmount) && (Collected <= totalAmount)) {
                setError("stepTwoTotal", {
                    type: "manual",
                    message: `Off by Rs. ${difference}. Total must be Rs. ${totalAmount}.`
                });
                isStepValid = false;
            }
            else if (Collected > totalAmount) {
                setError("stepTwoTotal", {
                    type: "manual",
                    message: `Amount collected cannot exceed total amount. Reduce by Rs. ${difference}.`
                });
                isStepValid = false;
            }
            else {
                const shareobject = getValues("Share")
                const memberids = getValues("splitMembers")
                const baseshare = Math.floor(totalAmount / memberids.length);
                let reminder = totalAmount % memberids.length;
                memberids.forEach((id, index) => {
                    let finalshare = baseshare
                    if (reminder > 0) {
                        finalshare += 1;
                        reminder -= 1;
                    }
                    shareobject["Equally"][id] = finalshare;
                    shareobject["Unequally"][id] = shareobject["Unequally"][id] || 0;
                    shareobject["By Percentage"][id] = shareobject["By Percentage"][id] || 0;
                })
                setValue("Share", shareobject);
                clearErrors("stepTwoTotal");
                isStepValid = true;
            }
        }
        else if (step == 3) {
            isStepValid = await trigger(["splitMethod", "sharedBy"])
        }
        if (isStepValid) {
            setstep(step + 1);
        }
    }
    const onSubmit = (data) => {
            if (data.splitMethod === "By Percentage") {
                const totalPercent = Object.values(data.Share["By Percentage"] || {})
                    .reduce((sum, val) => sum + Number(val || 0), 0);

                if (totalPercent < 100) {
                    setError("Sharecollected", { message: "Total percentage must equal exactly 100%" });
                    return; 
                }
            }
            if (data.splitMethod === "Unequally") {
                const totalAmount = Object.values(data.Share["Unequally"] || {})
                    .reduce((sum, val) => sum + Number(val || 0), 0);

                if (totalAmount < data.totalAmount) {
                    setError("Sharecollected", { message: "Assigned amounts must equal the total expense" });
                    return; 
                }
            }
            console.log("✅ Submit success", data);
        };
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="Add-expense-form w-250 h-175 card-b rounded-2xl  mx-auto mt-10 py-4 pb-2 px-6 relative">
                <div className="title center-flex flex-col gap-0">
                    <h2 className='text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>Add New Expense<span><GiExpense /></span></h2>
                    <h4 className="text-text-secondary mr-2">Smart Splits, Stress-Free Settlements</h4>
                </div>
                <div className="current-step">
                    {step === 1 ? <Stepone /> : step === 2 ? <Steptwo /> : <Stepthree />}
                </div>
                <div className="progress center-flex flex-col mt-6  absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <h3 className='text-text-secondary'>Step {step} of 3</h3>
                    <div className="progress-bar h-3 bg-highlight rounded-full mt-2 w-60 shadow border-l">
                        <div className={`progress-fill h-full bg-primary ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"} rounded-full trans`}></div>
                    </div>
                </div>
                {
                    step !== 3 && (<button type="button" className="next absolute bottom-4 right-6" onClick={() => handleNext()}>
                        <Next />
                    </button>)
                }
                {
                    step !== 1 && (<button type="button" className="prev absolute bottom-4 left-6" onClick={() => setstep(step - 1)}>
                        <Prev />
                    </button>)
                }
            </form>
        </FormProvider>
    )
}
