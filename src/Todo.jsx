import React from "react";
import { completeTodo, removeTodo } from "./redux/todosSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { motion as Motion } from "framer-motion";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
const Todo = ({ todo, setText, setStatus, setIsEdit, setEditId }) => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.allTodos);
  const complete = todos.find((t) => t.id === todo.id)?.complete;
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
        className="w-full flex items-center justify-between flex-wrap mb-5 border-b-[1px] border-mainColor/30 pb-3"
      >
        {/* ========== Category ========= */}
        <div className="w-full mb-2">
          <span
            className={`text-sm font-semibold capitalize
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
        </div>
        {/* ========Todo Text====== */}
        <p className="flex items-center gap-3">
          <span
            className="cursor-pointer"
            onClick={() => {
              dispatch(completeTodo(todo.id));
            }}
          >
            {complete ? (
              <FaRegCircleCheck className="text-2xl text-green-700" />
            ) : (
              <MdRadioButtonUnchecked className="text-2xl" />
            )}
            {/*  */}
          </span>
          <span
            className={`text-[18p] md:text-xl capitalize ${
              complete && "line-through text-gray-500"
            }`}
          >
            {todo?.text.toLowerCase()}{" "}
          </span>
        </p>{" "}
        {/* Todo actions (edit , delete) */}
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
