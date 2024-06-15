// import React, { useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { doc, setDoc } from "firebase/firestore";
// import { database } from "#/firebase";

// export default function PostagemPage() {
//   const { user } = useUser();
//   const [nomePost, setNomePost] = useState("");
//   const [descricao, setDescricao] = useState("");
//   const [linkRedirecionamento, setLinkRedirecionamento] = useState("");

//   const handleSubmit = async () => {
    

//     if (!user?.id || !user?.firstName || !user?.emailAddresses?.[0]?.emailAddress) {
//       alert("Você precisa estar logado para criar uma postagem.");
//       return;
//     }

//     const postData = {
//       nomePost,
//       descricao,
//       linkRedirecionamento,
//       userId: user.id,
//       authorName: `${user.firstName} ${user.lastName || ""}`,
//       authorEmail: user.emailAddresses[0].emailAddress,
//       timestamp: new Date().toISOString(),
//       action: "Criou uma nova postagem",
//     };

//     try {
//       const docRef = doc(database, "posts"); // Referência ao documento de coleção "posts"
//       await setDoc(docRef, postData);
//       alert("Postagem criada com sucesso!");
//       // Limpar campos após o envio bem-sucedido
//       setNomePost("");
//       setDescricao("");
//       setLinkRedirecionamento("");
//     } catch (error) {
//       console.error("Erro ao criar a postagem:", error);
//       alert("Erro ao criar a postagem.");
//     }
//   };

//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-2xl font-semibold mb-4">Criar Nova Postagem</h2>
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
//         <div className="mb-4">
//           <label htmlFor="nomePost" className="block text-sm font-medium text-gray-700">
//             Nome do Post
//           </label>
//           <input
//             type="text"
//             id="nomePost"
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={nomePost}
//             onChange={(e) => setNomePost(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
//             Descrição
//           </label>
//           <textarea
//             id="descricao"
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={descricao}
//             onChange={(e) => setDescricao(e.target.value)}
//             rows="4"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="linkRedirecionamento" className="block text-sm font-medium text-gray-700">
//             Link de Redirecionamento
//           </label>
//           <input
//             type="text"
//             id="linkRedirecionamento"
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={linkRedirecionamento}
//             onChange={(e) => setLinkRedirecionamento(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Salvar Postagem
//         </button>
//       </form>
//     </div>
//   );
// }
