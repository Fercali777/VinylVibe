import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/vinyl-hunt">Vinyl Hunt</Link> {/* link */}
          </li>
          <li>
            <Link to="/register">Register</Link> {/* link */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;