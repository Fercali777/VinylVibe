import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header"; // Correcta importación

import Home from "../pages/Home";
import VinylHunt from "../pages/VinylHunt";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/vinyl-hunt" element={<VinylHunt />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Gallery from "../pages/Gallery";
// import VinylDetail from "../pages/VinylDetail";
// import Register from "../pages/Register";
// import Header from "../components/Header";

// const AppRoutes = () => (
//   <BrowserRouter>
//     <Header />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/gallery" element={<Gallery />} />
//       <Route path="/vinyl/:id" element={<VinylDetail />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default AppRoutes;

