"use client";
import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, setDoc } from "firebase/firestore";
import { database } from "#/firebase";

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
      alert("Informação de compartilhamento salva com sucesso!");
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
          <button 
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={saveUserData}
          >
            Compartilhar
          </button>
        </div>
      </div>
    </main>
  );
}
