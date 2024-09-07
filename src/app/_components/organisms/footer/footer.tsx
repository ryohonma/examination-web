import styles from "./footer.module.scss";

export function Footer() {
  return (
    <>
      <footer className={styles.footerContainer}>
        <div className={styles.rfsContentArea}>
          <div className={styles.box}></div>
        </div>
      </footer>

      {/* Page Top Button 
       * 投稿ボタンと被るので一旦廃止
      <button className={styles.pageTop}></button>
      */}
    </>
  );
}
