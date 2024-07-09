import Head from 'next/head';

interface PreviaProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

export const Previa = ({ title, description, url, image }: PreviaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Compartilhaí" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@compartilhai" />
      <meta property="twitter:creator" content="@compartilhai" />
    </Head>
  );
};
