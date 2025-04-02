import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/gallery?search=${encodeURIComponent(searchQuery)}`);
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
                <button onClick={handleSearch}>
                  <img src="/img/search.png" alt="Search" />
                </button>
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
