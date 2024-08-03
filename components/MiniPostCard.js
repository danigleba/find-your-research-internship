import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BsPatchCheckFill } from "react-icons/bs"

export default function MiniPostCard({ user, item }) {
    const router = useRouter()
    const [author, setAuthor] = useState({})
    const [showFullDescription, setShowFullDescription] = useState(false)

    const getPostAuthor = async () => {
        try {
            const response = await fetch("/api/db/getPostAuthor", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ author_id: item?.author })
            })
            const data = await response.json()
            setAuthor(data.data[0])
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        if (item?.author) getPostAuthor()
    }, [item?.author])

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
        <main className="flex-box flex-col w-full items-start justify-between space-y-6 p-6 rounded-xl pb-6 bg-gray-100">
            <div className="flex-box items-end justify-between bg-cover w-full h-max rounded-lg cursor-pointer gap-6 p-0 rom-violet-600 to-indigo-600">
                <div className={`${!author?.institution ? "invisible" : ""} tag bg-white truncate`}>{author?.institution}</div>
            </div>
            <div className="flex-box flex-col justify-between items-start w-full h-full space-y-6">
                <div className="space-y-6">
                    <div className="space-y-6">
                        <p className="font-bold text-2xl"><a className="font-black"><a className="bg-[#30313D] text-gray-100 px-2">I will do</a></a> {item?.title}</p>
                        <div onClick={() => router.push(`/profile/${author?.id}`)} className="flex-box justify-start gap-3 cursor-pointer">
                            <div className="profile w-12" style={{ backgroundImage: `url(${author?.profile_picture ? author?.profile_picture : "/profile.png"})` }}></div>
                            <div className="flex-box flex-col items-start w-5/6">
                                <div className="flex-box">
                                    <div className="hidden md:flex cursor-pointer tooltip tooltip-right pr-2 text-left">
                                        <p className="font-medium text-md cursor-default">{author?.name}</p>
                                    </div>
                                    {author?.verified == true && (
                                        <div className="hidden md:flex tooltip tooltip-right pr-2 text-left" data-tip="Verified user">
                                            <BsPatchCheckFill />
                                        </div>
                                    )}  
                                </div>
                                <div className="flex-box gap-3">
                                    <p className="font-medium text-md cursor-default md:hidden">{author?.name}</p>
                                    {author?.verified == true && (
                                        <BsPatchCheckFill className="md:hidden"/>
                                    )}  
                                </div>
                                <p className="font-light text-sm line-clamp-2">{author?.position} at {author?.institution}</p>
                            </div>
                        </div>
                    </div>
                    <p>{item?.description ? showFullDescription ? item?.description : `${item?.description?.slice(0, 75)}${item?.description?.length > 75 ? "..." : ""}` : "No description."}</p>
                    <a className={`${item?.description?.length <= 75 || !item?.description ? "hidden" : "link"}`} onClick={() => setShowFullDescription(!showFullDescription)}>{showFullDescription ? "Show less" : "Show more"}</a>
                </div>   
            </div>
        </main>
    )
}
  