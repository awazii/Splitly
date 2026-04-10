import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
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
                        Expenses: 0,
                        statusid: "Active",
                        joinedDate: dayjs().format("YYYY-MM-DD")
                    }
                }
            }
        },
        deleteGroup: GroupsAdapter.removeOne,
        updateGroup: GroupsAdapter.updateOne
    }
});
export const { addGroup, deleteGroup, updateGroup } = GroupsSlice.actions;
export const { selectAll: selectAllGroups, selectById: selectGroupById } = GroupsAdapter.getSelectors(state => state.Groups);
export const selectPinnedGroups = createSelector(
    selectAllGroups,
    (Groups) => Groups.filter(group => group.isPinned)
);
export default GroupsSlice.reducer;