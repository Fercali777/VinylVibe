import { Outlet } from "react-router"; // Asegúrate de usar react-router-dom
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    < >
      <Header />
      <Outlet /> {/* Aquí se cargará el contenido dinámico de las rutas */}
      <Footer />
    </>
  );
};

export default AppRoutes;
