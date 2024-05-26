import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })

export default function Hero({ }) {
    return (
      <div className="flex-box flex-col w-full text-center space-y-6 py-12">
          <h1 className={`${rubik.className}`}>Find scientific collaborations <a className="bg-[#4040e6] text-white px-1">in seconds</a></h1>
          <p className="subtitle">Portiko connects scientists looking to carry out experiments or analysis and researchers with the experience and tools to do so.</p>
      </div>
    )
  } 
    