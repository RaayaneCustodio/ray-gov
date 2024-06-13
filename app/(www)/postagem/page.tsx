// app/(www)/postagem/page.tsx
"use client";
import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import MyCarousel from "#/components/carousel";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PostagemPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleShareClick = async () => {
    if (!user?.id || !user?.firstName) {
      alert("Você precisa estar logado para compartilhar.");
      return;
    }

    try {
      const response = await fetch('/api/registerShareAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id, 
          userName: `${user.firstName} ${user.lastName}`, 
          userEmail: user.emailAddresses[0].emailAddress 
        }),
      });

      if (response.ok) {
        alert("Compartilhamento registrado!");
      } else {
        alert("Erro ao registrar compartilhamento.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao registrar compartilhamento.");
    }
  };

  if (!isSignedIn) {
    return <div>Você precisa estar logado para acessar esta página.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo, {user?.firstName}</h2>
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="w-full">
            <MyCarousel />
          </div>
          <button 
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleShareClick}
          >
            Compartilhar
          </button>
        </div>
      </div>
    </main>
  );
}
