import { useState, useEffect } from 'react';
import axios from 'axios';

import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return <AppRoutes />;
// }







const App: React.FC = () => {
  const [discos, setDiscos] = useState([]);
  const [generos, setGeneros] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const token = 'qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP'; // Reemplaza con tu token de Discogs

  // Obtener géneros desde varios discos
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get(
          `https://api.discogs.com/database/search?type=release&per_page=100&page=1&q=`,
          { headers: { Authorization: `Discogs token=${token}` } }
        );

        const genres = new Set<string>();

        // Extraemos géneros de múltiples discos
        response.data.results.forEach((result: any) => {
          result.genre?.forEach((genre: string) => genres.add(genre));
        });

        setGeneros(Array.from(genres)); // Convertimos el Set a un array único
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
        let url = `https://api.discogs.com/database/search?type=release&q=${searchQuery}&per_page=10&page=1`;

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

    // ✅ Ahora siempre se ejecuta la búsqueda, incluso cuando no hay género seleccionado
    fetchDiscos();
  }, [selectedGenre, searchQuery]);

  return (
    <div>
      <h1>Explorador de Discos</h1>

      {/* Menú de géneros */}
      <div>
        <label>Selecciona un género: </label>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">Todos los géneros</option>
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
            <p><strong>Género:</strong> {disco.genre?.join(', ') || 'Desconocido'}</p>
            <p><strong>Estilo:</strong> {disco.style?.join(', ') || 'Desconocido'}</p>
            <p><strong>Formato:</strong> {disco.format?.join(', ') || 'Desconocido'}</p>
            <p><strong>Sello:</strong> {disco.label?.join(', ') || 'Desconocido'}</p>
            <a
              href={disco.master_url || `https://www.discogs.com/release/${disco.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver más en Discogs
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;