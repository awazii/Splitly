import React, { useState } from 'react'
import { FaCalculator } from "react-icons/fa";
import Next from '../newexpense/Next';
import Prev from '../newexpense/Prev';
import { Stepone } from './Steponec';
import { Steptwo } from './Steptwoc';
import { Stepthree } from './Stepthreec';

export const Spliter = ({allfriends ,setSummary,Summary}) => {
    const [step, setstep] = useState(1);
    const Stepsfunc = (stepnumber) => {
        if (stepnumber >= 1 && stepnumber <= 3) {
            setstep(stepnumber);
        }
    }
    return (  
            <div className="Expense-calculator w-260 h-188 card-b rounded-2xl  mx-auto mt-10 py-4 pb-2 px-6 relative">
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
                    {step === 1 ? <Stepone allfriends={allfriends} /> : step === 2 ? <Steptwo allfriends={allfriends} /> : <Stepthree setSummary={setSummary} Summary={Summary} allfriends={allfriends} />}
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
