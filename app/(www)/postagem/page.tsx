import React from "react";
import MyCarousel from "#/components/carousel";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full md:w-1/2 text-center space-y-6">
        <MyCarousel />
      </div>
    </main>
  );
}

