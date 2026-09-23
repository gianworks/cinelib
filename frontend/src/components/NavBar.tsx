import { Link } from "react-router-dom"

function NavBar() {
  return(
    <nav>
      <div>CineLib</div>
      <div>
        <Link to="/">Browse</Link>
        <Link to="/library">My Library</Link>
      </div>
    </nav>
  );
}

export default NavBar;
