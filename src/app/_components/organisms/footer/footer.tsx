import { staticPath } from "@luna/constants/$path";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.rfsContentArea}>
        <div className={styles.box}>
          {/* ロゴ */}
          <div className={styles.footerLogo}>
            <Link href="/">
              <Image
                src={staticPath.images.footer_logo_png}
                alt="logo"
                width={256}
                height={100}
              />
            </Link>
          </div>

          {/* リンクリスト */}
          <div className={styles.footerLinks}>
            <ul>
              <li>
                <Link href="/">会社概要</Link>
              </li>
              <li>
                <Link href="/">プライバシーポリシー</Link>
              </li>
              <li>
                <Link href="/">利用規約</Link>
              </li>
              <li>
                <Link href="/">お問い合わせ</Link>
              </li>
            </ul>
          </div>

          {/* SNSリンク */}
          <div className={styles.socialLinks}>
            <Link href="https://twitter.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="skyblue"
                  d="M24 4.56c-.89.39-1.85.65-2.85.77a4.96 4.96 0 0 0 2.17-2.72c-.95.56-2 .96-3.12 1.17a4.92 4.92 0 0 0-8.38 4.48c-4.09-.2-7.72-2.17-10.15-5.16A4.92 4.92 0 0 0 1.67 8a4.93 4.93 0 0 1-2.23-.61c-.05 2.28 1.6 4.42 3.92 4.89A4.93 4.93 0 0 1 .96 12v.06a4.93 4.93 0 0 0 3.95 4.83c-.78.21-1.62.25-2.46.09a4.94 4.94 0 0 0 4.6 3.42A9.89 9.89 0 0 1 0 21.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14-7.51 14-14 0-.21 0-.42-.02-.63a9.96 9.96 0 0 0 2.47-2.54z"
                ></path>
              </svg>
            </Link>
            <Link href="https://facebook.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M22.676 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.494V14.709h-3.13v-3.636h3.13V8.413c0-3.1 1.892-4.788 4.658-4.788 1.325 0 2.465.098 2.797.143v3.24l-1.92.001c-1.504 0-1.794.715-1.794 1.763v2.311h3.587l-.467 3.636h-3.12V24h6.117C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.676 0z"
                />
              </svg>
            </Link>
            <Link href="https://instagram.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.311 3.608 1.287.975.975 1.225 2.242 1.287 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.311 2.633-1.287 3.608-.975.975-2.242 1.225-3.608 1.287-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.311-3.608-1.287-.975-.975-1.225-2.242-1.287-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.311-2.633 1.287-3.608.975-.975 2.242-1.225 3.608-1.287 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.012 7.052.07c-1.688.077-3.188.36-4.392 1.565C1.457 2.771.775 4.271.07 5.949.012 7.052 0 7.462 0 12c0 4.538.012 4.948.07 6.231.077 1.688.36 3.188 1.565 4.392 1.204 1.204 2.704 1.488 4.392 1.565 1.283.058 1.693.07 6.231.07 4.538 0 4.948-.012 6.231-.07 1.688-.077 3.188-.36 4.392-1.565 1.204-1.204 1.488-2.704 1.565-4.392.058-1.283.07-1.693.07-6.231 0-4.538-.012-4.948-.07-6.231-.077-1.688-.36-3.188-1.565-4.392-1.204-1.204-2.704-1.488-4.392-1.565C15.948.012 15.538 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
