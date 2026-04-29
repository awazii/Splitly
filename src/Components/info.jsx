import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCamera, HiArrowRight, HiCheck } from "react-icons/hi2";
import { FaHandshake } from "react-icons/fa6";
import { RiLineChartLine } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { RiHandCoinLine } from "react-icons/ri";
export const SplitlyOnboarding = ({ onFinish }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        image: null
    });

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: URL.createObjectURL(file) });
        }
    };

    const nextStep = () => setStep((s) => s + 1);

const steps = [
    { 
        id: 'profile', 
        indicator: 'bg-[#FFB399]', 
        hover: 'hover:bg-[#ff9c7a]'
    }, 
    {
        title: "Connect with Friends",
        desc: "Everything in Splitly starts with your circle. Add friends individually or create groups for hostel expenses and trips.",
        icon: FaHandshake,
        gradient: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white",
        indicator: 'bg-blue-500',
        hover: 'hover:bg-blue-600'
    },
    {
        title: "Track Live Expenses",
        desc: "No more manual math. Every expense you add updates everyone's balance instantly with live graphs and history.",
        icon: RiLineChartLine,
        gradient: "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white",
        indicator: 'bg-green-500',
        hover: 'hover:bg-green-600'
    },
    {
        title: "Settle Debts Instantly",
        desc: "Pay back your friends with one click. Every settlement instantly updates your local balance with that friend and your global net total.",
        icon: RiHandCoinLine,
        gradient: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
        indicator: 'bg-red-500',
        hover: 'hover:bg-red-600'
    },
    {
        title: "Quick Temporary Splits",
        desc: "Use the 'Spliter' for one-time calculations that don't need a group. Perfect for quick cafe visits or one-off bills.",
        icon: FaCalculator,
        gradient: "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white",
        indicator: 'bg-purple-500',
        hover: 'hover:bg-purple-600'
    },
];

    const Geticon = (obj) => {
        const Icon = obj.icon
        return <Icon className="size-10 text-white" />
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface p-4 font-sans">
            <motion.div
                layout
                className="relative w-full max-w-md overflow-hidden bg-white rounded-[2.5rem] shadow-2xl shadow-gray-300"
            >
                <div className="p-8 md:p-10">
                    <AnimatePresence mode="wait">
                        {step === 0 ? (<motion.div
                            key="profile-setup"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-3xl font-bold
                             text-gray-900 mb-2">Who are you?</h2>
                            <p className="text-text-secondary mb-8">Set up your profile to start splitting.</p>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="relative group cursor-pointer mb-8"
                            >
                                <div className="size-32 rounded-full bg-neutral-50 border-2 border-dashed border-neutral-300 group flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                                    {formData.image ? (
                                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <HiCamera className="text-4xl text-neutral-300 group-hover:text-primary" />
                                    )}
                                </div>
                                <div className="absolute bottom-1 right-1 p-2 bg-primary rounded-full text-white shadow-lg">
                                    <HiCheck className="size-4" />
                                </div>
                                <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                            </div>

                            <div className="w-full space-y-4">
                                <input
                                    type="text"
                                    placeholder="Display Name"
                                    className="w-full p-4 border-l rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    placeholder="Bio (What's your vibe?)"
                                    className="w-full p-4 border-l  font-medium rounded-2xl focus:ring-2 focus:ring-primary  outline-none transition-all  resize-none"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>

                            <button
                                disabled={!formData.name}
                                onClick={nextStep}
                                className={`w-full mt-8 p-4 bg-primary cursor-pointer hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50`}
                            >
                                Next <HiArrowRight />
                            </button>
                        </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center"
                            >
                                <div className={`size-24 rounded-3xl flex ${steps[step]?.gradient} items-center justify-center text-5xl mx-auto mb-8 shadow-inner`} >
                                    {Geticon(steps[step])}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[step].title}</h2>
                                <p className="text-text-secondary leading-relaxed px-2 mb-10">
                                    {steps[step].desc}
                                </p>

                                <button
                                    onClick={step === steps.length - 1 ? onFinish : nextStep}
                                    className={`w-full p-4  text-white font-bold rounded-2xl flex items-center justify-center gap-2 ${steps[step].hover} transition-colors cursor-pointer ${steps[step].indicator}`}
                                >
                                    {step === steps.length - 1 ? "Get Started" : "Continue"} <HiArrowRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-center gap-2 mt-10">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? `w-10 ${steps[step].indicator}` : 'w-2 bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};