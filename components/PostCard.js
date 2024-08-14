import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdEmail } from "react-icons/md"

export default function PostCard({ name, position, institution, department, image }) {
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

    /*useEffect(() => {
        const handleCopy = (e) => {
          e.preventDefault()
        }
    
        document.addEventListener('copy', handleCopy)
    
        return () => {
          document.removeEventListener('copy', handleCopy)
        }
      }, [])*/
    return (
        <div onClick={() => document.getElementById("checkout").showModal()} className="flex-box flex-col w-full items-start justify-between space-y-6">
           <div className={`flex items-end gap-3 bg-cover bg-center rounded-lg w-full aspect-video bg-red-200 p-3`} style={{ backgroundImage: image ? image : "" }}>
              <div className="tag">{institution}</div>
              <div className="tag">{department}</div>
            </div>
            <div className="flex-box justify-between w-full">
              <div>
                <p className="text-lg font-bold">{name}</p>
                <p className="">{position} at {institution}</p>
              </div>
              <button className="flex-box gap-3 main-cta border-none text-gray-700 whitespace-nowrap px-3"><MdEmail />Email {name?.split(" ")[0]}</button>
            </div>
        </div>
    )
}
  