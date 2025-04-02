import { useContext } from 'react';
import '../styles/Home.css';
import { AuthContext } from '../context/AuthContext';



const Home = () => {

 
  return (
    <>
      <div className="content">
        <section className="flex homeSection">
          <div className="homeContentBox">
            <div className="homeText">
              <h1>Find Your Next Vinyl Obsession</h1>
              
             
            </div>
            <div className="homeTextUnder">
<div className='searchAreaHome flex '>
              <input type="text" placeholder="Dig for names "></input>
              <a href='#'><img  src="/img/search.png"></img></a>
              </div>
            </div>
            <img className="homeLogos" src="/img/logos.png"></img>
          </div>
          <img className="homeImage" src="/img/suricata.png"></img>
        </section>
      </div>
    </>
  );
};

export default Home;
