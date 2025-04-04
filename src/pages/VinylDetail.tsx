import { useEffect, useState, useContext, useRef } from "react";
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
  const commentsRef = useRef<HTMLDivElement>(null); //for the autoscroll
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

      // Hacer scroll al área de comentarios
      setTimeout(() => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!disco) return <p className="loading">Loading...</p>;

  return (
    <>
      <div className="vibesTexture">
        <div className="container">
          <section className="vinyl-detail row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 detailsImgBox animationGrow">
              <img src={disco.images?.[0]?.uri} alt={disco.title} />
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 col-12 detailsTextBox animationGrow">
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
                <button className="littleButton">See in Discogs</button>
              </a>
            </div>
          </section>
        </div>
      </div>
      <div ref={commentsRef} className="container">
        <section className="comentsTittel row">
          <h2>Groove Talk</h2>
          <h4>Share thoughts from vinyl lovers.</h4>
        </section>
        <section  className="comentingBox row">
          {user ? (
            <>
              <div className="col-md-2 col-sm-12 col-12 imgCommentsBox">
                <img src="/img/profilePicture.png" />
              </div>{" "}
            </>
          ) : (
            <>
              <div className="col imgCommentsBox">
                <img src="/img/profilePicture-null.png" />
              </div>{" "}
            </>
          )}
          <div className=" col-lg-10 col-md-12 col-sm-12 col-12 ">
            {user ? (
              <div className="comenting flex direction-column ">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write..."
                />
                <button onClick={handleAddComment} className="littleButton">
                  Post
                </button>
              </div>
            ) : (
              <div className="comentBoxInvisible flex direction-column">
                <div>Log in for make your comment.</div>
                <div>
                  <a href="/login">
                    <button className="littleButton">Login</button>
                  </a>{" "}
                  <a href="/register">
                    <button className="littleButton buttonYellow ">
                      Register
                    </button>
                  </a>
                </div>
                <div className="invisibleButon"></div>
              </div>
            )}
          </div>
        </section>
        <section   className="comentsList row">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="commentBox animationUpDown">
                <h3>{comment.userName}</h3>
                <p>
                  {new Date(
                    comment.timestamp.seconds * 1000
                  ).toLocaleDateString()}
                </p>

                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className="comentBoxInvisible comentEmptyBoxInvisible">
              We have not coments yet.
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default VinylDetail;
