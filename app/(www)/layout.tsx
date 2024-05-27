import Link from "next/link"
import { Logo } from "../components/svgs/logo."
import { SignOutButton } from "@clerk/nextjs"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

interface DashboardLayoutProps {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="w-full  mx-auto">
			<Header />
			<div>
				{children}
			</div>
			<Footer />
		</div>
	)
}