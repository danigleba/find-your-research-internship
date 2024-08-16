import { usePathname } from "next/navigation"
import { Rubik } from "next/font/google"
import AuthModal from "./AuthModal"
import { FaRegCompass } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"

const rubik = Rubik({ subsets: ["latin"] })

export default function Header({ user, getUserPosts, getUserProjects }) {
  const pathname = usePathname();

  return (
    <main className="flex items-center justify-between mx-6 md:mx-24 mb-12">
        <a className={`${rubik.className} text-[#30313D] text-xl md:text-2xl font-bold`}>Portiko</a>
        <div className={`${pathname == "/onboarding" ? "hidden" : ""} flex-box gap-3`}>
            <a href="/account" className={`${pathname == "/account" ? "text-white bg-[#30313D]" : ""} button-appHeader`}><CgProfile />My Profile</a>
            <a href="/explore" className={`${pathname == "/explore" ? "text-white bg-[#30313D]" : ""} button-appHeader`}><FaRegCompass />Explore</a>
        </div>
        <AuthModal/>
    </main>
  )
}
  