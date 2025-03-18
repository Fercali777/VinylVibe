import { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [discos, setDiscos] = useState([]);
  const [generos, setGeneros] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('Rock');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const token = 'qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP'; // Reemplaza con tu token de Discogs

  // Obtener géneros desde los resultados de búsqueda
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        // Hacemos una búsqueda de discos para extraer géneros
        const response = await axios.get(`/discogs/database/search?type=release&per_page=1&page=1&q=`, {
          headers: { Authorization: `Discogs token=${token}` },
        });
        const genres = new Set<string>();
        // Extraemos géneros de los discos obtenidos
        response.data.results.forEach((result: any) => {
          result.genre?.forEach((genre: string) => {
            genres.add(genre); // Añadimos los géneros encontrados
          });
        });
        setGeneros(Array.from(genres)); // Convertimos el Set a un array
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };

    fetchGeneros();
  }, []);

  // Obtener discos por género y búsqueda
  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        const response = await axios.get(
          `/discogs/database/search?type=release&genre=${selectedGenre}&q=${searchQuery}&per_page=10&page=1`,
          {
            headers: { Authorization: `Discogs token=${token}` },
          }
        );
        setDiscos(response.data.results);
      } catch (error) {
        console.error('Error al obtener discos:', error);
      }
    };

    fetchDiscos();
  }, [selectedGenre, searchQuery]);

  return (
    <div>
      <h1>Explorador de Discos</h1>

      {/* Menú de géneros */}
      <div>
        <label>Selecciona un género: </label>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          {generos.map((genero, index) => (
            <option key={index} value={genero}>
              {genero}
            </option>
          ))}
        </select>
      </div>

      {/* Buscador de artistas */}
      <div>
        <label htmlFor="search">Buscar artista: </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Escribe el nombre del artista"
        />
      </div>

      {/* Mostrar discos */}
      <div>
        {discos.map((disco: any) => (
          <div key={disco.id}>
            <img src={disco.cover_image} alt={disco.title} />
            <h3>{disco.title}</h3>
            <p>Formato: {disco.format.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;