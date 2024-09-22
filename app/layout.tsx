import type { Metadata } from "next";
import "./globals.css";
import 'prismjs/themes/prism-funky.css';
import { Provider } from "@/components/Provider";
import AppBar from "@/components/AppBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer
            theme="dark"
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            stacked={true}
            pauseOnHover={false}
          />
        </Provider>
      </body>
    </html>
  );
}
