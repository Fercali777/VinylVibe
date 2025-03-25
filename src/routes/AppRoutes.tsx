import { Outlet, useLocation } from "react-router"; // Importa useLocation
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppRoutes = () => {
  const location = useLocation(); // Obtiene la ruta actual

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("backHome"); // Agrega clase
    } else {
      document.body.classList.remove("backHome"); // Quita clase si no está en Home
    }

    return () => {
      document.body.classList.remove("backHome"); // Asegura que se elimine al salir
    };
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppRoutes;