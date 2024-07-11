import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoIosArrowRoundForward } from "react-icons/io"
import { IoIosArrowRoundBack } from "react-icons/io"

export default function Pagination({ page, user }) {
    const router = useRouter()
    const [postsLength, setPostsLength] = useState(0)

    const getAllPosts = async () => {
        try {
          const response = await fetch("/api/db/getAllPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
          })
          const data = await response.json({})
          setPostsLength(data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const goToNextPage = async () => {
        const newPagination = parseInt(page) + 30 
        router.push(`/explore?page=${newPagination}${!user ? "#content" : ""}`)
    }

    const goToBackPage = async () => {
        const newPagination = parseInt(page) - 30 
        router.push(`/explore?page=${newPagination}${!user ? "#content" : ""}`)
    }

    useEffect(() => {
        getAllPosts()
    }, [])
    return (
        <div className="flex-box gap-6 w-full py-12">
            <button onClick={() => goToBackPage()} className={`${page == 0 ? "hidden" : ""} button-secondary flex-box gap-3`}><IoIosArrowRoundBack size={20} strokeWidth={15} />Back</button>
            <button onClick={() => goToNextPage()} className={`${page >= postsLength - 30 ? "hidden" : ""} button-secondary flex-box gap-3`}>Next<IoIosArrowRoundForward size={20} strokeWidth={15} /></button>
         </div>
    )
  } 