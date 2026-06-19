import {
    HiTag,
    HiCurrencyDollar,
    HiBarsArrowDown,
    HiBarsArrowUp,
    HiArrowTrendingUp,
    HiArrowTrendingDown,
    HiCheckBadge,
    HiUsers,
    HiFire,
} from "react-icons/hi2";
import { TbSnowflake } from "react-icons/tb";
import { MdGroups2 } from "react-icons/md";
export let SortIcons = {
    "New to Old": (<HiBarsArrowDown
        size={18}
        className="text-[#3b82f6]"
    />),
    "Old to New": (<HiBarsArrowUp
        size={18}
        className="text-[#a855f7]"
    />),
    "Most Expenses": (<HiCurrencyDollar
        size={18}
        className="text-[#f59e0b]"
    />),
    "Most Members":( <HiUsers
        size={18}
        className="text-[#06b6d4]"
    />)
}
export let FilterIcons = {
    "All Settled":( <HiCheckBadge
        size={18}
        className="text-[#9ca3af]"
    />),
    "Positive Balance": (<HiArrowTrendingUp
        size={18}
        className="text-[#22c55e]"
    />),
    "Negative Balance":( <HiArrowTrendingDown
        size={18}
        className="text-[#ef4444]"
    />),
    "Active":( <HiFire
        size={18}
        className="text-[#f97316]"
    />),
    "Freeze":( <TbSnowflake
        size={18}
        className="text-[#0369A1]"
    />),
    "By Group": (<MdGroups2
        size={18}
        className="text-[#8b5cf6]"
    />),
    "By Category": (<HiTag
        size={18}
        className="text-[#ec4899]"
    />)
}