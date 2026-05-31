import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi2";
export const FilterHeader = ({ Sorts, Filters, ActiveSort , type }) => {
    const [activeFilter, setActiveFilter] = useState("");
    const [activeSort, setActiveSort] = useState(ActiveSort);
     const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] =
        useState("Choose option");
    const options = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
        "Option 6",
    ];
    return (
        <div className="w-[430px] rounded-[32px] max-h-120 bg-surface p-6 shadow-xl border border-[#ececec]">
            <div>
                <p className="mb-2 text-sm text-text-secondary">
                    How should we organize your list?
                </p>
            </div>

            <div className="Sort border-b-light border-t mb-3">
                <p className="my-1 text-sm text-[#8a8a8a]">
                    Sort Options
                </p>

                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                    {Sorts.map((Sort) => {
                        const isActive = activeSort === Sort.label;

                        return (
                            <button
                                key={Sort.label}
                                onClick={() => setActiveSort(Sort.label)}
                                className={`flex items-center justify-between rounded-2xl border bg-white px-3 py-3 shadow-md text-sm font-medium transition-all cursor-pointer ${isActive
                                    ? "border-[#ff7a3d] text-[#ff7a3d]"
                                    : "border-[#ebebeb] text-[#555] hover:border-[#ff7a3d]"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {Sort.icon}
                                    {Sort.label}
                                </div>

                                {isActive && (
                                    <IoCheckmark size={16} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="filters border-b-light border-t">
                <p className="my-1 text-sm text-[#8a8a8a]">
                    Filter Options
                </p>

                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                    {Filters.map((filter) => {
                        const isActive =
                            activeFilter === filter.label;

                        return (
                            <button
                                key={filter.label}
                                onClick={() => {
                                    if (isActive) {
                                        setActiveFilter("")
                                        isActive = false;
                                        return
                                    }
                                    setActiveFilter(filter.label)
                                }
                                }
                                className={`flex items-center justify-between rounded-2xl border bg-white px-3 py-3 shadow-md text-sm font-medium transition-all ${isActive
                                    ? "border-[#ff7a3d] text-[#ff7a3d]"
                                    : "border-[#ebebeb] text-[#555] hover:border-[#ff7a3d] cursor-pointer"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {filter.icon}
                                    {filter.label}
                                </div>

                                {isActive && (
                                    <IoCheckmark size={16} />
                                )}
                            </button>
                        );
                    })}
                </div>
            {(type === "expense" && activeFilter) && ( <div className="mt-4">
                    <label className="mb-2 block text-sm text-[#8a8a8a]">
                        Selected Filter Option
                    </label>
                    <div className="relative w-full">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex w-full items-center justify-between rounded-2xl border border-[#ebebeb] bg-white px-4 py-3 text-sm text-[#555] shadow-md transition-all hover:border-[#ff7a3d] cursor-pointer"
                        >
                            <span>{selectedOption}</span>

                            <HiChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute left-0 z-50  w-full h-25 overflow-y-auto rounded-2xl border border-[#ebebeb] bg-white p-2 shadow-xl mt-1">
                                {options.map((option) => {
                                    const isSelected =
                                        selectedOption === option;

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSelectedOption(
                                                    option
                                                );

                                                setIsOpen(false);
                                            }}
                                            className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition-all cursor-pointer ${isSelected
                                                    ? "bg-[#fff2eb] text-[#ff7a3d]"
                                                    : "text-[#555] hover:bg-[#f8f8f8]"
                                                }`}
                                        >
                                            <span>{option}</span>

                                            {isSelected && (
                                                <IoCheckmark
                                                    size={16}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>)}
            </div>

            <div className="center-flex">
                <button className="mt-5 w-50 rounded-2xl bg-[#ff7a3d] py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 cursor-pointer">
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

