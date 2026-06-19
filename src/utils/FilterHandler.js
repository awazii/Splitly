export const FilterHandlers = {
    "All Settled": (result) => result.filter(r => r.netBalance.total === 0),
    "Positive Balance": (result) => result.filter(r => r.netBalance.total > 0),
   "Negative Balance": (result) => result.filter(r => r.netBalance.total < 0),
    "Active": (result) => result.filter(r=>r.statusid==="Active"),
    "Freeze": (result) => result.filter(r=>r.statusid==="Freeze"),
    "By Group": (result, groupId) => result.filter(r=>r.Groupid === groupId),
    "By Category": (result, category) => result.filter(r=>r.Category === category),
};