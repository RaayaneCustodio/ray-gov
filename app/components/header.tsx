import 'bootstrap/dist/css/bootstrap.min.css';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./svgs/logo.";

export function Header() {
  return (
    <header className="flex justify-between items-center h-10 mb-10 border-b mt-8">
      <div className="p-6">
        <Link href="/" className="block"><Logo /></Link>
      </div>
      <ul className="flex justify-between items-center gap-6">
        <li><a href="/">Inicio</a></li>
        <li><Link href="/">Postagens</Link></li>
        <li><Link href="/"></Link></li>
      </ul>
      <ul className="flex justify-between items-center gap-6">
        <li><a href="/dashboard">Logar</a></li>
        <li><Link href="/sign-up">Cadastrar</Link></li>
        <li><Link href="/"></Link></li>
      </ul>
      {/* <UserButton /> */}
    </header>
  )
}
