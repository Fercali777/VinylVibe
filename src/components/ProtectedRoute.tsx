import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useUserStatus from "../utils/useUserStatus";
type ProtectedRouteProps = {
  children: ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteProps) {

  const { user } = useContext(AuthContext);

  //   const isUserLoggedin = user ? true : false;
  const isUserActive = useUserStatus();
  return (
    <div>{isUserActive ? children : <h1>You need to login first</h1>}</div>
  );
}

export default ProtectedRoute;
