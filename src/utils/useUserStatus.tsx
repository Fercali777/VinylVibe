import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useUserStatus() {
  const { user } = useContext(AuthContext);
  const isUserLoggedin = user ? true : false;
  return isUserLoggedin;
}

export default useUserStatus;