import Navigation from "./Navigation";
import styles from "./MainHeader.module.css";

const MainHeader = ({ isAuthenticated, onLogout }) => (
  <header className={styles["main-header"]}>
    <h1>React Advanced</h1>
    <Navigation isLoggedIn={isAuthenticated} onLogout={onLogout} />
  </header>
);
export default MainHeader;
