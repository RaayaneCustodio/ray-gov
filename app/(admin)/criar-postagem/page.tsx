// // app/(admin)/criar-postagem/page.tsx
// import { useState } from 'react';
// import { db } from '#/lib/firebaseAdmin';
// import { useRouter } from 'next/router';

// export default function CriarPostagemPage() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [link, setLink] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await db.collection('postagens').add({
//         title,
//         content,
//         link,
//         createdAt: new Date(),
//       });
//       alert('Postagem criada com sucesso!');
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Erro ao criar postagem: ', error);
//       alert('Erro ao criar postagem.');
//     }
//   };

//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-2xl font-semibold mb-4">Criar Nova Postagem</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Título</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Conteúdo</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label className="block text-gray-700">Link de Redirecionamento</label>
//           <input
//             type="url"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Criar Postagem
//         </button>
//       </form>
//     </div>
//   );
// }
