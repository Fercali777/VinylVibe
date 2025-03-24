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

            <button variant="success" className='rightMenuButton'>Login</button>

    </header>
  );
};

export default Header;