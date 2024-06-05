// app/dashboard/layout.js
import Link from "next/link";
import { Logo } from "../components/svgs/logo.";
import { SignOutButton } from "@clerk/nextjs";
import { DashboardHeader } from "#/components/dashboard-header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}



export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="h-full flex flex-col md:flex-row">
            <DashboardHeader/>
            <div className="flex-1 p-6">{children}</div>
        </div>
    );
}
