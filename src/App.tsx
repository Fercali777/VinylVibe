
import { BrowserRouter as Router, Routes, Route } from "react-router"; // Usa react-router-dom
import AppRoutes from "./routes/AppRoutes";
import Home from "./pages/Home";
import VinylHunt from "./pages/VinylHunt";
import Register from "./pages/Register";
import MySpins from "./pages/MySpins";
import './styles/App.css';



const App = () => {
  return (
    
    <Router> {/* Aquí envuelves todo en el Router */}
      <Routes>
        <Route path="/" element={<AppRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/vinyl-hunt" element={<VinylHunt />} />
          <Route path="/my-spins" element={<MySpins />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
