"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./svgs/logo.";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-[#1a202c] shadow-lg">
      <nav className="w-full flex justify-between items-center py-6 px-6 lg:px-20">
        <Link href="/" className="z-20"><Logo /></Link>
        <ul className={`item-center gap-10 lg:flex ${isOpen ? 'flex flex-col justify-center bg-[#1a202c] z-10 items-center fixed top-0 left-0 h-screen w-full' : 'hidden'}`}>
          <li className="nav-item" onClick={closeMenu}>
            <Link href="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item" onClick={closeMenu}>
            <Link href="/postagem" className="nav-link">Postagens</Link>
          </li>
          <li className="nav-item" onClick={closeMenu}>
            <Link href="/sign-up" className="nav-link">Cadastrar</Link>
          </li>
          <li className="nav-item" onClick={closeMenu}>
            <Link href="/dashboard" className="nav-link">Painel ADM</Link>
          </li>
        </ul>
        <button onClick={toggle} className='block lg:hidden w-10 y-10 z-20'>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </button>
      </nav>
    </header>
  );
}
