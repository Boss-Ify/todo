import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching todo details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!todo) {
    return <p className="text-center text-red-500">Todo not found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
        <p className="text-gray-600">
          Status: {todo.completed ? "Completed" : "Pending"}
        </p>
        <p className="text-gray-600">ID: {todo.id}</p>
      </div>
    </div>
  );
};

export default TodoDetails;
