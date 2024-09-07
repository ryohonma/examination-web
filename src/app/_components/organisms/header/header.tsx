import logo from "@luna/app/_assets/images/logo.png";
import Image from "next/image";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" fill />
        </div>
      </div>
    </header>
  );
}
