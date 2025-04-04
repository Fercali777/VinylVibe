import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import axios from "axios";

const MySpins = () => {
  const [discos, setDiscos] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]); 
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const location = useLocation();
  const token = "qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryFromURL = params.get("search");

    if (queryFromURL) {
      setSearchQuery(queryFromURL);
      setShouldSearch(true);
    }
  }, [location.search]);

  useEffect(() => {
    setShouldSearch(true);
  }, []);

  useEffect(() => {
    if (!shouldSearch) return;

    const fetchDiscos = async () => {
      try {
        let url = `https://api.discogs.com/database/search?type=release&q=${searchQuery}&per_page=20&page=1`;

        if (selectedGenre) url += `&genre=${selectedGenre}`;
        if (selectedCountry) url += `&country=${selectedCountry}`; // Filter contry

        const response = await axios.get(url, {
          headers: { Authorization: `Discogs token=${token}` },
        });

        setDiscos(response.data.results);
      } catch (error) {
        console.error("Error getting vinyls:", error);
      } finally {
        setShouldSearch(false);
      }
    };

    fetchDiscos();
  }, [shouldSearch, selectedCountry]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.discogs.com/database/search?type=release&per_page=100&page=1&q=`,
          { headers: { Authorization: `Discogs token=${token}` } }
        );

        const genresSet = new Set<string>();
        response.data.results.forEach((result: any) => {
          if (result.genre) {
            result.genre.forEach((genre: string) => genresSet.add(genre));
          }
        });

        setGenres(Array.from(genresSet));
      } catch (error) {
        console.error("Error getting genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // 🔥 Nueva función para obtener países
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://api.discogs.com/database/search?type=release&per_page=100&page=1&q=`,
          { headers: { Authorization: `Discogs token=${token}` } }
        );

        const countriesSet = new Set<string>();
        response.data.results.forEach((result: any) => {
          if (result.country) {
            countriesSet.add(result.country);
          }
        });

        setCountries(Array.from(countriesSet));
      } catch (error) {
        console.error("Error getting countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      <div className=" vibesTexture paddin1">
        <div className="container">
          {/* Filtros */}
          <div className="col-12 flex filtersBox">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type the Artist's Name"
            />

            {/*  Filtro de Gener */}
            <select
              onChange={(e) => setSelectedGenre(e.target.value)}
              value={selectedGenre}
            >
              <option value="">Every Beat, Every Style</option>
              {genres.length > 0 ? (
                genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))
              ) : (
                <option disabled>Loading genres...</option>
              )}
            </select>

            {/*  Filter por Country */}
            <select
              onChange={(e) => setSelectedCountry(e.target.value)}
              value={selectedCountry}
            >
              <option value="">Worldwide</option>
              {countries.length > 0 ? (
                countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))
              ) : (
                <option disabled>Loading countries...</option>
              )}
            </select>
            <button
              className="generalButton"
              onClick={() => setShouldSearch(true)}
            >
              Hunt
            </button>
          </div>

          {/* Booton Search */}
          <div className="col-12 flex justityCenter">

          </div>
        </div>
      </div>

      {/* Show Vinyls */}
      <div className="container">
        <div className="row">
          
          {discos.map((disco: any) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-6 vinylContent animationDownUp" key={disco.id}>
              <img src={disco.cover_image} alt={disco.title} />
              <h5>{disco.title}</h5>
              <p>
                <strong>Format:</strong>{" "}
                {Array.isArray(disco.format)
                  ? disco.format.join(", ")
                  : disco.format || "Unknown"}
              </p>

              <p>
                <strong>Country:</strong> {disco.country || "Unknown"}
              </p>

              <Link to={`/vinyl/${disco.id}`} className="detail-link">
                <button className="littleButton">See More</button>
              </Link>
            </div>
          ))}
          
        </div>
      </div>
    </>
  );
};



  
  export default MySpins;