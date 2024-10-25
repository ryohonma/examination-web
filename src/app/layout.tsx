import { AccountProvider } from "@luna/context/account/account";
import { AuthUserProvider } from "@luna/context/auth-user/auth-user";
import { DialogProvider } from "@luna/context/dialog/dialog";
import { SnackbarProvider } from "@luna/context/snackbar/snackbar";
import { generateMetadata } from "@luna/lib/generate-metadata";
import { M_PLUS_1 } from "next/font/google";
import { Footer } from "./_components/organisms/footer/footer";
import { Header } from "./_components/organisms/header/header";
import { Menu } from "./_components/organisms/menu/menu";
import { RouteHandler } from "./_components/utils/route-handler";
import "./globals.scss";

const mplus1 = M_PLUS_1({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mplus1",
  display: "swap",
});

export const metadata = generateMetadata({
  title: "post-distribution-web",
  description: "投稿配信サイト",
  openGraph: {
    description: "投稿配信サイト",
    url: "https://luna-examination-web.vercel.app/timelines",
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
          <DialogProvider>
            <SnackbarProvider>
              <AuthUserProvider>
                <AccountProvider>
                  <RouteHandler>
                    <Menu />
                    {children}
                  </RouteHandler>
                </AccountProvider>
              </AuthUserProvider>
            </SnackbarProvider>
          </DialogProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
