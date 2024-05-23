import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })

export default function Header() {
  return (
    <main className="flex items-center justify-between w-full">
      <p className={`${rubik.className} text-[#30313D] text-2xl font-bold`}>Portiko</p>
      <div className="flex-box gap-6">
          <button className="button-secondary">Login</button>
          <button className="button-tertiary hover:button-primary transition">Sign Up</button>
      </div>
    </main>
  )
}
  