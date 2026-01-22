import React from 'react'
import ReactDOM from 'react-dom';
import { MdClose } from "react-icons/md";
export const Basemodel = ({ isOpen, Closemodel, title, children }) => {
    if (!isOpen) return null;
    const modalContent = (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={Closemodel}
        >
            <div
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl  max-w-fit overflow-hidden relative animate-fade-in-up "
                onClick={(e) => e.stopPropagation()}
            > 
                <div className="flex justify-between items-center px-6 pt-6 border-b border-gray-200/50 pb-2">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={Closemodel}
                        className="text-text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                        <MdClose className='size-6 ' />
                    </button>
                </div>
                <div className="p-5 max-h-fit overflow-y-auto pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
    return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
    );
}
