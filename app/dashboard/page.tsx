import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUsers } from "../../lib/clerk";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) {
        return <div>Você precisa estar logado para acessar esta página.</div>;
    }

    const user = await currentUser();
    const users = await getUsers();

    function formatTimestamp(timestamp: string | null): string {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Bem-vindo, {user?.firstName || "Usuário"}
            </h2>

            <div className="grid gap-5 lg:flex">
                {/* Usuários Registrados Recentemente */}
                <div className="bg-white rounded shadow p-4 w-full">
                    <h3 className="text-lg font-semibold mb-2">Usuários Registrados Recentemente:</h3>
                    <ul>
                        {users && users.length > 0 ? (
                            users.map((user: any) => {
                                const emailData = user.email_addresses?.[0];
                                const formattedDate = formatTimestamp(user.created_at);
                                return (
                                    <li key={user.id} className="flex gap-2 border-b py-2">
                                        <Image
                                            src={user.image_url}
                                            alt="Foto de perfil"
                                            className="w-10 h-10 rounded-full mr-2"
                                            width={40}
                                            height={40}
                                        />
                                        <div>
                                            <span className="block text-gray-800">
                                                {user.first_name || "Nome não disponível"} {user.last_name || ""}
                                            </span>
                                            <span className="block text-gray-600">
                                                {emailData?.email_address || "Sem e-mail"}
                                            </span>
                                            <span className="block text-gray-600">Criado em: {formattedDate}</span>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <p>Nenhum usuário encontrado.</p>
                        )}
                    </ul>
                </div>

                {/* Todos os Usuários com Informações Detalhadas */}
                <div className="bg-white rounded shadow p-4 w-full">
                    <h3 className="text-lg font-semibold mb-2">Todos os Usuários:</h3>
                    <ul>
                        {users && users.length > 0 ? (
                            users.map((user: any) => {
                                const emailData = user.email_addresses?.[0];
                                const createdDate = formatTimestamp(user.created_at);
                                const lastSharedDate = user.lastShared
                                    ? formatTimestamp(user.lastShared)
                                    : "Nunca compartilhou";
                                
                                // Aqui adicionamos a postagem compartilhada e o timestamp dela
                                const postContent = user?.postagem || "Nenhuma postagem";
                                const postTimestamp = user?.postDate ? formatTimestamp(user?.postDate) : "Data não disponível";

                                return (
                                    <li key={user.id} className="flex gap-2 border-b py-2">
                                        <Image
                                            src={user.image_url}
                                            alt="Foto de perfil"
                                            className="w-10 h-10 rounded-full mr-2"
                                            width={40}
                                            height={40}
                                        />
                                        <div>
                                            <span className="block text-gray-800">
                                                {user.first_name || "Nome não disponível"} {user.last_name || ""}
                                            </span>
                                            <span className="block text-gray-600">
                                                {emailData?.email_address || "Sem e-mail"}
                                            </span>
                                            <span className="block text-gray-600">Criado em: {createdDate}</span>
                                            <span className="block text-gray-600">Última vez compartilhado: {lastSharedDate}</span>
                                            <span className="block text-gray-600">Postagem: {postContent}</span>
                                            <span className="block text-gray-600">Postado em: {postTimestamp}</span>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <p>Nenhum usuário encontrado.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
