"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { saveLink, fetchInstagramMedia } from '#/lib/links'; // Importa as funções do Instagram
import Image from 'next/image';

interface IFeedItem {
  id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  permalink: string;
  caption?: string; // Adicionei a propriedade caption opcional para armazenar a descrição
}

export default function InstaFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);
  const [instagramLink, setInstagramLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInstaFeed();
  }, []);

  async function getInstaFeed() {
    const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN; 
    const fields = "media_url,media_type,caption,permalink";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    try {
      const { data } = await axios.get(url);
      setFeedList(data.data);
    } catch (error) {
      console.error('Erro ao buscar feed do Instagram:', error);
      setError('Erro ao buscar feed do Instagram.');
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstagramLink(event.target.value);
    setError(null); // Limpa o erro ao começar a digitar um novo link
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await saveLink(instagramLink);
    if (result.success) {
      alert('Link salvo com sucesso!!');
      setInstagramLink('');
      getInstaFeed(); // Atualiza o feed após salvar o link
    } else {
      setError(result.error || 'Erro ao salvar o link.');
    }
  };

  return (
    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
      {feedList.map(item => (
        <li key={item.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0">
            {item.caption && (
              <div className="prose prose-slate prose-sm text-slate-600">
                <p>{item.caption}</p>
              </div>
            )}
            <a
              className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver postagem<span className="sr-only">, Ver postagem</span>
              <svg
                className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path>
              </svg>
            </a>
          </div>
          {item.media_type === "IMAGE" ? (
            <Image
              src={item.media_url}
              alt={item.caption || ""}
              layout="responsive"
              width={640}
              height={640}
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
            />
          ) : (
            <video
              controls
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
            >
              <source src={item.media_url} type="video/mp4" />
            </video>
          )}
        </li>
      ))}
    </ul>
  );
}
