import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { Rubik } from "next/font/google"
import AuthModal from "./AuthModal"
import NewPostModal from "./NewPostModal"
import { IoLogOut } from "react-icons/io5"

const rubik = Rubik({ subsets: ["latin"] })

export default function Header({ user, getUserPosts, getUserProjects }) {
  const router = useRouter()
  const [authOption, setAuthOption] = useState("Login")

  const logout = async () => {
    Cookies.remove("portiko-id")
    window.location.reload()
  }

  const openLoginModal = async () => {
    setAuthOption("Login")
    document.getElementById("authModal").showModal()
  }

  const openSignupModal = async () => {
    setAuthOption("Signup")
    document.getElementById("authModal").showModal()
  }
  return (
    <main className="flex items-center justify-between w-full">
      <a href="/" className={`${rubik.className} text-[#30313D] text-xl md:text-2xl font-bold`}>Portiko</a>
      {!user && (
        <div className="flex-box gap-6">
          <button onClick={() => openLoginModal()} className="button-secondary">Log in</button>
          <button onClick={() => openSignupModal()} className="button-tertiary hover:bg-[#4040e6] hover:text-white transition">Sign Up</button>
        </div>
      )}
      {user && (
        <div className="flex-box gap-6 justify-start">
          <button onClick={() => document.getElementById("newPostModal").showModal()} className="button-primary">New Collaboration</button>
          <div onClick={() => router.push("/account")} className="flex-box gap-3 cursor-pointer">
            <p className="hidden md:block font-semibold text-base">{user?.name}</p>
            <div className="profile hidden md:flex" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
            <IoLogOut className="cursor-pointer" onClick={() => logout()} size={30} />
          </div>
        </div>
      )}
      <AuthModal baseAuthOption={authOption}/>
      <NewPostModal user={user} getUserPosts={getUserPosts} getUserProjects={getUserProjects} />
    </main>
  )
}
  