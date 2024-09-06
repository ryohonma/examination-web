import styles from "./header.module.scss";
import { Menu } from "./menu/menu";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerLogo}>HEADER</h1>
      </div>
      <Menu />
    </header>
  );
}
