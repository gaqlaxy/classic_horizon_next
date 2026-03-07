import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
// import Preloader from "./components/Preloader";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Classic Horizon | Premium Bespoke Travel Experiences",
  description: "Curating extraordinary journeys across the globe. From spiritual retreats to luxury escapes, discover bespoke travel with Classic Horizon.",
  keywords: ["travel agency", "bespoke travel", "luxury tours", "India travel", "international packages"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        {/* <Preloader /> */}
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}


