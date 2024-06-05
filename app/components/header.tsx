import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { Logo } from "./svgs/logo.";

export function Header() {
  const linkStyle = {
    textDecoration: 'none',
    color: '#FFFFFF' 
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-[#1a202c] shadow-lg">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand"><Logo /></Link>
        <div className="d-flex justify-content-center align-items-center flex-grow-1"> {}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link" style={linkStyle}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/postagem" className="nav-link" style={linkStyle}>Postagens</Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/dashboard" className="nav-link" style={linkStyle}>Logar</Link>
          </li>
          <li className="nav-item">
            <Link href="/sign-up" className="nav-link" style={linkStyle}>Cadastrar</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
