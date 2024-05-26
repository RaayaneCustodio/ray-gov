import React, { useEffect } from 'react';
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUsers } from '../../lib/clerk';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    emailAddress: string;
    profile_image_url: string; 
}

export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) {
        return <div>Você precisa estar logado para acessar esta página.</div>;
    }

    const user = await currentUser();
    console.log('Usuário:', user);

    const users: User[] = await getUsers();
    console.log('Usuários:', users);

    return (
        <div className="">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-10 p-4">
                    <h2 className="text-2xl font-semibold mb-4">Bem-vindo, {user?.firstName}</h2>
                    <div className="bg-white rounded shadow p-4">
                        <h3 className="text-lg font-semibold mb-2">Usuários Registrados</h3>
                        <ul>
                            {users && users.length > 0 && users.map((user) => (
                                <li key={user.id} className="border-b py-2">
                                    <img src={user.profile_image_url} alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" />
                                    <span className="text-gray-800">{user.first_name} {user.last_name}</span>
                                    <span className="text-gray-600">{user.emailAddress}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
