import Link from "next/link"
import { Logo } from "../components/svgs/logo."
import { SignOutButton } from "@clerk/nextjs"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

interface DashboardLayoutProps {
	children: React.ReactNode;
  }
  
  const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
	  <div className="min-h-screen flex flex-col bg-[#1a202c] text-white">
		<Header />
		<main className="flex-1 p-6">{children}</main>
		<Footer />
	  </div>
	);
  };
  
  export default DashboardLayout;