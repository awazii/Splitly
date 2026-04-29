import React, { useState, useEffect } from 'react'
import { FaCalculator } from "react-icons/fa";
import Next from '../../Expenses/Common/Next';
import Prev from '../../Expenses/Common/Prev';
import { Stepone } from './Steponec';
import { Steptwo } from './Steptwoc';
import { Stepthree } from './Stepthreec';
import { useForm, FormProvider, } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { handleNext } from '../../Expenses/Addexpense/AddExpense';
import { addSplit } from '../../../store/SpliterSlice';
import { aggregatesettlements } from '../../../store/ExpenseSlice';
import { motion, AnimatePresence } from 'framer-motion';
export const Spliter = () => {
    const [step, setstep] = useState(1);
    const dispatch = useDispatch()
    const Stepsfunc = (stepnumber) => {
        if (stepnumber >= 1 && stepnumber <= 3) {
            setstep(stepnumber);
        }
    }
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            expenseName: "",
            tempname: "",
            totalAmount: "",
            splitMethod: "Equally",
            temporary: [],
            splitMembers: [],
            MasterMembers: [],
            Share: {
                "Equally": {},
                "Unequally": {},
                "By Percentage": {}
            }
        }
    })
    const { trigger, handleSubmit, register, getValues, setValue, setError, clearErrors, reset, formState: { isSubmitting } } = methods;
    const onSubmit = async (data) => {
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
        const finalmembers = data.MasterMembers.map(member => {
            const share = data.Share[data.splitMethod][member.id] || 0;
            if (data.splitMethod === "By Percentage") {
                return {
                    ...member,
                    share: Math.round((share / 100) * data.totalAmount)
                }
            }
            return {
                ...member,
                share: share
            }
        }
        )
        await new Promise(resolve => setTimeout(resolve, 2000));
        dispatch(addSplit(
            data.expenseName,
            data.totalAmount,
            data.splitMethod,
            finalmembers,
            data.Category,
            aggregatesettlements(finalmembers),
            data.temporary
        ))
        reset();
        setstep(1);
    }
    return (
        <FormProvider {...methods}>
            <motion.form
                layout
                onSubmit={handleSubmit(onSubmit)} className=" w-260 h-188 bg-white shadow-md rounded-2xl  mx-auto mt-10 py-4 pb-2 px-6 relative">
                <div className="header  center-flex flex-col gap-1">
                    <div className="logo rounded-full size-18 center-flex" style={{
                        background: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)"
                    }}>
                        <FaCalculator className='size-7 text-white' />
                    </div>
                    <h2 className='text-xl font-semibold'>Quick Split</h2>
                    <p className='text-text-secondary text-sm'>Split Bills instantly without a group</p>
                </div>
                <div className="current-step">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Stepone />
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Steptwo />
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Stepthree />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="progress center-flex flex-col mt-6  absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <h3 className='text-text-secondary'>Step {step} of 3</h3>
                    <div className="progress-bar h-3 bg-highlight rounded-full mt-2 w-60 shadow border-l">
                        <div className={`progress-fill h-full bg-primary ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"} rounded-full trans`}></div>
                    </div>
                </div>
                {
                    step !== 3 && (<button type='button' className="next absolute bottom-4 right-6" onClick={() => handleNext(step, setstep, methods)}>
                        <Next />
                    </button>)
                }
                {
                    step !== 1 && (<button type='button' className="prev absolute bottom-4 left-6" onClick={() => {
                        if (!isSubmitting) {
                            setstep(step - 1)
                        }
                    }}>
                        <Prev />
                    </button>)
                }
            </motion.form>
        </FormProvider>
    )
}
