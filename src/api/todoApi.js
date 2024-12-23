const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async (page = 1, limit = 10) => {
  const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
};

export const fetchTodoById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Todo not found");
  return response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Failed to create todo");
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete todo");
};
