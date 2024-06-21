/** @type {import('next').NextConfig} */
const nextConfig = {
    // Adicione suas configurações personalizadas aqui
    // Por exemplo, definir o diretório de saída personalizado
    distDir: 'build',
    images: { 
      domains: ['www.facebook.com','scontent.fbfh6-1.fna.fbcdn.net', 'images.clerk.dev', 'www.gravatar.com', 'img.clerk.com','firebasestorage.googleapis.com','scontent.cdninstagram.com']
    }
  };
  
  export default nextConfig;
  