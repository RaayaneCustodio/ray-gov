import React from "react";
import MyCarousel from "#/components/carousel";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full md:w-1/2 text-center space-y-6">
        <Link href="https://www.instagram.com/reel/C8P35I4u_yo/?igsh=MW93MGx6cHdibDNqaQ%3D%3D">
          <MyCarousel />
        </Link>
      </div>
    </main>
  );
}

