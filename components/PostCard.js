import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdEmail } from "react-icons/md"

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
        <div onClick={() => document.getElementById("checkout").showModal()} className="flex-box flex-col w-full items-start justify-between space-y-6">
           <div className="flex items-end gap-3 bg-cover bg-center bg-[url('/example2.jpg')] rounded-lg w-full aspect-video bg-red-200 p-3">
              <div className="h-6 w-max px-3 rounded bg-white">Harvard</div>
              <div className="h-6 w-max px-3 rounded bg-white">Psychology</div>
            </div>
            <div className="flex-box justify-between w-full">
              <div>
                <p className="text-lg font-bold">Steven Pinked</p>
                <p className="">Professor at Harvard</p>
              </div>
              <button className="flex-box gap-3 main-cta border-none text-gray-700 whitespace-nowrap px-3"><MdEmail />Email Steven</button>
            </div>
        </div>
    )
}
  