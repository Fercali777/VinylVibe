import { useContext } from 'react';
import '../styles/Home.css';
import { AuthContext } from '../context/AuthContext';







const Home = () => {

  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="content">
        <section className="flex homeSection">
          <div className="homeContentBox">
            <div className="homeText">
              <h1>Find Your Next Vinyl Obsession</h1>
              <h2>Hola, {user?.displayName ? user.displayName : "invitado"}!</h2>
             
            </div>
            <div className="homeTextUnder">
              <input type="text" placeholder="Dig for names "></input>
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
