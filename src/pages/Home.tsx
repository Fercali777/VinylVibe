import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const navigate = useNavigate();


  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/vinyl-hunt?search=${encodeURIComponent(searchQuery)}`); // Cambiar "/gallery" por "/vinyl-hunt"
    }
  };


  return (
    <>
      <div className="content">
        <section className="flex homeSection">
          <div className="homeContentBox">
            <div className="homeText">
              <h1>Find Your Next Vinyl Obsession</h1>
            </div>
            <div className="homeTextUnder">
              <div className="searchAreaHome flex">
                <input
                  type="text"
                  placeholder="Dig for names"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <a onClick={handleSearch}>
                  <img src="/img/search.png" alt="Search" />
                </a>
              </div>
            </div>
            <img className="homeLogos" src="/img/logos.png" alt="Logos" />
          </div>
          <img className="homeImage" src="/img/suricata.png" alt="Suricata" />
        </section>
      </div>
    </>
  );
};

export default Home;




// import { useContext } from 'react';
// import '../styles/Home.css';
// import { AuthContext } from '../context/AuthContext';



// const Home = () => {

 
//   return (
//     <>
//       <div className="content">
//         <section className="flex homeSection">
//           <div className="homeContentBox">
//             <div className="homeText">
//               <h1>Find Your Next Vinyl Obsession</h1>
              
             
//             </div>
//             <div className="homeTextUnder">
// <div className='searchAreaHome flex '>
//               <input type="text" placeholder="Dig for names "></input>
//               <a href='#'><img  src="/img/search.png"></img></a>
//               </div>
//             </div>
//             <img className="homeLogos" src="/img/logos.png"></img>
//           </div>
//           <img className="homeImage" src="/img/suricata.png"></img>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Home;
