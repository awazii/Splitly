import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { CategoryColors } from "../Components/dashboard/Analystic";
const ExpensesAdapter = createEntityAdapter()
const initialState = ExpensesAdapter.getInitialState();
const ExpenseSlice = createSlice({
    name: "Expenses",
    initialState,
    reducers: {
        addExpense: {
            reducer: ExpensesAdapter.addOne,
            prepare: (Groupid, Name, totalAmount, splitMethod, Members, Category) => {
                return {
                    payload: {
                        id: nanoid(),
                        Groupid,
                        Name,
                        totalAmount,
                        splitMethod,
                        Members,
                        Category,
                        createdDate: dayjs().format("YYYY-MM-DD")
                    }
                }
            }
        },
    }

});
export const { addExpense } = ExpenseSlice.actions;
export const { selectAll: selectAllExpenses, selectById: selectExpenseById } = ExpensesAdapter.getSelectors(state => state.Expenses);
export const HighestContributors = createSelector(
    selectExpenseById,
    (expense) => {
        if (!expense) return [];
        const sortedMembers = [...expense.Members].sort((a, b) => (Number(b.spent) || 0) - (Number(a.spent) || 0));
        return sortedMembers.slice(0, 1);
    }
);
export const GroupExpenses = createSelector(
    [selectAllExpenses, (state, groupId) => groupId],
    (expenses, groupId) => expenses.filter(expense => expense.Groupid === groupId)
);
export const GroupTotalExpenses = createSelector(
    GroupExpenses,
    (groupExpenses) => groupExpenses.reduce((total, expense) => total + Number(expense.totalAmount || 0), 0)
);
export const TotalExpenses = createSelector(
    selectAllExpenses,
    (expenses) => expenses.reduce((total, expense) => total + Number(expense.totalAmount || 0), 0)
)
function aggregateFriendSpendings(expenses) {
    const map = new Map();
    expenses.forEach(expense => {
        expense.Members.forEach(member => {
            const current = map.get(member.id);
            if (current) {
                current.spent += Number(member.spent);
                current.share += Number(member.share);
            } else {
                map.set(member.id, {
                    id: member.id,
                    spent: Number(member.spent),
                    share: Number(member.share)
                });
            }
        });
    });
    return Array.from(map.values());
}
export const FriendsGroupSpendings = createSelector(
    [GroupExpenses],
    (expenses) => aggregateFriendSpendings(expenses)

);
export const FriendsSpendings = createSelector(
    selectAllExpenses,
    (expenses) => aggregateFriendSpendings(expenses)
)
export const FriendGroupSpendings = createSelector(
    [FriendsGroupSpendings, (state, Groupid, friendId) => friendId],
    (expenses, friendId) => expenses.find(e => e.id === friendId)
);
export const ExpenseAnalystics = createSelector(
    selectAllExpenses,
    (expenses) => {
        const map = new Map();

        expenses.forEach(expense => {
            const key = expense.Category;
            const current = map.get(key);

            if (current) {
                current.count += 1;
                current.amount += Number(expense.totalAmount);
            } else {
                map.set(key, {
                    name: key,
                    amount: Number(expense.totalAmount),
                    count: 1,
                    fill: CategoryColors[key]?.fill || "#ccc"
                });
            }
        });

        return Array.from(map.values());
    }
);

export default ExpenseSlice.reducer;