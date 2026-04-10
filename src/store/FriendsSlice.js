import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const adminId = "admin_01";
const friendsAdapter = createEntityAdapter()
const initialState = friendsAdapter.getInitialState({
    ids: [adminId],
    entities: {
        [adminId]: {
            id: adminId,
            Name: "Awais",
            Bio: "Full Stack Developer",
            Image: "https://res.cloudinary.com/dllocncsk/image/upload/v1774531405/glrkslojmpugzrwes3a6.jpg",
            isPinned: true,
            spendings: 0,
            netBalance: {
                total: 0,
                indicatorid: "settled",
                details: [
                    {
                        friendId: null,
                        amount: 0,
                        TransactionIds: [],
                        indicatorid: null,
                    }
                ]
            },
            status: "Admin",
            crews: {
                groupCount: 0,
                groups: []
            },
            joinedDate: dayjs().format("YYYY-MM-DD")
        }
    }
});
const FriendsSlice = createSlice({
    name: "Friends",
    initialState,
    reducers: {
        addFriend: {
            reducer: friendsAdapter.addOne,
            prepare: (Name, Bio, Image, isPinned) => {
                return {
                    payload: {
                        id: nanoid(),
                        Name,
                        Bio,
                        Image,
                        isPinned,
                        spendings: 0,
                        netBalance: {
                            total: 0,
                            indicatorid: "settled",
                            details: [
                                {
                                    friendId: null,
                                    amount: 0,
                                    TransactionIds: [],
                                    indicatorid: null,
                                }
                            ]
                        },
                        status: "Member",
                        crews: {
                            groupCount: 0,
                            groups: []
                        },
                        joinedDate: dayjs().format("YYYY-MM-DD")
                    }
                }
            }
        },
        deleteFriend: friendsAdapter.removeOne,
        updateFriend: friendsAdapter.updateOne
    }
});
export const { addFriend, deleteFriend, updateFriend } = FriendsSlice.actions;
export const { selectAll: selectAllFriends, selectById: selectFriendById } = friendsAdapter.getSelectors(state => state.Friends);
export const selectPinnedFriends = createSelector(
    selectAllFriends,
    (friends) => friends.filter(friend => friend.isPinned)
);
export default FriendsSlice.reducer;