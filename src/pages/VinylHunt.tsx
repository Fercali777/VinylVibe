import { useDiscogs } from "../context/DiscogsContext";

const VinylHunt = () => {
  const { discos, generos, selectedGenre, setSelectedGenre, searchQuery, setSearchQuery } = useDiscogs();

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
            <p><strong>Género:</strong> {disco.genre?.join(", ") || "Desconocido"}</p>
            <p><strong>Estilo:</strong> {disco.style?.join(", ") || "Desconocido"}</p>
            <p><strong>Formato:</strong> {disco.format?.join(", ") || "Desconocido"}</p>
            <p><strong>Sello:</strong> {disco.label?.join(", ") || "Desconocido"}</p>
            <a href={disco.master_url || `https://www.discogs.com/release/${disco.id}`} target="_blank" rel="noopener noreferrer">
              Ver más en Discogs
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VinylHunt;