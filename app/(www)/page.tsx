import React from "react";
import MyCarousel from "#/components/carousel";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-6 space-y-6 md:space-y-0">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bem-vindo à Gabinete Digital</h1>
          <p className="text-lg mb-6">Sua plataforma para gestão digital eficiente.</p>
        </div>
        <div className="md:w-1/2 flex flex-col items-center">
          <MyCarousel />
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Compartilhar
          </button>
        </div>
      </div>
    </main>
  );
}
