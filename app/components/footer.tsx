import React from 'react';
import { Logo } from "../components/svgs/logo.";

export function Footer() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'white' // Definindo a cor do texto como branco
  };

  return (
    <footer className="bg-[#1a202c] rounded-lg shadow m-4 text-white border border-white rounded-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Logo />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium justify-center">
            <li>
              <a href="/" style={linkStyle} className="hover:underline me-4 md:me-6">Inicio</a>
            </li>
            <li>
              <a href="/postagem" style={linkStyle} className="hover:underline me-4 md:me-6">Postagens</a>
            </li>
            <li>
              <a href="/dashboard" style={linkStyle} className="hover:underline me-4 md:me-6">Logar</a>
            </li>
            <li>
              <a href="/sign-up" style={linkStyle} className="hover:underline">Cadastrar</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">© 2024 <a href="#" style={linkStyle} className="hover:underline">Gabinete Digital™</a>. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
