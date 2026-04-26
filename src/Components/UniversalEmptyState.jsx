export const UniversalEmptyState = ({ title, description,textsize ,children }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-12 pt-6  text-center space-y-4">
            {children}
            <div>
                <div className={`${children}`}>
                    <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
                  {description &&  <p className={`${textsize} text-gray-500`}>{description}</p>}
                </div>
            </div>
        </div>
    );
};