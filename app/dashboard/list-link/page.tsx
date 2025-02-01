"use client";
import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { Sharing, columns } from "./links/columns";
import { DataTable } from "./links/data-table";
import { database } from "#/firebase";

export default function ListLinkPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Sharing[]>([]);
  const [allData, setAllData] = useState<Sharing[]>([]);

  function formatFirebaseDate(firebaseDate: string): string {
    if (!firebaseDate) return "Data não disponível";
    const date = new Date(firebaseDate);
    if (isNaN(date.getTime())) return "Data inválida";
    const formattedDate = date.toLocaleDateString("pt-BR");
    const formattedTime = date.toLocaleTimeString("pt-BR");
    return `Data: ${formattedDate}, Hora: ${formattedTime}`;
  }

  async function getAllData(): Promise<Sharing[]> {
    try {
      const querySnapshot = await getDocs(collection(database, "userActions"));
      const data: Sharing[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().firstName || "",
        lastName: doc.data().lastName || "",
        status: doc.data().action || "",
        email: doc.data().email || "",
        postagem: doc.data().postagem || "",
        timestamp: doc.data().timestamp || "",
        userId: doc.data().userId || "",
      }));

      data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return data.map(item => ({
        ...item,
        timestamp: formatFirebaseDate(item.timestamp),
      }));
    } catch (error) {
      console.error("Erro ao buscar todos os dados:", error);
      return [];
    }
  }

  async function getDataByUsername(username: string): Promise<Sharing[]> {
    try {
      const querySnapshot = await getDocs(collection(database, "userActions"));
      const data: Sharing[] = querySnapshot.docs
        .filter(doc => {
          const fullName = `${doc.data().firstName} ${doc.data().lastName}`.toLowerCase();
          return fullName.includes(username.toLowerCase());
        })
        .map(doc => ({
          id: doc.id,
          name: doc.data().firstName || "",
          lastName: doc.data().lastName || "",
          status: doc.data().action || "",
          email: doc.data().email || "",
          postagem: doc.data().postagem || "",
          timestamp: doc.data().timestamp || "",
          userId: doc.data().userId || "",
        }));

      data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return data.map(item => ({
        ...item,
        timestamp: formatFirebaseDate(item.timestamp),
      }));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setSearchTerm(username);

    if (username === "") {
      setSearchResults(allData); // Se a busca estiver vazia, mostra todos os dados
    } else {
      try {
        const data = await getDataByUsername(username);
        setSearchResults(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllData();
        setAllData(data);
        setSearchResults(data); // Preenche a tabela inicial com todos os dados
      } catch (error) {
        console.error("Erro ao buscar todos os dados:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(allData); // Mostra todos os dados quando a busca está vazia
    }
  }, [searchTerm, allData]);

  if (!isSignedIn) {
    return <p>Você precisa estar logado para acessar esta página.</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do usuário para pesquisar..."
        value={searchTerm}
        onChange={handleChange}
      />
      <DataTable columns={columns} data={searchResults} />
    </div>
  );
}
