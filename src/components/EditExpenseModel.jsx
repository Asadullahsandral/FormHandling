import { useEffect, useState } from "react";
import "./editExpenseModal.css";
import { useDispatch, useSelector } from "react-redux";
import { cancelEdit, updateExpense } from "../Redux/store/expenseSlice";

function EditExpenseModel() {
  const editingExpense = useSelector((state) => state.expense.editingExpense);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState({
    title: "",
    category: "",
    amount: "",
  });
  //   console.log(modalData);

  useEffect(() => {
    if (editingExpense) {
      setModalData(editingExpense);
    }
  }, [editingExpense]);

  if (!editingExpense) return null;

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateExpense(modalData));
    dispatch(cancelEdit());
  };
  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <h2>Edit Expense</h2>
          <form onSubmit={submitHandler}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={modalData.title}
              onChange={inputHandler}
            />
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              value={modalData.category}
              onChange={inputHandler}
            >
              <option value="Grocery">Grocery</option>
              <option value="Clothes">Clothes</option>
              <option value="Bills">Bills</option>
              <option value="Education">Education</option>
              <option value="Medicine">Medicine</option>
            </select>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={modalData.amount}
              onChange={inputHandler}
            />
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => dispatch(cancelEdit())}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="update-btn"
                // onClick={() => dispatch(updateExpense(modalData))}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditExpenseModel;
