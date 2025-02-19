import { Inter } from "next/font/google";
import Hero from "./components/hero";
import Stat from "./components/stat";
import Levels from "./components/levels";
import Banner from "./components/banner";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <div className={`min-h-screen ${inter.className}  bg-gray-50`}>
      <Hero />
      <Stat />
      <Levels />

      <Banner />
    </div>
  );
}
