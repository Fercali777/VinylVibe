import { Link, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideButtons =
    (location.pathname === "/login" || location.pathname === "/register") &&
    isMobile;
  return (
    <header className="flex">
      <div className="logo">
        <Link to="/">
          <img src="/img/Logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className="mainMenu">
        <Link to="/vinyl-hunt">Vinyl Hunt</Link>
        <Link to="/my-spins">My Spins</Link>
      </nav>
      <p className="userName">
        {user?.displayName && `Welcome ${user.displayName}!`}
      </p>
      {!hideButtons && (
        <div>
          {!user && (
            <Link to="/register">
              <button className="littleButton buttonYellow">Register</button>
            </Link>
          )}
          {user ? (
            <button className="littleButton buttonYellow" onClick={logout}>
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="littleButton">Login</button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
