import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AuthModal from "./AuthModal"
import Toast from "./Toast"
import { IoSend } from "react-icons/io5"
import { BsPatchCheckFill } from "react-icons/bs"

export default function PostCard({}) {
    const router = useRouter()
    const [author, setAuthor] = useState({})
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)


    const openLoginModal = async () => {
        document.getElementById("loginModal").showModal()
    }

    const closePostModal = async () => {
        const closeButton = document.getElementById(`closePostModal-${item.title}-${author.name}`)
        closeButton.click()
    }
    
    const showSuccessToast = async () => {
        setShowToast(true)
        
        const timeout = setTimeout(() => {
          setShowToast(false)
        }, 5000)
        
        return () => clearTimeout(timeout)
    }

    useEffect(() => {
        const handleCopy = (e) => {
          e.preventDefault()
        }
    
        document.addEventListener('copy', handleCopy)
    
        return () => {
          document.removeEventListener('copy', handleCopy)
        }
      }, [])
    return (
        <main className="flex-box flex-col w-full items-start justify-between space-y-6">
           <div className="flex items-end gap-3 bg-cover bg-center bg-[url('/example2.jpg')] rounded-lg w-full aspect-video bg-red-200 p-3">
              <div className="h-6 w-max px-3 rounded bg-white">Harvard</div>
              <div className="h-6 w-max px-3 rounded bg-white">Math</div>
            </div>
            <div className="flex-box justify-between w-full">
              <div>
                <p className="text-lg font-bold">Name</p>
                <p className="">Position at Institution</p>
              </div>
              <button className="main-cta border-none text-gray-700 whitespace-nowrap px-3">Message NAME</button>
            </div>
        </main>
    )
}
  