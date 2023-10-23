import { ReduxProvider } from "../redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./module/NavBar";
import Footer from "./module/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ad Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <ReduxProvider>
          <NavBar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
