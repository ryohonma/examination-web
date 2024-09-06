import { AuthUserProvider } from "@luna/context/auth-user-context";
import { generateMetadata } from "@luna/lib/generate-metadata";
import { M_PLUS_1 } from "next/font/google";
import { Footer } from "./_components/organisms/footer/footer";
import { Header } from "./_components/organisms/header/header";
import { AuthRouteHandler } from "./_components/utils/auth-route-handler";
import "./globals.scss";

const mplus1 = M_PLUS_1({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mplus1",
  display: "swap",
});

export const metadata = generateMetadata({
  title: "【テストサイト】ryohonma-dev",
  description:
    "luna様への課題提出用のテストサイトです",
  keywords:
    "ryohonma, luna, 課題提出",
  openGraph: {
    description:
      "luna様への課題提出用のテストサイトです",
    url: "https://example.com/",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mplus1.variable}`}>
        <Header />
        <main>
          <AuthUserProvider>
            <AuthRouteHandler>{children}</AuthRouteHandler>
          </AuthUserProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
