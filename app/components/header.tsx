import 'bootstrap/dist/css/bootstrap.min.css';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./svgs/logo.";

export function Header() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'black' // Definindo a cor do texto como preto
  };

  return (
    <header className="flex justify-between items-center h-10 mb-10 border-b mt-8">
      <div className="p-6">
        <Link href="/" className="block"><Logo /></Link>
      </div>
      <ul className="flex justify-between items-center gap-6">
        <li><a href="/" style={linkStyle}>Inicio</a></li>
        <li><Link href="/" style={linkStyle}>Postagens</Link></li>
        <li><Link href="/" style={linkStyle}></Link></li>
      </ul>
      <ul className="flex justify-between items-center gap-6">
        <li><a href="/dashboard" style={linkStyle}>Logar</a></li>
        <li><Link href="/sign-up" style={linkStyle}>Cadastrar</Link></li>
        <li><Link href="/" style={linkStyle}></Link></li>
      </ul>
      {/* <UserButton /> */}
    </header>
  )
}
