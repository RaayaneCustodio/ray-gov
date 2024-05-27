import React from 'react';
import { Logo } from "../components/svgs/logo.";

export function Footer() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'black' // Definindo a cor do texto como preto
  };

  return (
    <footer className="bg-gray-200 rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <Logo />
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium justify-center">
                    <li>
                        <a href="#" style={linkStyle} className="hover:underline me-4 md:me-6">Inicio</a>
                    </li>
                    <li>
                        <a href="#" style={linkStyle} className="hover:underline me-4 md:me-6">Postagens</a>
                    </li>
                    <li>
                        <a href="#" style={linkStyle} className="hover:underline me-4 md:me-6">Logar</a>
                    </li>
                    <li>
                        <a href="#" style={linkStyle} className="hover:underline">Cadastrar</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" style={linkStyle} className="hover:underline">Gabinete Digital™</a>. Todos os direitos reservados.</span>
        </div>
    </footer>
  );
}
