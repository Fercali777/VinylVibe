import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header"; // Correcta importación

import Home from "../pages/Home";
import VinylHunt from "../pages/VinylHunt";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/vinyl-hunt" element={<VinylHunt />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

