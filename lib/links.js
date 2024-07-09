import { database } from '../firebase'; // Importa a instância do Firestore do arquivo firebase.js

const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

async function fetchInstagramMediaById(mediaId) {
  const mediaResponse = await fetch(`https://graph.instagram.com/${mediaId}?fields=id,media_type,media_url,caption,children&access_token=${accessToken}`);
  return await mediaResponse.json();
}

async function fetchMediaChildren(children) {
  const childMediaPromises = children.data.map(async (child) => {
    const childMediaResponse = await fetchInstagramMediaById(child.id);
    return {
      mediaId: childMediaResponse.id,
      imageUrl: childMediaResponse.media_url,
      description: childMediaResponse.caption || '',
      mediaType: childMediaResponse.media_type,
    };
  });

  return await Promise.all(childMediaPromises);
}

export async function saveLink(instagramLink) {
  try {
    const response = await fetch(`https://graph.instagram.com/me/media?access_token=${accessToken}&fields=media_url,media_type,caption,permalink,children`);
    const data = await response.json();

    let mediaItem = data.data.find(item => item.permalink === instagramLink);

    if (!mediaItem) {
      const alternateLink = instagramLink.replace("/p/", "/reel/");
      mediaItem = data.data.find(item => item.permalink === alternateLink);
    }

    if (!mediaItem) {
      const alternateLink = instagramLink.split("?img_index")[0];
      mediaItem = data.data.find(item => item.permalink === alternateLink);
    }

    if (!mediaItem) {
      throw new Error('Link não encontrado no Instagram');
    }

    const mediaId = mediaItem.id;
    const mediaData = {
      link: instagramLink,
      id: mediaId,
      mediaType: mediaItem.media_type,
      mediaUrl: mediaItem.media_url,
      description: mediaItem.caption || '',
    };

    // Verifica se a mídia é um carrossel e salva as mídias individuais
    if (mediaItem.media_type === 'CAROUSEL_ALBUM' && mediaItem.children) {
      mediaData.children = await fetchMediaChildren(mediaItem.children);
    }

    await database.collection('instagramLinks').add(mediaData);

    return { success: true, message: 'Link salvo com sucesso' };
  } catch (error) {
    console.error('Erro ao salvar link:', error);
    return { success: false, error: 'Erro ao salvar link.' };
  }
}

export async function fetchInstagramMedia() {
  try {
    const linksSnapshot = await database.collection('instagramLinks').get();
    const linkInfoList = linksSnapshot.docs.map((doc) => doc.data());

    const detailedMediaInfoPromises = linkInfoList.map(async (mediaData) => {
      if (mediaData.mediaType === 'CAROUSEL_ALBUM' && mediaData.children) {
        const children = await fetchMediaChildren({ data: mediaData.children });
        return {
          mediaId: mediaData.id,
          mediaUrl: mediaData.mediaUrl,
          description: mediaData.description,
          mediaType: mediaData.mediaType,
          children,
        };
      } else {
        return {
          mediaId: mediaData.id,
          mediaUrl: mediaData.mediaUrl,
          description: mediaData.description,
          mediaType: mediaData.mediaType,
        };
      }
    });

    const detailedMediaInfo = await Promise.all(detailedMediaInfoPromises);

    return { success: true, data: detailedMediaInfo };
  } catch (error) {
    console.error('Erro ao buscar links:', error);
    return { success: false, error: 'Erro ao buscar links.' };
  }
}
