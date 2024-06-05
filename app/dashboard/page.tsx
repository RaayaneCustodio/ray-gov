import React, { useEffect } from 'react';
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUsers } from '../../lib/clerk';
import Image from 'next/image';


export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) {
        return <div>Você precisa estar logado para acessar esta página.</div>;
    }


    const user = await currentUser();
    // console.log('Usuário:', user);

    const users = await getUsers();
    console.log('Usuários:', users);

    

    return (
        <div className="">
            <div className="grid gap-4 ">
                <div className="p-4">
                    <h2 className="flex text-2xl font-semibold mb-4 text-center">Bem-vindo, {user?.firstName}</h2>
                    <div className="flex flex-col items-start gap-5 lg:flex-row">
                        <div className="bg-white rounded shadow p-4 w-full">
                            <h3 className="text-lg font-semibold mb-2">Usuários Registrados Recentemente</h3>
                            <ul>
                                {users && users.length > 0 && users.map((user: any) => {
                                    const timestamp = new Date(user.email_addresses[0].created_at)
                                    const day = timestamp.getUTCDate();
                                    const month = timestamp.getUTCMonth() + 1; // Os meses em JavaScript são baseados em zero
                                    const year = timestamp.getUTCFullYear();
                                    const hours = timestamp.getUTCHours();
                                    const minutes = timestamp.getUTCMinutes();
                                    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
                                    return (
                                        // <pre>{JSON.stringify(users,null,2)}</pre>
                                        <li key={user.id} className="flex gap-2 border-b py-2">
                                            <Image src={user.profile_image_url} alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" width={40} height={40} />
                                            <div>
                                                <span className="block text-gray-800">{user.first_name} {user.last_name}</span>
                                                <span className="block text-gray-600">{user.email_addresses[0].email_address}</span>
                                                <span className="block text-gray-600">{formattedDate}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="bg-white rounded shadow p-4 w-full">
                            <h3 className="text-lg font-semibold mb-2">Usuários Logados Recentemente</h3>
                            <ul>
                                {users && users.length > 0 && users.map((user: any) => {
                                    const timestamp = new Date(user.last_sign_in_at)
                                    const day = timestamp.getUTCDate();
                                    const month = timestamp.getUTCMonth() + 1; // Os meses em JavaScript são baseados em zero
                                    const year = timestamp.getUTCFullYear();
                                    const hours = timestamp.getUTCHours();
                                    const minutes = timestamp.getUTCMinutes();
                                    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
                                    return (
                                        // <pre>{JSON.stringify(users,null,2)}</pre>
                                        <li key={user.id} className="flex gap-2 border-b py-2">
                                            <Image src={user.profile_image_url} alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" width={40} height={40} />
                                            <div>
                                                <span className="block text-gray-800">{user.first_name} {user.last_name}</span>
                                                <span className="block text-gray-600">{user.email_addresses[0].email_address}</span>
                                                <span className="block text-gray-600">{formattedDate}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
