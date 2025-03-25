import { useState, useEffect } from 'react';
import axios from 'axios';

const VinylHunt = () => {
  const [discos, setDiscos] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const token = 'qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP'; // token Discogs Personal

  // Obtener géneros desde varios discos
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.discogs.com/database/search?type=release&per_page=100&page=1&q=`,
          { headers: { Authorization: `Discogs token=${token}` } }
        );

        const genres = new Set<string>();

        response.data.results.forEach((result: any) => {
          result.genre?.forEach((genre: string) => genres.add(genre));
        });

        setGenres(Array.from(genres)); // Convertimos el Set a un array único
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };

    fetchGenres();
  }, []);

  // Obtener discos por género y búsqueda
  useEffect(() => {
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
        console.error('Error al obtener discos:', error);
      }
    };

    fetchDiscos();
  }, [selectedGenre, searchQuery]);

  return (
    <div className='row'>
      

      {/* Filters */}
      <div className='col-12 flex justitySpace'>
        
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">Every Beat, Every Style</option>
          {genres.map((gener, index) => (
            <option key={index} value={gener}>
              {gener}
            </option>
          ))}
        </select>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type the Artist's Name"
        />

        

      </div>
      <div className='col-12 flex justityCenter huntBox'>
      <button className='generalButton'>Hunt</button>
      </div>


      {/* Show disc */}
      <div className='row'>
        {discos.map((disco: any) => (
          <div className='col-3 vinylContent' key={disco.id}>
            <img src={disco.cover_image} alt={disco.title} />
            <h5>{disco.title}</h5>
            {/* <p><strong>Género:</strong> {disco.genre?.join(', ') || 'Desconocido'}</p>
            <p><strong>Estilo:</strong> {disco.style?.join(', ') || 'Desconocido'}</p>
            <p><strong>Sello:</strong> {disco.label?.join(', ') || 'Desconocido'}</p> */}
            <p><strong>Format:</strong> {disco.format?.join(', ') || 'Desconocido'}</p>
            

            <a
              href={disco.master_url || `https://www.discogs.com/release/${disco.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See in Discogs
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VinylHunt;


