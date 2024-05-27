import { useState } from "react"
import Cookies from "js-cookie"
import { Rubik } from "next/font/google"
import AuthModal from "./AuthModal"
import NewPostModal from "./NewPostModal"
import { IoLogOut } from "react-icons/io5"

const rubik = Rubik({ subsets: ["latin"] })

export default function Header({ user }) {
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
      <p className={`${rubik.className} text-[#30313D] text-xl md:text-2xl font-bold`}>Portiko</p>
      {!Cookies.get("portiko-id") && (
        <div className="flex-box gap-6">
          <button onClick={() => openLoginModal()} className="button-secondary">Login</button>
          <button onClick={() => openSignupModal()} className="button-tertiary hover:bg-[#4040e6] hover:text-white transition">Sign Up</button>
        </div>
      )}
      {Cookies.get("portiko-id") && (
        <div className="flex-box gap-6 justify-start">
          <button onClick={() => document.getElementById("newPostModal").showModal()} className="button-primary">New Collaboration</button>
          <div className="flex-box gap-3">
            <p className="hidden md:block font-semibold text-base">{user?.name}</p>
            <div className="profile hidden md:flex" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
            <IoLogOut className="cursor-pointer" onClick={() => logout()} size={30} />
          </div>
        </div>
      )}
      <AuthModal baseAuthOption={authOption}/>
      <NewPostModal user={user} />
    </main>
  )
}
  