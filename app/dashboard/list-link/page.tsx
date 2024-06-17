"use client"
import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { collection, query, where, getDocs } from "firebase/firestore";
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
          postagem: doc.data().postagem || "",
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
        postagem: doc.data().postagem || "",
        timestamp: formatTimestamp(doc.data().timestamp),
        userId: doc.data().userId || "",
      }));

      return data;
    } catch (error) {
      console.error("Erro ao buscar todos os dados:", error);
      return [];
    }
  }

  // Lidar com a mudança no campo de busca
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

  // Buscar todos os dados quando o usuário está autenticado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        setAllData(data);
      } catch (error) {
        console.error("Erro ao buscar todos os dados:", error);
      }
    };

    if (isSignedIn) {
      fetchData();
    }
  }, [isSignedIn]);

  // Atualizar os resultados da pesquisa quando o termo de busca ou todos os dados mudarem
  useEffect(() => {
    // Se o termo de busca estiver vazio, mostrar todos os dados
    if (searchTerm === "") {
      setSearchResults(allData);
    } else {
      // Caso contrário, filtrar os resultados de acordo com o termo de busca
      const filteredData = allData.filter(item =>
        `${item.name} ${item.lastName}${item.status} ${item.postagem}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredData);
    }
  }, [searchTerm, allData]);

  return (
    <div>
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div className="grid gap-1">
            <label htmlFor="username">Buscar</label>
            <input
              type="text"
              id="username"
              className="h-full border p-3 rounded"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <DataTable columns={columns} data={searchResults} />
    </div>
  );
}
