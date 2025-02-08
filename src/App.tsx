import { useState, useMemo } from "react";
import "./App.css";
import { useAppSelector } from "./Redux/hook";
import { useDispatch } from "react-redux";
import {
  addTodo,
  clearAll,
  toggleComplete,
  removeTodo,
  setFilter,
} from "./Redux/reducer";

const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    className={`px-4 py-2 rounded-md cursor-pointer w-full ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

function App() {
  const [input, setInput] = useState("");
  const todos = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      filter === "completed"
        ? todo.isCompleted
        : filter === "uncompleted"
        ? !todo.isCompleted
        : true
    );
  }, [todos, filter]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-[#000] border border-[#333] rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-center text-white">
        Todo List
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border border-[#333] focus:outline-none p-2 flex-grow rounded-md text-[#f2f2f2]"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-purple-900 text-white px-4 py-2 rounded-md cursor-pointer font-semibold"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      <ul
        className={`${
          filteredTodos.length ? "border border-[#333]" : ""
        } list-disc pl-5 p-2 rounded-lg`}
      >
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center py-2">
            <div
              className={
                todo.isCompleted ? "line-through text-[#999]" : "text-[#f4f4f4]"
              }
            >
              {todo.text}
            </div>
            <div className="flex gap-x-3">
              <Button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-800 text-white px-2 py-1"
              >
                Remove
              </Button>
              <Button
                onClick={() => dispatch(toggleComplete(todo.id))}
                className={todo.isCompleted ? "bg-green-950" : "bg-green-800"}
              >
                {todo.isCompleted ? "Completed" : "Complete"}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <Button
          onClick={() => dispatch(clearAll())}
          className="bg-indigo-950 text-white mt-4"
        >
          Clear All
        </Button>
      )}

      <div className="mt-3 space-y-2">
        <Button
          onClick={() => dispatch(setFilter("all"))}
          className="border text-white"
        >
          All Todos
        </Button>
        <Button
          onClick={() => dispatch(setFilter("completed"))}
          className="bg-yellow-600 text-white"
        >
          Completed Todos
        </Button>
        <Button
          onClick={() => dispatch(setFilter("uncompleted"))}
          className="bg-orange-600 text-white"
        >
          UnCompleted Todos
        </Button>
      </div>
    </div>
  );
}

export default App;
