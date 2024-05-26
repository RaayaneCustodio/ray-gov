import Image from "next/image";
import { Header } from "../components/header";
import MyCarousel from "#/components/carousel";


export default function Home() {
  return (
    
    <main className="h-screen flex flex-col items-center justify-center">
      <div>
          <h1>Postagens.</h1>
      </div>
      <div className="mt-4 w-full flex justify-center"> 
        <MyCarousel />
      </div>
    </main>
  );
}
