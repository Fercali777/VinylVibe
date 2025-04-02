import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import axios from "axios";

const VinylHunt = () => {
  const [discos, setDiscos] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);

  const location = useLocation(); // 📌 Para leer la URL
  const token = "qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP";

  // 📌 Extraer el parámetro de búsqueda desde la URL cuando el componente se monta
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryFromURL = params.get("search");

    if (queryFromURL) {
      setSearchQuery(queryFromURL);
      setShouldSearch(true); // Hacer la búsqueda automáticamente
    }
  }, [location.search]);

   useEffect(() => {
     setShouldSearch(true); // Activate vefore the user look
   }, []);

  useEffect(() => {
    if (!shouldSearch) return;

    const fetchDiscos = async () => {
      try {
        let url = `https://api.discogs.com/database/search?type=release&q=${searchQuery}&per_page=20&page=1`;

        if (selectedGenre) {
          url += `&genre=${selectedGenre}`;
        }

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
  }, [shouldSearch]);

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
  
        const genresArray = Array.from(genresSet);
        console.log("Genres fetched:", genresArray); // 🔥 Verifica los datos en consola
        setGenres(genresArray);
      } catch (error) {
        console.error("Error getting genres:", error);
      }
    };
  
    fetchGenres();
  }, []);

  return (
    <>
      <div className="row vibesTexture paddin1">
        {/* Filtros */}




        
        <div className="col-12 flex justitySpace">



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
    <option disabled>Loading genres...</option> // 🔥 Mensaje temporal
  )}
</select>


          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type the Artist's Name"
          />
        </div>

        {/* Botón de búsqueda */}
        <div className="col-12 flex justityCenter">
          <button className="generalButton" onClick={() => setShouldSearch(true)}>
            Hunt
          </button>
        </div>
      </div>

      {/* Mostrar discos */}
      <div className="container">
        <div className="row">
          {discos.map((disco: any) => (
            <div className="col-3 vinylContent animationDownUp" key={disco.id}>
              <img src={disco.cover_image} alt={disco.title} />
              <h5>{disco.title}</h5>
              <p>
                <strong>Format:</strong>{" "}
                {Array.isArray(disco.format)
                  ? disco.format.join(", ")
                  : disco.format || "Unknown"}
              </p>

              <Link to={`/vinyl/${disco.id}`} className="detail-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VinylHunt;

// import { useState, useEffect } from "react";
// import { Link } from "react-router"; 
// import axios from "axios";

// const VinylHunt = () => {
//   const [discos, setDiscos] = useState<any[]>([]);
//   const [genres, setGenres] = useState<string[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [shouldSearch, setShouldSearch] = useState<boolean>(false); // Nuevo estado

//   const token = "qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP"; 

//   useEffect(() => {
//     setShouldSearch(true); // Activate vefore the user look
//   }, []);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.discogs.com/database/search?type=release&per_page=100&page=1&q=`,
//           { headers: { Authorization: `Discogs token=${token}` } }
//         );

//         const genres = new Set<string>();
//         response.data.results.forEach((result: any) => {
//           result.genre?.forEach((genre: string) => genres.add(genre));
//         });

//         setGenres(Array.from(genres));
//       } catch (error) {
//         console.error("Error getting results:", error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   useEffect(() => {
//     if (!shouldSearch) return; // Solo busca si shouldSearch es true

//     const fetchDiscos = async () => {
//       try {
//         let url = `https://api.discogs.com/database/search?type=release&q=${searchQuery}&per_page=20&page=1`;

//         if (selectedGenre) {
//           url += `&genre=${selectedGenre}`;
//         }

//         const response = await axios.get(url, {
//           headers: { Authorization: `Discogs token=${token}` },
//         });

//         setDiscos(response.data.results);
//       } catch (error) {
//         console.error("Error getting vilyls:", error);
//       } finally {
//         setShouldSearch(false); // Reset para evitar llamadas innecesarias
//       }
//     };

//     fetchDiscos();
//   }, [shouldSearch]); // Solo se activa cuando shouldSearch cambia

//   useEffect(() => {
//     // Aplicar el retraso de animación cuando los discos hayan sido cargados
//     const divs = document.querySelectorAll('.vinylContent');

//     divs.forEach((div, index) => {
//       div.style.animationDelay = `${index * 0.2}s`; // Ajusta el retraso de cada div
//     });
//   }, [discos]); // Este useEffect se ejecuta cada vez que discos cambia

//   return (
//     <>
//       <div className="row vibesTexture paddin1">
//         {/* Filtros */}
//         <div className="col-12 flex justitySpace">
//           <select
//             onChange={(e) => setSelectedGenre(e.target.value)}
//             value={selectedGenre}
//           >
//             <option value="">Every Beat, Every Style</option>
//             {genres.map((gener, index) => (
//               <option key={index} value={gener}>
//                 {gener}
//               </option>
//             ))}
//           </select>

//           <input
//             id="search"
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Type the Artist's Name"
//           />
//         </div>

//         {/* Botón de búsqueda */}
//         <div className="col-12 flex justityCenter">
//           <button className="generalButton" onClick={() => setShouldSearch(true)}>
//             Hunt
//           </button>
//         </div>
//       </div>
      
//       {/* Mostrar discos */}
//       <div className="container">
//       <div className="row">
//         {discos.map((disco: any) => (
//           <div className="col-3 vinylContent animationDownUp" key={disco.id}>
//             <img src={disco.cover_image} alt={disco.title} />
//             <h5>{disco.title}</h5>
//             <p>
//               <strong>Format:</strong>{" "}
//               {Array.isArray(disco.format)
//                 ? disco.format.join(", ")
//                 : disco.format || "Desconocido"}
//             </p>

//             <Link to={`/vinyl/${disco.id}`} className="detail-link">
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//       </div>
//     </>
//   );
// };

// export default VinylHunt;

