import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { Rubik } from "next/font/google"
import AuthModal from "./AuthModal"
import NewPostModal from "./NewPostModal"
import { IoLogOut } from "react-icons/io5"
import { CiCirclePlus } from "react-icons/ci"

const rubik = Rubik({ subsets: ["latin"] })

export default function Header({ user, getUserPosts, getUserProjects }) {
  const router = useRouter()
  const [authOption, setAuthOption] = useState("Signup")

  const logout = async () => {
    Cookies.remove("portiko-id")
    window.location.reload()
  }

  const openLoginModal = async () => {
    setAuthOption("Login")
    document.getElementById("loginModal").showModal()
  }

  const openSignupModal = async () => {
    setAuthOption("Signup")
    document.getElementById("loginModal").showModal()
  }
  return (
    <main className="flex items-center justify-between w-full">
      <a href="/" className={`${rubik.className} text-[#30313D] text-xl md:text-2xl font-bold`}>👩‍🔬 Lab Intern</a>
      <div className="flex-box gap-6">
        <button onClick={() => openLoginModal()} className="button-secondary">Log in</button>
      </div>
      <AuthModal baseAuthOption={authOption}/>
      <NewPostModal user={user} getUserPosts={getUserPosts} getUserProjects={getUserProjects} />
    </main>
  )
}
  