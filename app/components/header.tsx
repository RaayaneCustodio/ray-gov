import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import { Logo } from "./svgs/logo.";

export function Header() {
  const linkStyle = {
    textDecoration: 'none',
    color: '#FFFFFF' // Cor do texto branco
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-[#1a202c] shadow-lg">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand"><Logo /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link" style={linkStyle}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link" style={linkStyle}>Postagens</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link" style={linkStyle}>Logar</Link>
            </li>
            <li className="nav-item">
              <Link href="/sign-up" className="nav-link" style={linkStyle}>Cadastrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
