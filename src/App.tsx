import { BrowserRouter, Routes, Route } from "react-router"; 
import AppRoutes from "./routes/AppRoutes";
import Home from "./pages/Home";
import VinylHunt from "./pages/VinylHunt";
import VinylDetail from "./pages/VinylDetail"; // Nueva página de detalle
import Register from "./pages/Register";
import MySpins from "./pages/MySpins";
import "./styles/App.css";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/vinyl-hunt" element={<ProtectedRoute><VinylHunt /></ProtectedRoute>} />
            <Route path="/vinyl/:id" element={<ProtectedRoute><VinylDetail /></ProtectedRoute>} />
            <Route path="/my-spins" element={<MySpins />} />
            <Route path="auth" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
