import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";

console.log("auth:", auth);

//Define the type for the context
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
};
//Define type for provider's props
type AuthContextProviderProps = {
  children: ReactNode;
};

// Create object with inital value for the variables/functions we are gonna share in our context
const AuthContextInitValue: AuthContextType = {
  user: null,
  login: () => {
    throw new Error("Context not initialized");
  },
  register: () => {
    throw new Error("Context not initialized");
  },
  logout: () => {
    throw new Error("Context not initialized");
  },
};

//Create the context

export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

//Create the context's provider (the wharehouse/store)
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // const currentUser = {
  //   userName: "Fer",
  //   email: "fer@test.com",
  // };
  // Put here everything you want to share

  const [user, setUser] = useState<User | null>(null);

  // Keep actvive the login even with reload page -------------------------------
  useEffect(() => {
    getActiveUser();
  }, []);

  const getActiveUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("active user", user);
        setUser(user);
      } else {
        console.log("no active user");
      }
    });
  };

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setUser(user);
      // ...
    });
    // .catch((error) => {
    //   // const errorCode = error.code;
    //   // const errorMessage = error.message;
    // });
  };

  const register = (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Actualization User
        updateProfile(user, { displayName: name })
          .then(() => {
            console.log("Nombre guardado en Firebase:", name);
            // Force user Actualization
            setUser({ ...user, displayName: name });
          })
          .catch((error) =>
            console.log("Error actualizando el perfil:", error)
          );
      })
      .catch((error) => console.log("Error en el registro:", error));
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
