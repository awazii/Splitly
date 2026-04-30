import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewUser: true, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNewUser: (state, action) => {
      state.isNewUser = action.payload;
    },
  },
});

export const { setNewUser } = userSlice.actions;
export const selectIsNewUser = (state) => state.user.isNewUser;
export default userSlice.reducer;
