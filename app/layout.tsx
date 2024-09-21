import type { Metadata } from "next";
import "./globals.css";
import 'prismjs/themes/prism-funky.css';
import { Provider } from "@/components/Provider";
import AppBar from "@/components/AppBar";

export const metadata: Metadata = {
  title: "CoSnippet",
  description: "CoSnippet is a platform where you can discover and share code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Provider>
          <AppBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
