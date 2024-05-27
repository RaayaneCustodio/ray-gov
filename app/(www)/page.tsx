import Image from "next/image";
import { Header } from "../components/header";
import MyCarousel from "#/components/carousel";


export default function Home() {
  return (
    
    <main className="h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#1a202c", color: "#FFFFFF" }}>
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-6">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Bem-vindo à Gabinete Digital</h1>
        <p className="text-lg mb-6">Sua plataforma para gestão digital eficiente.</p>
    </div>
      <div className="md:w-1/2">
        <MyCarousel/>
      </div>
    </div>
  </main>
  );
}
