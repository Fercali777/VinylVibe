import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

import Home from "../pages/Home";
import VinylHunt from "../pages/VinylHunt";
import Register from "../pages/Register";
import MySpins from "../pages/MySpins";

const AppRoutes = () => {
  return (
    <Router>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vinyl-hunt" element={<VinylHunt />} />
        <Route path="/my-spins" element={<MySpins />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRoutes;

