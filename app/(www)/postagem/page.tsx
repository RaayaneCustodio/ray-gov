"use client";
import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, setDoc } from "firebase/firestore";
import { database } from "#/firebase";
import Link from 'next/link'; 
import Image from 'next/image'; 

export default function PostagemPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const saveUserData = async () => {
    if (!user?.id || !user?.firstName || !user?.emailAddresses?.[0]?.emailAddress) {
      alert("Você precisa estar logado para compartilhar.");
      return;
    }

    const userData = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: user.emailAddresses[0].emailAddress,
      timestamp: new Date().toISOString(),
      action: "Clicou no Botao Compartilhar"
    };

    try {
      const userDocRef = doc(database, "userActions", user.id);
      await setDoc(userDocRef, userData, { merge: true });
      console.log("Informação de compartilhamento salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a informação de compartilhamento:", error);
      alert("Erro ao salvar a informação de compartilhamento.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo, {user?.firstName}</h2>
        <div className="md:w-1/2 flex flex-col items-center">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/compartilhai.appspot.com/o/elizabeth.jpg?alt=media&token=e1e420a6-778c-4323-a14f-543e3ffd4418" // Usando a imagem importada
            alt="Imagem da postagem"
            width={500}
            height={300} 
            className="w-full h-auto rounded cursor-pointer transition hover:opacity-90"
          />
          <Link href="https://www.instagram.com/reel/C8P35I4u_yo/?igsh=MW93MGx6cHdibDNqaQ%3D%3D">
            <button
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={saveUserData}
            >
              Compartilhar
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
