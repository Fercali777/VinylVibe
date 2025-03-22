import { Link } from 'react-router';

const Header = () => {
  return (
    <header className='flex'>
      <div className='logo'>
      <Link to="/"><img src='/img/Logo.png'/></Link>
      </div>
      <nav className='mainMenu'>
            <Link to="/vinyl-hunt">Vinyl Hunt</Link> {/* link */}
            <Link to="/my-spins">My Spins</Link> {/* link */}
      </nav>

            <Link to="/register"><button className='rightMenuButton'>Login</button></Link> {/* link */}

    </header>
  );
};

export default Header;