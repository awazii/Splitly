import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UniversalEmptyState = ({ title, description,textsize ,children ,button}) => {
    const Navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-full p-12 pt-6  text-center space-y-4">
            {children}
            <div> 
                <div className={`${children}`}>
                    <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
                  {description &&  <p className={`${textsize} text-gray-500`}>{description}</p>}
                  {button && (
                    <button onClick={() => Navigate("/Friends")} className="mt-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer">Go Back to Friends</button>
                  )}
                </div>
            </div>
                
        </div>
    );
};