import React from "react";
import MyCarousel from "#/components/carousel";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full md:w-1/2 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gap-10">Bem-vindo à Gabinete Digital</h1>
        <p className="text-lg mb-6">Sua plataforma para gestão digital eficiente.</p>
      </div>
    </main>
  );
}

