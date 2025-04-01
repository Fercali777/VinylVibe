import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const VinylDetail = () => {
  const { id } = useParams();
  const [disco, setDisco] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
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

  useEffect(() => {
    if (!id) return;

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((comment: any) => comment.vinylId === id); // Filtrar por vinilo

      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);

  const handleAddComment = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }
    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db, "comments"), {
        vinylId: id,
        userName: user.displayName || "Anónimo",
        userId: user.uid,
        comment: newComment,
        timestamp: new Date(),
      });
      setNewComment(""); // Limpiar el input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!disco) return <p>Loading...</p>;

  return (
    <>
      <section className="vinyl-detail row">
        <div className="col detailsImgBox animationGrow">
          <img src={disco.images?.[0]?.uri} alt={disco.title} />
        </div>

        <div className="col detailsTextBox animationGrow">
          <h2>{disco.title}</h2>
          <p>
            <strong>Artist:</strong>{" "}
            {disco.artists?.map((artist: any) => artist.name).join(", ")}
          </p>
          <p>
            <strong>Label:</strong>{" "}
            {disco.labels?.map((label: any) => label.name).join(", ") ||
              "Unknown"}
          </p>
          <p>
            <strong>Year:</strong> {disco.year || "Unknown"}
          </p>
          <p>
            <strong>Genre:</strong> {disco.genres?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Style:</strong> {disco.styles?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Format:</strong>{" "}
            {disco.formats?.map((format: any) => format.name).join(", ")}
          </p>
          <p>
            <strong>Country:</strong> {disco.country || "Unknown"}
          </p>
          <a href={disco.uri} target="_blank" rel="noopener noreferrer">
            <button className="rightMenuButton">See in Discogs</button>
          </a>
        </div>
      </section>
      <section className="row">
        <h2>Groove Talk</h2>
        <h4>Share thoughts from vinyl lovers.</h4>
      </section>
      <section className="comentsSection row">
      <div className="col">
        
      </div>
        <div className="col">
          {user ? (
            <div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
              />
              <button onClick={handleAddComment} className="rightMenuButton">
                Enviar
              </button>
            </div>
          ) : (
            <p>Inicia sesión para comentar.</p>
          )}
        </div>

        {/* Lista de Comentarios */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.userName}</strong> (
                {new Date(
                  comment.timestamp.seconds * 1000
                ).toLocaleDateString()}
                )
              </p>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </section>
    </>
  );
};

export default VinylDetail;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import axios from "axios";

// const VinylDetail = () => {
//   const { id } = useParams();
//   const [disco, setDisco] = useState<any>(null);
//   const token = "qxkbIRypBrNlrgGKjwTdeRqCewNXVtwdyZfCEUAP";

//   useEffect(() => {
//     const fetchDiscoDetail = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.discogs.com/releases/${id}`,
//           { headers: { Authorization: `Discogs token=${token}` } }
//         );
//         setDisco(response.data);
//       } catch (error) {
//         console.error("Error fetching vinyl details:", error);
//       }
//     };

//     fetchDiscoDetail();
//   }, [id]);

//   if (!disco) return <p>Loading...</p>;

//   return (
//     <div className="vinyl-detail row">
//       <div className="col detailsImgBox animationGrow" >
//       <img src={disco.images?.[0]?.uri} alt={disco.title} />
//       </div>

//       <div className="col detailsTextBox animationGrow">
//       <h2>{disco.title}</h2>
//       <p><strong>Artist:</strong> {disco.artists?.map((artist: any) => artist.name).join(", ")}</p>
//       <p><strong>Label:</strong> {disco.labels?.map((label: any) => label.name).join(", ") || "Unknown"}</p>
//       <p><strong>Year:</strong> {disco.year || "Unknown"}</p>
//       <p><strong>Genre:</strong> {disco.genres?.join(", ") || "Unknown"}</p>
//       <p><strong>Style:</strong> {disco.styles?.join(', ') || 'Unknown'}</p>
//       <p><strong>Tracklist:</strong></p>
//       <ul>
//         {disco.tracklist?.map((track: any, index: number) => (
//           <li key={index}>
//             {track.position} - {track.title} ({track.duration})
//           </li>
//         ))}
//       </ul>

//       <p><strong>Format:</strong> {disco.formats?.map((format: any) => format.name).join(", ")}</p>
//       <p><strong>Country:</strong> {disco.country || "Unknown"}</p>
//       <a href={disco.uri} target="_blank" rel="noopener noreferrer">
//       <button  className="rightMenuButton">
//         See in Discogs
//       </button>
//       </a>
//       </div>
//     </div>
//   );
// };

// export default VinylDetail;
