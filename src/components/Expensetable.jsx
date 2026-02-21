import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, editExpenseStart } from "../Redux/store/expenseSlice";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useFilter } from "../Hooks/useFilter";
import ExpenseMenu from "./ExpenseMenu";
import { useState } from "react";

function Expensetable() {
  const [contextMenu, setContextMenu] = useState({});
  const [sortData, setSortData] = useState([]);

  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const { setQuery, filteredData } = useFilter(
    expenses,
    (item) => item.category,
  );

  // const localExpenses = JSON.parse(localStorage.getItem("expenses"));
  // const dataToUse = localExpenses || expenses;
  // console.log(dataToUse);

  // const [category, setCategory] = useState("");

  // const filterCategory = expenses.filter((item) => {
  //   // return category === "" || item.category === category;
  //   // return category ? item.category === category : true;
  //   return item.category.toLowerCase().includes(category.toLowerCase());
  // });

  const sortedExpenses = [...filteredData].sort((a, b) => {
    if (sortData === "asc") {
      return Number(a.amount) - Number(b.amount);
    } else if (sortData === "dsc") {
      return Number(b.amount) - Number(a.amount);
    } else {
      return 0;
    }
  });
  const total = filteredData.reduce(
    (acc, expense) => acc + Number(expense.amount),
    0,
  );
  return (
    <>
      <ExpenseMenu contextMenu={contextMenu} setContextMenu={setContextMenu} />
      <div>
        <table
          className="expense-table"
          onClick={() => contextMenu.left && setContextMenu({})}
        >
          <thead>
            <tr>
              <th style={{ width: "700px" }}>Title</th>
              <th style={{ width: "500px" }}>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                >
                  <option value="">All</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Bills">Bills</option>
                  <option value="Education">Education</option>
                  <option value="Medicine">Medicine</option>
                </select>
              </th>
              <th className="amount-column">
                <div>
                  <span>Amount</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    onClick={() => {
                      setSortData("asc");
                    }}
                  >
                    <title>Ascending</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    onClick={() => {
                      setSortData("dsc");
                    }}
                  >
                    <title>Descending</title>
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </div>
              </th>
              <th>Remove</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense) => {
              return (
                <tr
                  key={expense.id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenu({
                      left: e.clientX,
                      top: e.clientY,
                      expenseId: expense.id,
                      title: expense.title,
                      category: expense.category,
                      amount: expense.amount,
                    });
                  }}
                >
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td
                    style={{
                      cursor: "pointer",
                      color: "red",
                      textAlign: "center",
                    }}
                    onClick={() => dispatch(deleteExpense(expense.id))}
                  >
                    <MdDelete />
                  </td>
                  <td
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textAlign: "center",
                    }}
                    onClick={() => dispatch(editExpenseStart(expense))}
                  >
                    <CiEdit />
                  </td>
                </tr>
              );
            })}
            <tr>
              <th colSpan="2">Total</th>
              <th colSpan="3">Rs.{total}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Expensetable;
