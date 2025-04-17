import React from "react";
import { removeTodo } from "./redux/todosSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { motion as Motion } from "framer-motion";
const Todo = ({ todo, setText, setStatus, setIsEdit, setEditId }) => {
  const dispatch = useDispatch();
  // ============ Delete Todo =========
  const deleteTodo = (todoId) => {
    const confirmation = confirm("Are you sure to delete this todo ?");
    if (confirmation) {
      dispatch(removeTodo(todoId));
    }
  };
  // ============ Edit Todo =========
  const editTodo = (todo) => {
    setText(todo?.text);
    setStatus(todo?.status);
  };
  return (
    <>
      <Motion.li
        key={todo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full flex items-center justify-between mb-5 border-b-[1px] border-mainColor/30 pb-3"
      >
        <p>
          <span className="text-[18p] md:text-xl capitalize">
            {todo?.text.toLowerCase()}{" "}
          </span>
          <span
            className={`text-sm text-gray-500 md:font-semibold capitalize
            
            ${
              todo.status === "personal"
                ? "text-green-700 "
                : todo.status === "business"
                ? "text-blue-700"
                : "text-pink-700"
            }`}
          >
            ( {todo?.status} )
          </span>
        </p>{" "}
        <div className="flex items-center gap-4">
          <CiEdit
            onClick={() => {
              setIsEdit(true);
              setEditId(todo?.id);
              editTodo(todo);
            }}
            className="text-2xl cursor-pointer hover:text-orange-600"
          />
          <AiOutlineDelete
            className="text-2xl cursor-pointer hover:text-red-600"
            onClick={() => deleteTodo(todo?.id)}
          />
        </div>
      </Motion.li>
    </>
  );
};

export default Todo;
