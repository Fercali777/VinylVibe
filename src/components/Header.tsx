import { Link } from 'react-router';
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

const Header = () => {
  
   const { user, login, logout } = useContext(AuthContext);


  return (
    <header className='flex'>
      <div className='logo'>
      <Link to="/"><img src='/img/Logo.png'/></Link>
      </div>
      <nav className='mainMenu'>
            <Link to="/vinyl-hunt">Vinyl Hunt</Link> {/* link */}
            <Link to="/my-spins">My Spins</Link> {/* link */}
      </nav>

            <button variant="success" className='rightMenuButton' onClick={login}>Login</button>

    </header>
  );
};

export default Header;