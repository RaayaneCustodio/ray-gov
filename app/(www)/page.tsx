import React from "react";
import MyCarousel from "#/components/carousel";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full md:w-1/2 text-center space-y-6">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/compartilhai.appspot.com/o/logo%20elizabeth%20branca-1.png?alt=media&token=e2818b58-0551-483d-a5bd-d7059c3f2b7c" // Usando a imagem importada
          alt="Logo"
          width={500}
          height={300}
          className="w-full h-auto rounded cursor-pointer transition hover:opacity-90"
        />
      </div>
    </main>
  );
}

