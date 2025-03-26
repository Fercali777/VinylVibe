import { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import axios from "axios";

const VinylDetail = () => {
  const { id } = useParams();
  const [disco, setDisco] = useState<any>(null);
  const token = "qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP"; 

  useEffect(() => {
    const fetchDiscoDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.discogs.com/releases/${id}`,
          { headers: { Authorization: `Discogs token=${token}` } }
        );
        setDisco(response.data);
      } catch (error) {
        console.error("Error fetching vinyl details:", error);
      }
    };

    fetchDiscoDetail();
  }, [id]);

  if (!disco) return <p>Loading...</p>;

  return (
    <div className="vinyl-detail">
      <h2>{disco.title}</h2>
      <img src={disco.images?.[0]?.uri} alt={disco.title} />
      
      <p><strong>Artist:</strong> {disco.artists?.map((artist: any) => artist.name).join(", ")}</p>
      <p><strong>Genre:</strong> {disco.genres?.join(", ") || "Unknown"}</p>
      <p><strong>Style:</strong> {disco.styles?.join(', ') || 'Unknown'}</p>
      <p><strong>Label:</strong> {disco.labels?.map((label: any) => label.name).join(", ") || "Unknown"}</p>
      <p><strong>Year:</strong> {disco.year || "Unknown"}</p>

      {/* Información adicional */}
      <p><strong>Tracklist:</strong></p>
      <ul>
        {disco.tracklist?.map((track: any, index: number) => (
          <li key={index}>
            {track.position} - {track.title} ({track.duration})
          </li>
        ))}
      </ul>

      <p><strong>Format:</strong> {disco.formats?.map((format: any) => format.name).join(", ")}</p>
      <p><strong>Country:</strong> {disco.country || "Unknown"}</p>

      <a href={disco.uri} target="_blank" rel="noopener noreferrer">
        See in Discogs
      </a>
    </div>
  );
};

export default VinylDetail;