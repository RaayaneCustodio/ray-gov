import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { Logo } from "./svgs/logo.";

export function Header() {
  const linkStyle = {
    textDecoration: 'none',
    color: '#FFFFFF' // Cor do texto branco
  };

  return (
    <header className="flex justify-between items-center h-16 mb-10 border-b mt-8 bg-[#1a202c] p-6 shadow-lg">
      <div>
        <Link href="/" className="block"><Logo /></Link>
      </div>
      <ul className="flex justify-between items-center gap-6">
        <li><Link href="/" style={linkStyle}>Inicio</Link></li>
        <li><Link href="/" style={linkStyle}>Postagens</Link></li>
        <li><Link href="/" style={linkStyle}></Link></li>
      </ul>
      <ul className="flex justify-between items-center gap-6">
        <li><Link href="/dashboard" style={linkStyle}>Logar</Link></li>
        <li><Link href="/sign-up" style={linkStyle}>Cadastrar</Link></li>
        <li><Link href="/" style={linkStyle}></Link></li>
      </ul>
      {/* <UserButton /> */}
    </header>
  )
}