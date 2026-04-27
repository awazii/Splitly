import { createSlice, nanoid, createEntityAdapter } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const SpliterAdapter = createEntityAdapter();

const initialState = SpliterAdapter.getInitialState();

const SpliterSlice = createSlice({
  name: "Spliter",
  initialState,
  reducers: {
    addSplit: {
      reducer: SpliterAdapter.addOne,
      prepare: (Name, totalAmount, splitMethod, Members, Category, Settlements, temporary) => {
        return {
          payload: {
            id: nanoid(),
            Name,
            totalAmount,
            splitMethod,
            Members,
            Category,
            Settlements,
            temporary,
            createdDate: dayjs().format("YYYY-MM-DD"),
            Time: dayjs().format("HH:mm:ss"),
          },
        };
      },
    },
    deleteSplit: SpliterAdapter.removeOne,
  },
});

export const { addSplit, deleteSplit } = SpliterSlice.actions;
export const { selectAll: selectAllSplits } = SpliterAdapter.getSelectors(
  (state) => state.Spliter
);
export default SpliterSlice.reducer;
