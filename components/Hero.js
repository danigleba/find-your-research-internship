import AuthModal from "./AuthModal"
import UsedBy from "./UsedByComponent"
import FeaturesVideo from "./featuresVideo"
import TestimonialGrid from "./TestimonialGrid"
import { FaStar } from "react-icons/fa6"

export default function Hero({ }) {
  const openSignupModal = async () => {
    document.getElementById("signupModal").showModal()
  }
  return (
    <div className="flex-box flex-col w-full text-center space-y-24 pb-12 px-6">
        <div className="flex-box flex-col md:flex-row gap-24">
          <div className="space-y-12 md:text-left">
            <div className="flex-box flex-col gap-6 md:gap-12 w-full">
              <div className="flex flex-col items-center md:items-start space-y-6">
                <p className="bg-gradient-to-r from-violet-200 to-fuchsia-200 cursor-default px-6 py-1 rounded-full w-max text-sm font-medium">✨ and 10x your med school application ✨</p>
                <h1>Find your research internship <a className="px-1 text-white bg-[#30313D]">today</a></h1>
              </div>
              <div className="flex flex-col gap-3 w-full items-center justify-center md:items-start items-start text-center">
                <div className="w-max space-y-1">
                  <p className="subtitle"><a className="text-xl">🏫</a>Find 250+ researchers from top US schools </p>
                  <p className="subtitle"><a className="text-xl">🌀</a>Filter by school, state & department</p>
                  <p className="subtitle"><a className="text-xl">✉️</a>Message professors directly</p>
                  <p className="subtitle"><a className="text-xl">⭐️</a>All data is manually verified</p>
                </div>
              </div>
            </div>
            <div className="flex-box flex-col items-center md:items-start gap-6">
              <button onClick={() => openSignupModal()} className="main-cta">Find my internship</button>
              <div className="flex-box flex-col md:flex-row gap-3">
                <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/pp_ana.jpg" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/cta1.jpeg" />
                    </div>
                  </div>
                  <div className="avatar bg-bottom">
                    <div className="w-8">
                      <img src="/profilePictures/cta2.png" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/cta3.jpeg" />
                    </div>
                  </div>
                </div>
                <div className="flex-box flex-col md:items-start gap-1">
                  <p className="font-base text-sm">Loved by over 600 undergrads</p>
                </div>
              </div>
            </div>
          </div>
          <FeaturesVideo />
        </div>
        <UsedBy />
        <AuthModal/>
    </div>
  )
} 
    