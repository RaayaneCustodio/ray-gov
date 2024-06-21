export const initGA = () => {
    if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
      window.GA_INITIALIZED = true;
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-KQJD5DT77X'); 
    }
  };