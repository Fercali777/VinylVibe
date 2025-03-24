import { createContext, ReactNode, useState } from "react";
import { User } from "../types/types";
//?4. Define the type for the context
type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};
//?6. Define type for provider's props
type AuthContextProviderProps = {
  children: ReactNode;
};

//?5. Create object with inital value for the variables/functions we are gonna share in our context
const AuthContextInitValue: AuthContextType = {
  user: null,
  login: () => {
    throw new Error("Context not initialized");
  },
  logout: () => {
    throw new Error("Context not initialized");
  },
};

//?1. Create the context

export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

//?2. Create the context's provider (the wharehouse/store)
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const currentUser = {
    userName: "Fer",
    email: "fer@test.com",
  };
  //?3. Put here everything you want to share

  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(currentUser);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
