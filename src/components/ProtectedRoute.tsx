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
    <div className="container">{isUserActive ? children : <div className="alertMesage"><h1>Log in, Before you dig!</h1></div>}</div>
    
  );
}

export default ProtectedRoute;
