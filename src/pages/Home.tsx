import '../styles/Home.css';


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
