import styles from "./Navigation.module.css";

const Navigation = ({ isLoggedIn, onLogout }) => (
  <nav className={styles.nav}>
    <ul>
      {isLoggedIn && (
        <li>
          <a href="/">Пользователи</a>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <a href="/">Админ</a>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={onLogout}>Выйти</button>
        </li>
      )}
    </ul>
  </nav>
);

export default Navigation;
