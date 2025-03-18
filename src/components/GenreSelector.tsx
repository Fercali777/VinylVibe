import React, { useEffect, useState } from 'react';

interface GenreSelectorProps {
  onSelectGenre: (genre: string) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ onSelectGenre }) => {
  const [generos, setGeneros] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Vamos a obtener los géneros de varias páginas
        let allGenres: string[] = [];
        const totalPages = 5; // Número de páginas a obtener, ajustable

        for (let page = 1; page <= totalPages; page++) {
          const response = await fetch(`https://api.discogs.com/database/search?q=&type=release&f=genre&per_page=100&page=${page}`);
          const data = await response.json();
          
          // Extraemos los géneros de los discos y los agregamos al array de géneros
          const genres = data.results.map((item: any) => item.genre).flat();
          allGenres = [...allGenres, ...genres];
        }

        // Eliminamos duplicados con Set y actualizamos el estado
        const uniqueGenres = [...new Set(allGenres)];
        setGeneros(uniqueGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <label>Selecciona un género: </label>
      <select onChange={(e) => onSelectGenre(e.target.value)}>
        <option value="">Todos los géneros</option>
        {generos.map((genero, index) => (
          <option key={index} value={genero}>
            {genero}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;