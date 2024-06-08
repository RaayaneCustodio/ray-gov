import { auth, currentUser } from "@clerk/nextjs/server";
import { getUsers } from '#/lib/clerk';
import MyCarousel from "#/components/carousel";

export default async function PostagemPage() {
  const { userId } = auth();
  if (!userId) {
    return <div>Você precisa estar logado para acessar esta página.</div>;
  }
  const user = await currentUser();
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo, {user?.firstName}</h2>
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="w-full">
            <MyCarousel />
          </div>
          {/* <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Compartilhar
          </button> */}
        </div>
        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Criar Postagem
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estrutura para exibir postagens */}
          <div className="bg-gray-800 p-6 rounded-lg">
            {/* Adicione aqui a estrutura para exibir cada postagem */}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            {/* Adicione aqui a estrutura para exibir cada postagem */}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            {/* Adicione aqui a estrutura para exibir cada postagem */}
          </div>
        </div>
      </div>
    </main>
  );
}
