import React from "react";
import Image from "next/image";
import juliokuller from "../components/svgs/juliokuller.png"; // Importando a imagem

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full md:w-1/2 text-center space-y-6">
        <Image
          src={juliokuller} // Referenciando a imagem importada
          alt="Imagem Julio"
          width={500}
          height={300}
          className="w-full h-auto rounded cursor-pointer transition hover:opacity-90"
        />
      </div>
    </main>
  );
}
