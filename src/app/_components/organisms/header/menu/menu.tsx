"use client";

import { useState } from "react";
import styles from "./menu.module.scss";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${styles.openbtn} ${isOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <article className={`${styles.sitemap} ${isOpen ? styles.active : ""}`}>
        <div className={styles.sitemapContainer}>
          <div className={styles.inner}>
            <section>
              <ul>
                <li>
                  <p>ログアウト</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
