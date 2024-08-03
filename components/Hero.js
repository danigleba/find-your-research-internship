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
    <div className="flex-box flex-col w-full text-center space-y-24 py-12 ">
        <div className="space-y-12 md:px-24">
          <div className="flex-box flex-col gap-12 w-full">
            <h1 className="hidden md:block">Find your next research collaboration</h1>
            <h1 className="md:hidden">Find your next research collaboration</h1>
            <p className="subtitle md:w-2/3">Portiko connects scientists looking to carry out experiments or analysis and researchers with the experience and tools to do so.</p>
          </div>
          <div className="flex-box flex-col gap-6">
            <button onClick={() => openSignupModal()} className="main-cta text-lg">Find a Collaboration <a className="font-light text-base">- it's free</a></button>
            <div className="flex-box flex-col md:flex-row gap-3">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-10">
                    <img src="/profilePictures/pp_ana.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="/profilePictures/cta1.jpeg" />
                  </div>
                </div>
                <div className="avatar bg-bottom">
                  <div className="w-10">
                    <img src="/profilePictures/cta2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="/profilePictures/cta3.jpeg" />
                  </div>
                </div>
              </div>
              <div className="flex-box flex-col md:items-start gap-1">
                <p className="font-base">Loved by over 600 academics</p>
              </div>
            </div>
          </div>
        </div>
        <FeaturesVideo />
        <UsedBy />
        <TestimonialGrid />
        <AuthModal/>
    </div>
  )
} 
    