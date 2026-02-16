import { createSlice } from "@reduxjs/toolkit";
import expenseData from "../../../expenseData";

const initialState = {
  expenses: expenseData,
  editingExpense: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload,
      );
    },
    // editExpense: (state, action) => {
    //   const { id, title, category, amount } = action.payload;
    //   const existingExpense = state.expenses.find((item) => item.id === id);
    //   if (existingExpense) {
    //     existingExpense.title = title;
    //     existingExpense.category = category;
    //     existingExpense.amount = amount;
    //   }
    // },
    editExpenseStart: (state, action) => {
      state.editingExpense = action.payload;
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (item) => item.id === action.payload.id,
      );
      // console.log(index);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
      // state.editingExpense = null;
    },
    cancelEdit: (state) => {
      state.editingExpense = null;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  editExpenseStart,
  updateExpense,
  cancelEdit,
} = expenseSlice.actions;

export default expenseSlice.reducer;
