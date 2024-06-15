"use client";
import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Sharing, columns } from "./links/columns";
import { DataTable } from "./links/data-table";
import { database } from "#/firebase"; 

export default function ListLinkPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Sharing[]>([]);
  const [allData, setAllData] = useState<Sharing[]>([]);


  async function getDataByUsername(username: string): Promise<Sharing[]> {
    try {
      const q = query(collection(database, "userActions"), where("firstName", "==", username));
      const querySnapshot = await getDocs(q);

      const data: Sharing[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().firstName || "",
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


  async function getAllData(): Promise<Sharing[]> {
    try {
      const querySnapshot = await getDocs(collection(database, "userActions"));

      const data: Sharing[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().firstName || "",
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

  useEffect(() => {

    if (searchTerm === "") {
      setSearchResults(allData);
    }
  }, [searchTerm, allData]);

  return (
    <div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-1">
            <label htmlFor="username">Insira o nome de usuário</label>
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
