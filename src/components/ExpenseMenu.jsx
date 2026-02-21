import { useDispatch } from "react-redux";
import {
  deleteExpense,
  editExpenseFormStart,
} from "../Redux/store/expenseSlice";

function ExpenseMenu({ contextMenu, setContextMenu }) {
  const { expenseId, title, category, amount } = contextMenu;

  const dispatch = useDispatch();

  if (!contextMenu.left) {
    return null;
  }
  return (
    <div
      className="context-menu"
      style={{
        left: contextMenu.left,
        top: contextMenu.top,
      }}
    >
      <div
        onClick={() => {
          dispatch(
            editExpenseFormStart({ id: expenseId, title, category, amount }),
          );
          setContextMenu({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          dispatch(deleteExpense(expenseId));
          setContextMenu({});
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ExpenseMenu;
