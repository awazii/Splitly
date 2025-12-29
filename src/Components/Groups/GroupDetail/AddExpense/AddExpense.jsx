import React, { useState } from 'react'
import Next from '../../../newexpense/Next';
import Prev from '../../../newexpense/Prev';
import { Stepone } from './Stepone';
import { Steptwo } from './Steptwo';
import { Stepthree } from './Stepthree';
import { GiExpense } from "react-icons/gi";
export const Addexpense = () => {
    const [step, setstep] = useState(1);
    const Stepsfunc = (stepnumber) => {
        if (stepnumber >= 1 && stepnumber <= 3) {
            setstep(stepnumber);
        }
    }
    return (
        <div className="Add-expense-form w-250 h-175 card-b rounded-2xl  mx-auto mt-10 py-4 pb-2 px-6 relative">
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
                step !== 3 && (<button className="next absolute bottom-4 right-6" onClick={() => Stepsfunc(step + 1)}>
                    <Next />
                </button>)
            }
            {
                step !== 1 && (<button className="prev absolute bottom-4 left-6" onClick={() => Stepsfunc(step - 1)}>
                    <Prev />
                </button>)
            }
        </div>
    )
}
