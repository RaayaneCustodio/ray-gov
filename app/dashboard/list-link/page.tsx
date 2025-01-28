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

  // Função para formatar a data e hora do Firebase
  function formatFirebaseDate(firebaseDate: string): string {
    if (!firebaseDate) return "Data não disponível";

    const date = new Date(firebaseDate);

    if (isNaN(date.getTime())) return "Data inválida";

    const formattedDate = date.toLocaleDateString("pt-BR"); // Formata a data no estilo brasileiro
    const formattedTime = date.toLocaleTimeString("pt-BR"); // Formata a hora no estilo brasileiro

    return `Data: ${formattedDate}, Hora: ${formattedTime}`;
  }

  // Função para buscar todos os dados no Firestore
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
        timestamp: doc.data().timestamp || "", // Mantém o formato original para ordenação
        userId: doc.data().userId || "",
      }));

      // Ordenar os dados pela data e hora do timestamp (mais recente primeiro)
      data.sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return dateB - dateA; // Mais recente vem primeiro
      });

      // Formatar o timestamp para exibição
      return data.map(item => ({
        ...item,
        timestamp: formatFirebaseDate(item.timestamp),
      }));
    } catch (error) {
      console.error("Erro ao buscar todos os dados:", error);
      return [];
    }
  }

  // Função para buscar dados no Firestore com base em vários campos
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
          timestamp: doc.data().timestamp || "", // Mantém o formato original para ordenação
          userId: doc.data().userId || "",
        }));

      // Ordenar os dados pela data e hora do timestamp (mais recente primeiro)
      data.sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return dateB - dateA; // Mais recente vem primeiro
      });

      // Formatar o timestamp para exibição
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

    try {
      const data = await getDataByUsername(username);
      setSearchResults(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllData();
        setAllData(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Erro ao buscar todos os dados:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(allData);
    } else {
      const filteredData = allData.filter(item =>
        `${item.name} ${item.lastName} ${item.status} ${item.postagem}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredData);
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