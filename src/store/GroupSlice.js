import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { addExpense  ,selectAllExpenses } from "./ExpenseSlice"
import dayjs from "dayjs";
const GroupsAdapter = createEntityAdapter()
const initialState = GroupsAdapter.getInitialState();
const GroupsSlice = createSlice({
    name: "Groups",
    initialState,
    reducers: {
        addGroup: {
            reducer: GroupsAdapter.addOne,
            prepare: (Name, Category, Members, isPinned) => {
                return {
                    payload: {
                        id: nanoid(),
                        Name,
                        Category,
                        Members,
                        isPinned,
                        statusid: "Active",
                        totalAmount: 0,
                        joinedDate: dayjs().format("YYYY-MM-DD")
                    }
                }
            }
        },
        deleteGroup: GroupsAdapter.removeOne,
        updateGroup: GroupsAdapter.updateOne
    }
    , extraReducers: (builder) => {
        builder.addCase(addExpense , (state, action) => {
            const { Groupid, totalAmount } = action.payload;
            const group = state.entities[Groupid];
            if (group) {
                group.totalAmount = Number(group.totalAmount || 0) + Number(totalAmount || 0);
            }
        });
    }
});
export const { addGroup, deleteGroup, updateGroup } = GroupsSlice.actions;
export const { selectAll: selectAllGroups, selectById: selectGroupById } = GroupsAdapter.getSelectors(state => state.Groups);
export const selectPinnedGroups = createSelector(
    selectAllGroups,
    (Groups) => Groups.filter(group => group.isPinned)
);
export const TopGroup = createSelector(
    selectAllGroups,
    (Groups)=>{
        const sortedGroups= Groups.sort((a,b)=> b.totalAmount-a.totalAmount)
        return sortedGroups[0]    
    }
)
export default GroupsSlice.reducer;