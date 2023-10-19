import { ReduxProvider } from "../redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./module/NavBar";
import Footer from "./module/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <ReduxProvider>
          <NavBar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
