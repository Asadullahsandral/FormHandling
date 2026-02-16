import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenseSlice";
const store = configureStore({
  reducer: {
    expense: expensesReducer,
  },
});

// console.log(store);
// console.log(store.expense);

export default store;
