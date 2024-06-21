import { database } from '../firebase'; // Importa a instância do Firestore do arquivo firebase.js

const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

export async function saveLink(instagramLink) {
  try {
    const response = await fetch(`https://graph.instagram.com/me/media?access_token=${accessToken}&fields=media_url,media_type,caption,permalink`);
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
    await database.collection('instagramLinks').add({ link: instagramLink, id: mediaId });

    return { success: true, message: 'Link salvo com sucesso' };
  } catch (error) {
    console.error('Erro ao salvar link:', error);
    return { success: false, error: 'Erro ao salvar link.' };
  }
}

export async function fetchInstagramMedia() {
  try {
    const linksSnapshot = await database.collection('instagramLinks').get();
    const mediaIds = linksSnapshot.docs.map((doc) => doc.data().id);

    // Busca informações das mídias do Instagram baseadas nos IDs armazenados
    const linkInfoPromises = mediaIds.map(async (mediaId) => {
      const mediaResponse = await fetch(`https://graph.instagram.com/${mediaId}?fields=id,media_type,media_url,caption&access_token=${accessToken}`);
      const mediaInfo = await mediaResponse.json();
      return {
        mediaId,
        imageUrl: mediaInfo.media_url,
        description: mediaInfo.caption || '',
        mediaType: mediaInfo.media_type,
      };
    });

    const linkInfoList = await Promise.all(linkInfoPromises);
    return { success: true, data: linkInfoList };
  } catch (error) {
    console.error('Erro ao buscar links:', error);
    return { success: false, error: 'Erro ao buscar links.' };
  }
}
