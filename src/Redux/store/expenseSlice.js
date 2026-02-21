import { createSlice } from "@reduxjs/toolkit";
import expenseData from "../../../expenseData";

const initialState = {
  expenses: expenseData,
  editingExpense: null,
  editingExpenseForm: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      // localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload,
      );
      // localStorage.removeItem("expenses");
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
    editExpenseFormStart: (state, action) => {
      state.editingExpenseForm = action.payload;
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
      state.editingExpense = null;
      state.editingExpenseForm = null;
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
  editExpenseFormStart,
} = expenseSlice.actions;

export default expenseSlice.reducer;
