import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

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
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {currentTodos.length > 0 ? (
          currentTodos.map((todo) => (
            <Link
              to={`/todo/${todo.id}`}
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
            </Link>
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

      <div className="flex justify-center mt-6">
        <Link
          to="/bonus"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          View Bonus Task Page
        </Link>
      </div>
    </div>
  );
};

export default TodosPage;
