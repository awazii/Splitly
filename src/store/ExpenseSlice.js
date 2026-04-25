import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { CategoryColors } from "../pages/dashboard/Analystic";
const ExpensesAdapter = createEntityAdapter( {
        sortComparer:(a,b)=> b.Time - a.Time
    })
const initialState = ExpensesAdapter.getInitialState(  
);
const ExpenseSlice = createSlice({
    name: "Expenses",
    initialState,
    reducers: {
        addExpense: {
            reducer: ExpensesAdapter.addOne,
            prepare: (Groupid, Name, totalAmount, splitMethod, Members, Category, Settlements) => {
                const expense = {
                    id: nanoid(),
                    Groupid,
                    Name,
                    totalAmount,
                    splitMethod,
                    Members,
                    Category,
                    Settlements,
                    createdDate: dayjs().format("YYYY-MM-DD"),
                    Time: dayjs().format("HH:mm:ss")
                }
                return {
                    payload: {
                        ...expense,
                    }
                }
            }
        },
        updateExpense: ExpensesAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state, action) => {
            const incoming = action.payload?.Expenses;
            if (incoming?.entities) {
                Object.values(incoming.entities).forEach(expense => {
                    if (expense.Settelments && !expense.Settlements) {
                        expense.Settlements = expense.Settelments;
                        delete expense.Settelments;
                    }
                });
            }
        });
    }

});
export const { addExpense, updateExpense } = ExpenseSlice.actions;
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
        const CategoryData = expenses.filter(r=>r.Category!=="Settlement")
        CategoryData.forEach(expense => {
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
export function aggregatesettlements(Members) {
    let balances = {}
    Members.forEach(member => {
        if (!balances[member.id]) {
            balances[member.id] = 0
        }
        balances[member.id] = (Number(member.spent) || 0) - (Number(member.share) || 0)
    })
    let debtors = []
    let creditors = []
    Object.keys(balances).forEach(id => {
        const netBalance = Math.round(balances[id]);
        if (netBalance < 0) {
            debtors.push({ id, amount: Math.abs(netBalance) });
        } else if
            (netBalance > 0) {
            creditors.push({ id, amount: netBalance });
        }
    });
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);
    const Settlements = [];
    while (debtors.length > 0 && creditors.length > 0) {
        const currentDebtor = debtors[0];
        const currentCreditor = creditors[0];
        const settlementAmount = Math.min(currentDebtor.amount, currentCreditor.amount);
        Settlements.push({
            from: currentDebtor.id,
            to: currentCreditor.id,
            amount: settlementAmount
        });
        currentDebtor.amount -= settlementAmount;
        currentCreditor.amount -= settlementAmount;
        if (currentDebtor.amount === 0) debtors.shift();
        if (currentCreditor.amount === 0) creditors.shift();
    }
    return Settlements
}
export const MingleExpenses = createSelector(
    [selectAllExpenses,  (state, CurrentFriend, Currentbalancewith) => CurrentFriend.id,
    (state, CurrentFriend, Currentbalancewith) => Currentbalancewith],
    (expenses, CurrentFriend, Currentbalancewith ) => expenses.filter(e=> e.Settlements.some(s =>
        (s.from === CurrentFriend && s.to === Currentbalancewith) ||
        (s.from === Currentbalancewith && s.to === CurrentFriend)
    )
    )
)
export default ExpenseSlice.reducer;