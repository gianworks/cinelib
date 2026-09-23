import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>CINELIB</h1>
      </div>
      <div className={styles.menu}>
        <Link to="/">Browse</Link>
        <Link to="/library">My Library</Link>
      </div>
    </nav>
  );
}

export default NavBar;
