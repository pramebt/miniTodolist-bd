import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) setTodos(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditValue(todo.text);
  };

  const saveEdit = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editValue } : todo
    );
    setTodos(updated);
    setEditId(null);
    setEditValue("");
    // console.log("update : ",editValue)
    // console.log("id : ",id)
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const getFilteredTodos = () => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "active") return todos.filter((t) => !t.completed);
    
    return todos;
  };

  const filteredTodos = getFilteredTodos();
  
  return (
    <div className="bg-black min-h-screen p-10 flex flex-col items-center">
      <h1 className="text-white text-3xl font-bold mb-8">TODOLIST</h1>

      <div className="bg-white w-full max-w-xl rounded-lg p-6 shadow-md">
        {/* Add todo */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your task..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-4">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-400">No tasks</p>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between border p-3 rounded-md"
              >
                {editId === todo.id ? (
                  <div className="flex w-full gap-2 items-center">
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-2 py-1"
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      title="Save"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      title="Cancel"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => toggleTodo(todo.id)}
                      className={`cursor-pointer flex-1 ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todolist;
