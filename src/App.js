import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./pages/ErrorBoundary";
import BonusTodosPage from "./pages/BonusTodosPage";

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="todo/:id" element={<TodoDetailsPage />} />
        <Route path="/bonus" element={<BonusTodosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;
