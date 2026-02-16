import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../Redux/store/expenseSlice";
import Input from "./Input";
import Select from "./Select";

const initialState = {
  title: "",
  category: "",
  amount: "",
  email: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function ExpenseForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});

  const reduxDispatch = useDispatch();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "INPUT", payload: { name, value } });
    // setExpense((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function validate(state) {
    const errorsData = {};
    if (!state.title.trim()) {
      errorsData.title = "Title is required";
    }
    if (!state.category) {
      errorsData.category = "Category is required";
    }
    if (!state.amount || state.amount <= 0) {
      errorsData.amount = "Amount is required and must be greater than zero";
    }
    if (!state.email.trim()) {
      errorsData.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errorsData.email = "Email is invalid";
    }
    setErrors(errorsData);
    return errorsData;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validate(state);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    // if (!state.title || !state.category || !state.amount || !state.email) {
    //   return alert("Please fill all the fields");
    // }
    // console.log(expense);
    // setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }]);//useState
    // setExpenses((prev) => [...prev, { ...state, id: crypto.randomUUID() }]);//useReducer
    // setExpense({
    //   title: "",
    //   category: "",
    //   amount: "",
    // });
    if (!state.title || !state.category || !state.amount || !state.email) {
      return setErrors("Please fill all the fields");
    }
    reduxDispatch(addExpense({ ...state, id: crypto.randomUUID() })); //redux
    dispatch({ type: "RESET" });
  };
  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <Input
        id="title"
        label="Title"
        name="title"
        value={state.title}
        onChange={inputHandler}
        type="text"
        error={errors.title}
      />
      <Select
        id="category"
        label="Category"
        name="category"
        value={state.category}
        onChange={inputHandler}
        error={errors.category}
        defaultOption="Select Category"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />
      <Input
        id="amount"
        label="Amount"
        name="amount"
        value={state.amount}
        onChange={inputHandler}
        type="number"
        error={errors.amount}
      />
      <Input
        id="email"
        label="Email"
        name="email"
        value={state.email}
        onChange={inputHandler}
        type="email"
        error={errors.email}
      />
      <button className="add-btn">Add</button>
    </form>
  );
}

export default ExpenseForm;
