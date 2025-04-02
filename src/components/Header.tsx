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
           <p className='userName'>{user?.displayName && `User: ${user.displayName}`}</p>
           {user? "" : <Link to="/register"><button className='littleMenuButton buttonYellow '>Register</button></Link>}
           {user? <button className='littleMenuButton buttonYellow ' onClick={logout}>Log Out</button> : <Link to="/login"><button className='littleMenuButton'>Login</button></Link> }
          

    </header>
  );
};

export default Header;