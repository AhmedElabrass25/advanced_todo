import React from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";

const FilterTodos = ({ filterTodosFunc }) => {
  const { todos } = useSelector((state) => state.allTodos);
  const all = todos;
  const personal = todos.filter(
    (todo) => todo.status.toLowerCase() === "personal"
  );
  const business = todos.filter(
    (todo) => todo.status.toLowerCase() === "business"
  );
  const others = todos.filter((todo) => todo.status.toLowerCase() === "others");

  return (
    <section className="w-full mb-5">
      <div className=" flex items-center justify-between">
        {/* ====== filter Head========== */}
        <div className="w-full md:[30%] mb:3 md:mb-0 title flex items-center gap-2">
          <FaFilter className="text-2xl text-mainColor" />
          <h1 className="text-xl font-semibold">Filter Todos</h1>
        </div>
        {/* ====== select filter========== */}
        <div className="w-full md:w-[50%] ">
          <select
            onChange={(e) => filterTodosFunc(e.target.value.toLowerCase())}
            className="w-full border-[3px] border-mainColor/30 text-white text-lg font-semibold rounded-lg block p-2 outline-none bg-mainColor"
          >
            <option value="all" className="bg-[#f7f7f7] text-black">
              All
            </option>
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
      </div>
      {/* ====== Details ========== */}
      <div className="details w-full flex items-center justify-center gap-2 md:gap-5 my-5">
        <span className="text-sm md:text-lg text-[#6c63ff] font-semibold">
          All ( {all.length} )
        </span>
        <span className="text-sm md:text-lg text-green-700 font-semibold">
          Personal ( {personal.length} )
        </span>
        <span className="text-sm md:text-lg text-blue-700 font-semibold">
          Business ( {business.length} )
        </span>
        <span className="text-sm md:text-lg text-red-700 font-semibold">
          Others ( {others.length} )
        </span>
      </div>
    </section>
  );
};

export default FilterTodos;
