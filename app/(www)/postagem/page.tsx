"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { database } from "#/firebase";
import Image from 'next/image';

interface IFeedItem {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  caption?: string;
  children?: IFeedItem[];
}

export default function InstaFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    getInstaFeed();
  }, []);

  async function getInstaFeed() {
    const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const fields = "media_url,media_type,caption,permalink,children{media_url,media_type,permalink,caption}";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    try {
      const { data } = await axios.get(url);
      setFeedList(data.data);
    } catch (error) {
      console.error('Erro ao buscar feed do Instagram:', error);
      setError('Erro ao buscar feed do Instagram.');
    }
  }

  const saveUserDataAndRedirect = async (item: IFeedItem) => {
    if (!user?.id || !user?.firstName || !user?.emailAddresses?.[0]?.emailAddress) {
      alert("Você precisa estar logado para compartilhar.");
      return;
    }

    const userData = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: user.emailAddresses[0].emailAddress,
      timestamp: new Date().toISOString(),
      action: "Clicou no Botao Compartilhar",
      postId: item.id,
      postLink: item.permalink,
      postagem: item.caption || ""
    };

    try {
      // Cria um documento único com um identificador específico da postagem e do usuário
      const userDocRef = doc(database, "userActions", `${user.id}_${item.id}`);
      await setDoc(userDocRef, userData);
      console.log("Informação de compartilhamento salva com sucesso!");
      window.location.href = item.permalink; // Redireciona para a publicação no Instagram
    } catch (error) {
      console.error("Erro ao salvar a informação de compartilhamento:", error);
      alert("Erro ao salvar a informação de compartilhamento.");
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
            <button
              className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
              onClick={() => saveUserDataAndRedirect(item)}
            >
              Compartilhar
            </button>
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
          ) : item.media_type === "VIDEO" ? (
            <video
              controls
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
            >
              <source src={item.media_url} type="video/mp4" />
            </video>
          ) : (
            item.children?.map(child => (
              <div key={child.id} className="w-full">
                {child.media_type === "IMAGE" ? (
                  <Image
                    src={child.media_url}
                    alt={child.caption || ""}
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
                    <source src={child.media_url} type="video/mp4" />
                  </video>
                )}
              </div>
            ))
          )}
        </li>
      ))}
    </ul>
  );
}
