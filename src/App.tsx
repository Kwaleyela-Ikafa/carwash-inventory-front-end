import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormEntry from "./components/FormEntry";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import CarWashManagement from "./components/CarWashManagement";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<FormEntry />} />
          <Route path="/library" element={<CarWashManagement />} />
        </Routes>
    </Router>
  );
}

export default App;
