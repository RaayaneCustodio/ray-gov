import React, { useEffect } from 'react';
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUsers } from '../../lib/clerk';
import Image from 'next/image';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) {
        return <div>Você precisa estar logado para acessar esta página.</div>;
    }

    const user = await currentUser();
    // console.log('Usuário:', user);

    const users = await getUsers();
    console.log('Usuários:', users);

    function formatTimestamp(timestamp: string): string {
        // Converter timestamp para um objeto Date
        const date = new Date(timestamp);
    
        // Formatar a data e hora para o formato desejado e no fuso horário de Brasília
        const formattedDate = format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    
        return formattedDate;
      }

    return (
        <div className="">
            <div className="grid gap-4 ">
                <div className="p-4">
                    <h2 className="flex text-2xl font-semibold mb-4 text-center">Bem-vindo, {user?.firstName}</h2>
                    <div className="flex flex-col items-start gap-5 lg:flex-row">
                        <div className="bg-white rounded shadow p-4 w-full">
                            <h3 className="text-lg font-semibold mb-2">Usuários Registrados Recentemente:</h3>
                            <ul>
                                {users && users.length > 0 && users.map((user: any) => {
                                    const formattedDate = formatTimestamp(user.email_addresses[0].created_at);
                                    return (
                                        <li key={user.id} className="flex gap-2 border-b py-2">
                                            <Image src={user.image_url} alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" width={40} height={40} />
                                            <div>
                                                <span className="block text-gray-800">{user.first_name} {user.last_name}</span>
                                                <span className="block text-gray-600">{user.email_addresses[0].email_address}</span>
                                                <span className="block text-gray-600">{formattedDate}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="bg-white rounded shadow p-4 w-full">
                            <h3 className="text-lg font-semibold mb-2">Usuários Logados Recentemente</h3>
                            <ul>0
                                {users && users.length > 0 && users.map((user: any) => {
                                    const formattedDate = formatTimestamp(user.last_sign_in_at);
                                    return (
                                        <li key={user.id} className="flex gap-2 border-b py-2">
                                            <Image src={user.image_url} alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" width={40} height={40} />
                                            <div>
                                                <span className="block text-gray-800">{user.first_name} {user.last_name}</span>
                                                <span className="block text-gray-600">{user.email_addresses[0].email_address}</span>
                                                <span className="block text-gray-600">{formattedDate}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
