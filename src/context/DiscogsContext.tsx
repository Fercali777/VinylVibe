import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Context
const DiscogsContext = createContext<any>(null);

export const DiscogsProvider = ({ children }: { children: ReactNode }) => {
  const [discos, setDiscos] = useState([]);
  const [generos, setGeneros] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const token = "qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP"; 

  // Get Genres
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get(`/api/discogs/database/search?type=release&per_page=100&page=1&q=`, {
          headers: { Authorization: `Discogs token=${token}` },
        });

        const genres = new Set<string>();

        response.data.results.forEach((result: any) => {
          result.genre?.forEach((genre: string) => genres.add(genre));
        });

        setGeneros(Array.from(genres));
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    fetchGeneros();
  }, []);

  // Get disck for gener and search
  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        let url = `/api/discogs/database/search?type=release&q=${searchQuery}&per_page=10&page=1`;

        if (selectedGenre) {
          url += `&genre=${selectedGenre}`;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Discogs token=${token}` },
        });

        setDiscos(response.data.results);
      } catch (error) {
        console.error("Error findin disc:", error);
      }
    };

    fetchDiscos();
  }, [selectedGenre, searchQuery]);

  return (
    <DiscogsContext.Provider value={{ discos, generos, selectedGenre, setSelectedGenre, searchQuery, setSearchQuery }}>
      {children}
    </DiscogsContext.Provider>
  );
};

// Hook for use in the context
export const useDiscogs = () => {
  return useContext(DiscogsContext);
};