import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const BonusTodosPage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState(getTodosFromLocalStorage());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  const openModal = () => {
    setShowModal(true);
    setNewTodo("");
    setEditTodoId(null);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem = {
      id: new Date().getTime(),
      title: newTodo,
      completed: false,
    };
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    setShowModal(false);
  };

  const openEditModal = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoTitle(todo.title);
    setShowModal(true);
  };

  const handleUpdateTodo = () => {
    if (editTodoTitle.trim() === "") return;

    const updatedTodos = todos.map((todo) =>
      todo.id === editTodoId ? { ...todo, title: editTodoTitle } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    setShowModal(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  useEffect(() => {
    const storedTodos = getTodosFromLocalStorage();
    setTodos(storedTodos);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilter = (e) => setFilterStatus(e.target.value);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "completed" && todo.completed) ||
      (filterStatus === "pending" && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate("/")} 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search todos..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg"
          value={filterStatus}
          onChange={handleFilter}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button
          onClick={openModal}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Todo
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {currentTodos.length > 0 ? (
          currentTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 border-b ${
                todo.completed ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                <p className="font-medium">{todo.title}</p>
                <p className="text-sm text-gray-500">
                  Status: {todo.completed ? "Completed" : "Pending"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => openEditModal(todo)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleToggleStatus(todo.id)}
                  className={`${
                    todo.completed ? "text-green-500" : "text-yellow-500"
                  } hover:text-gray-700`}
                >
                  {todo.completed ? "Pending" : "Done"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No todos found.</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="flex items-center justify-center text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">{editTodoId ? "Edit Todo" : "Add Todo"}</h2>
            <input
              type="text"
              value={editTodoId ? editTodoTitle : newTodo}
              onChange={(e) =>
                editTodoId
                  ? setEditTodoTitle(e.target.value)
                  : setNewTodo(e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Enter todo title"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={editTodoId ? handleUpdateTodo : handleAddTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {editTodoId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonusTodosPage;
