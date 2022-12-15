import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./Home.module.css";

const Home = ({ onLogout }) => (
  <Card className={styles.home}>
    <h1>Рады Вас Видеть Снова!</h1>
    <Button onClick={onLogout}>Выход</Button>
  </Card>
);

export default Home;
