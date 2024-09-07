import { staticPath } from "@luna/constants/$path";
import Image from "next/image";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image src={staticPath.images.logo_png} alt="logo" fill />
        </div>
      </div>
    </header>
  );
}
