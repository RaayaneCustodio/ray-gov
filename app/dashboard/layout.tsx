// app/dashboard/layout.js
import Link from "next/link";
import { Logo } from "../components/svgs/logo.";
import { SignOutButton } from "@clerk/nextjs";

interface DashboardLayoutProps {
    children: React.ReactNode;
}



export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="h-full flex flex-col md:flex-row">
            <div className="w-full md:max-w-96 border-r bg-slate-100">
                <div className="p-6">
                    <Logo />
                </div>
                <div className="grid">
                    <ul className="mt-10 flex flex-col gap-2 h-full">
                        <li className="w-full p-6 rounded-sm hover:bg-slate-300 cursor-pointer">
                            <Link href="/dashboard" className="block w-full">Inicio</Link>
                        </li>
                        <li className="w-full p-6 rounded-sm hover:bg-slate-300 cursor-pointer">
                            <Link href="/dashboard/create-link" className="block w-full">Cadastrar link</Link>
                        </li>
                        <li className="w-full p-6 rounded-sm hover:bg-slate-300 cursor-pointer">
                            <Link href="/dashboard/list-link" className="block w-full">Lista de posts</Link>
                        </li>
                    </ul>
                    <div className="w-full p-6 rounded-sm hover:bg-slate-300">
                        <SignOutButton redirectUrl="/">Sair</SignOutButton>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-6">{children}</div>
        </div>
    );
}
