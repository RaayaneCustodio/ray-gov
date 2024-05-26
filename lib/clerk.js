import axios from 'axios';

const apiKey = process.env.CLERK_SECRET_KEY;
const clerkBaseUrl = 'https://api.clerk.com/v1';

const axiosInstance = axios.create({
    baseURL: clerkBaseUrl,
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
});

export async function getUsers() {
    try {
        const response = await axiosInstance.get('/users');
        const responseData = response.data;
        if (responseData && responseData.length > 0) {
            const usersWithProfileImages = responseData.map(user => ({
                ...user,
                profileImageUrl: `${clerkBaseUrl}/users/${user.id}/profile-image`
            }));
            return usersWithProfileImages;
        } else {
            console.error('Nenhum usuário encontrado');
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return [];
    }
}

export async function getUserLogins(userId) {
    try {
        const response = await axiosInstance.get(`/users/${userId}`);
        const responseData = response.data;
        if (responseData && responseData.length > 0) {
            return responseData;
        } else {
            console.error('Nenhum log de login encontrado');
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar eventos de login:", error);
        return [];
    }
}

export async function getUserByEmailId(emailId) {
    try {
        const response = await axiosInstance.get(`/users?email_address=${emailId}`);
        const responseData = response.data;
        if (responseData && responseData.length > 0) {
            return responseData[0];
        } else {
            console.error('Usuário não encontrado para o ID da conta de e-mail:', emailId);
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar usuário pelo ID da conta de e-mail:", error);
        return null;
    }
}

export async function exportUsers() {
    try {
        const response = await axiosInstance.post('/users/export');
        const exportJobId = response.data.id;
        console.log('ID do trabalho de exportação:', exportJobId);

        let status = '';
        do {
            const statusResponse = await axiosInstance.get(`/users/export/${exportJobId}`);
            status = statusResponse.data.status;
            console.log('Status do trabalho de exportação:', status);
            await new Promise(resolve => setTimeout(resolve, 5000));
        } while (status !== 'completed');

        const downloadUrl = statusResponse.data.download_url;
        console.log('URL de download:', downloadUrl);
    } catch (error) {
        console.error('Erro ao exportar usuários:', error);
    }
}

export async function handleWebhookPayload(payload) {
    try {
        console.log('Payload do webhook recebido:', payload);
        const { eventType, eventData } = payload;
        if (eventType === 'user.created') {
            const newUser = await axiosInstance.post('/users', eventData);
            console.log('Novo usuário criado:', newUser.data);
        }
    } catch (error) {
        console.error('Erro ao lidar com o payload do webhook:', error);
    }
}
