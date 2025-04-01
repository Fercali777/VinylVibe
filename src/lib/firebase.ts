import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Importar Firestore

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY as string,
  authDomain: import.meta.env.VITE_AUTHDOMAIN as string,
  projectId: import.meta.env.VITE_PROJECTID as string,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
  appId: import.meta.env.VITE_APPID as string,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // <-- Inicializar Firestore

export { app, auth, db };






// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY as string,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN as string,
//   projectId: import.meta.env.VITE_PROJECTID as string,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
//   appId: import.meta.env.VITE_APPID as string,
// };

// // Inicializar Firebase solo aquí
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { app, auth };
