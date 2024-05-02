import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import Dashboard from "./features/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
