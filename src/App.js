import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import Dashboard from "./features/Dashboard/Dashboard";

// due to some issue in github pages have to remove router specific code in this file only
function App() {
  return (
    <div className="App">
      <Dashboard />
      {/* <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<Dashboard />} />
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
