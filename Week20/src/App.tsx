import Board from "./screens/Board";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
