import { AuthUserProvider } from "@luna/context/auth-user-context";
import { generateMetadata } from "@luna/lib/generate-metadata";
import localFont from "next/font/local";
import { AuthRouteHandler } from "./_components/utils/auth-route-handler";
import "./globals.scss";

const geistSans = localFont({
  src: "./src/_assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./src/_assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthUserProvider>
          <AuthRouteHandler>{children}</AuthRouteHandler>
        </AuthUserProvider>
      </body>
    </html>
  );
}
