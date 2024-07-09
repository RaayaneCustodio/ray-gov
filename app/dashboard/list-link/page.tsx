"use client";
import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sharing, columns } from "./links/columns";
import { DataTable } from "./links/data-table";
import { database } from "#/firebase";

export default function ListLinkPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Sharing[]>([]);
  const [allData, setAllData] = useState<Sharing[]>([]);

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
          postagem: doc.data().postagem || "",  // Verifique se `postagem` está sendo lido
          timestamp: doc.data().timestamp || "",
          userId: doc.data().userId || "",
        }));

      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  }

  function formatTimestamp(timestamp: string): string {
    // Converter timestamp para um objeto Date
    const date = new Date(timestamp);

    // Formatar a data e hora para o formato desejado e no fuso horário de Brasília
    const formattedDate = format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

    return formattedDate;
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
        postagem: doc.data().postagem || "",  // Verifique se isso está sendo lido
        timestamp: formatTimestamp(doc.data().timestamp),
        userId: doc.data().userId || "",
      }));

      return data;
    } catch (error) {
      console.error("Erro ao buscar todos os dados:", error);
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
    // Se o termo de busca estiver vazio, mostrar todos os dados
    if (searchTerm === "") {
      setSearchResults(allData);
    } else {
      // Caso contrário, filtrar os resultados de acordo com o termo de busca
      const filteredData = allData.filter(item =>
        `${item.name} ${item.lastName} ${item.status} ${item.postagem}`  // Verifique o campo `postagem` aqui
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
