// import { useState } from "react";
import "./App.css";
import EditExpenseModel from "./components/EditExpenseModel";
// import expenseData from "../expenseData.js";
import ExpenseForm from "./components/ExpenseForm";
import Expensetable from "./components/Expensetable";

function App() {
  // const [expenses, setExpenses] = useState(expenseData);
  // console.log(expenses);

  return (
    <main>
      <h1>Expense Tracker</h1>
      <div className="expense-tracker">
        <ExpenseForm />
        <Expensetable />
        <EditExpenseModel />
      </div>
    </main>
  );
}

export default App;
