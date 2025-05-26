import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
function App() {
  return (
    <div className="font-doto  text-black p-6 rounded-md w-screen min-h-screen bg-richblack flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
