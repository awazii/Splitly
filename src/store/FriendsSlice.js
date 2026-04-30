import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { addGroup } from "./GroupSlice"
import { addExpense, selectAllExpenses } from "./ExpenseSlice"
const friendsAdapter = createEntityAdapter()
const initialState = friendsAdapter.getInitialState();
const FriendsSlice = createSlice({
    name: "Friends",
    initialState,
    reducers: {
        addFriend: {
            reducer: (state, action) => {
                const isFirstUser = state.ids.length === 0;
                const finalPayload = isFirstUser
                    ? {
                        ...action.payload,
                        id: "admin_01",
                        status: "Admin",
                        isPinned: true
                    }
                    : action.payload;
                friendsAdapter.addOne(state, finalPayload);
            },
            prepare: (Name, Bio, Image, isPinned) => {
                return {
                    payload: {
                        id: nanoid(),
                        Name,
                        Bio,
                        Image,
                        isPinned,
                        isBanned: false,
                        spendings: 0,
                        netBalance: {
                            total: 0,
                            indicatorid: "settled",
                        },
                        Relationship: [],
                        status: "Member",
                        crews: {
                            groupCount: 0,
                            groups: []
                        },
                        joinedDate: dayjs().format("YYYY-MM-DD")
                    }
                };
            }
        }
        ,
        deleteFriend: friendsAdapter.removeOne,
        updateFriend: friendsAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder.addCase(addGroup, (state, action) => {
            const group = action.payload
            group.Members.forEach(member => {
                let friend = state.entities[member]
                if (friend) {
                    friend.crews.groupCount += 1
                    friend.crews.groups.push(group.id)
                }

            })
        });
        builder.addCase(addExpense, (state, action) => {
            const Expense = action.payload
            if (Expense.Category !== "Settlement") {
                Expense.Members.forEach(member => {
                    let friend = state.entities[member.id]
                    if (friend) {
                        let delta = (Number(member.spent) || 0) - (Number(member.share) || 0)
                        let spendingdelta = Number(member.spent)
                        friend.spendings += spendingdelta
                        friend.netBalance.total += delta
                        if (friend.netBalance.total > 0) {
                            friend.netBalance.indicatorid = "creditor";
                        } else if (friend.netBalance.total < 0) {
                            friend.netBalance.indicatorid = "debtor";
                        } else {
                            friend.netBalance.indicatorid = "settled";
                        }
                    }
                })
            }
            Expense.Settlements.forEach(Settlement => {
                let debtor = state.entities[Settlement.from]
                let creditor = state.entities[Settlement.to]
                debtor.Relationship = debtor.Relationship || []
                creditor.Relationship = creditor.Relationship || []
                debtor
                const relationshipEntry = debtor.Relationship.find(r => r.id === creditor.id)
                const reciprocalEntry = creditor.Relationship.find(r => r.id === debtor.id)
                if (reciprocalEntry) {
                    if (Expense.Category == "Settlement") {
                        reciprocalEntry.netBalance -= Settlement.amount
                    }
                    else {

                        reciprocalEntry.netBalance += Settlement.amount
                    }
                }
                else {
                    creditor.Relationship.push({
                        id: debtor.id,
                        netBalance: Settlement.amount
                    })
                }
                if (relationshipEntry) {
                    if (Expense.Category == "Settlement") {
                        relationshipEntry.netBalance += Settlement.amount
                    }
                    else {
                        relationshipEntry.netBalance -= Settlement.amount
                    }
                }
                else {
                    debtor.Relationship.push({
                        id: creditor.id,
                        netBalance: -Settlement.amount
                    })
                }
            })

        })
    }
});
export const { addFriend, deleteFriend, updateFriend } = FriendsSlice.actions;
export const { selectAll: selectAllFriends, selectById: selectFriendById } = friendsAdapter.getSelectors(state => state.Friends);
export const selectPinnedFriends = createSelector(
    selectAllFriends,
    (friends) => friends.filter(friend => friend.isPinned)
);
export default FriendsSlice.reducer;
