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
            <Link to="/login">login</Link> {/* link */}
            <Link to="/register">Register</Link> {/* link */}
      </nav>

           {user? <button className='rightMenuButton' onClick={logout}>Log Out</button> : <Link className='rightMenuButton' to="/login"><button className='rightMenuButton'>Login</button></Link> }

    </header>
  );
};

export default Header;