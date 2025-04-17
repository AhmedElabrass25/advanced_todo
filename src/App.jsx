import React, { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  clearTodos,
  filterTodos,
  updateTodo,
} from "./redux/todosSlice";
import Todo from "./Todo";
import { AnimatePresence, motion as Motion } from "framer-motion";
import FilterTodos from "./FilterTodos";

const App = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState("");
  const { tasksFilter } = useSelector((status) => status.allTodos);
  const dispatch = useDispatch();
  // ======= Handle Form =======
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "" && status !== "categories" && status !== "") {
      if (isEdit) {
        dispatch(updateTodo({ text, status, editId }));
        setIsEdit(false);
      } else {
        dispatch(addTodo({ text, status }));
      }
      setStatus("");
      setText("");
    } else {
      alert("please enter your todo or select your category !");
    }
  };
  // ======= Remove All Todos =======
  const removeAllTodos = () => {
    const confirmation = confirm("Are you sure to delete all todos ? ");
    if (confirmation) {
      dispatch(clearTodos());
    }
  };
  // ============Filter Todos========
  const filterTodosFunc = (filterTodo) => {
    dispatch(filterTodos(filterTodo));
  };
  useEffect(() => {
    dispatch(filterTodos("all"));
  }, []);
  return (
    <section className="my-10">
      <div className="container flex items-center justify-center">
        <div className="row w-full md:w-[700px] border border-mainColor/10 py-5 px-3 rounded-lg">
          {/* ========= Head Of Todo ================ */}
          <div className="title mb-5 flex items-center gap-2">
            <IoMdCheckmarkCircleOutline className="text-2xl text-mainColor" />
            <h1 className="text-xl font-semibold">Todo App</h1>
          </div>
          {/* ========= Form ================ */}
          <Motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="w-full mb-3"
          >
            {/* ===== Input & select ========= */}
            <div className="w-full flex items-center justify-between mb-3">
              <input
                value={text}
                placeholder="Add a new todo..."
                onChange={(e) => setText(e.target.value)}
                className="w-[65%] px-2 md:px-4 py-2 rounded-lg outline-mainColor text-black border-[3px] border-mainColor/30"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-[30%] border-[3px] border-mainColor/30 text-white text-lg font-semibold rounded-lg block px-2 py-2 outline-none bg-mainColor"
              >
                <option default>Categories</option>
                <option className="bg-[#f7f7f7] text-black" value="personal">
                  Personal
                </option>
                <option className="bg-[#f7f7f7] text-black" value="business">
                  Business
                </option>
                <option className="bg-[#f7f7f7] text-black" value="others">
                  Others
                </option>
              </select>
            </div>
            {/* ======= Submit Button ======== */}
            <button
              className="w-full px-6 py-2 bg-mainColor uppercase text-white font-semibold rounded-lg border-[3px] border-mainColor/30"
              type="submit"
            >
              {isEdit ? "Edit" : "ADD"}
            </button>
          </Motion.form>
          {/* Filter Todos */}
          <FilterTodos filterTodosFunc={filterTodosFunc} />
          {/* ========== All Todos content (ul) ========== */}
          <AnimatePresence>
            <ul className="p-5 rounded-lg border-[1px] border-mainColor/20 shadow-md mb-6 max-h-[500px] overflow-y-auto">
              {tasksFilter?.length > 0 ? (
                tasksFilter?.map((todo) => {
                  return (
                    <Todo
                      key={todo?.id}
                      todo={todo}
                      setEditId={setEditId}
                      setStatus={setStatus}
                      setText={setText}
                      setIsEdit={setIsEdit}
                    />
                  );
                })
              ) : (
                <Motion.li className="text-xl w-full text-center">
                  Your todo list is empty !
                </Motion.li>
              )}
            </ul>
          </AnimatePresence>
          {/* =========== Delete all todos ========= */}
          {tasksFilter?.length > 0 && (
            <div className="w-full flex items-center justify-center mb-5">
              <button
                onClick={removeAllTodos}
                className="w-fit px-6 py-2 bg-mainColor uppercase text-white font-semibold rounded-lg border-[3px] border-mainColor/30"
              >
                Remove All todos
              </button>
            </div>
          )}
          {/* =========  Footer ==============*/}
          <p className="w-full text-center font-semibold text-gray-700">
            Copyright All Reserved Rights 2025 ©ahmedEl
          </p>
        </div>
      </div>
    </section>
  );
};

export default App;
