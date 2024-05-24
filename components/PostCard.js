import { useEffect, useState } from "react"
import AuthModal from "./AuthModal"
import { FaHandsClapping } from "react-icons/fa6"

export default function PostCard({ user, title, description, image, author_id }) {
    const [author, setAuthor] = useState({})
    const [showFullDescription, setShowFullDescription] = useState(false)

    const getPostAuthor = async () => {
        try {
            const response = await fetch("/api/db/getPostAuthor", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ author_id: author_id })
            })
            const data = await response.json()
            setAuthor(data.data[0])
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const sendCollabEmail = async (e) => {
        e.prevent.default
        try {
            const response = await fetch("/api/emails/sendCollabEmail", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            })
            const data = await response.json()
            console.log(email)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const openLoginModal = async () => {
        document.getElementById("authModal").showModal()
    }
    
    useEffect(() => {
        if (author_id) getPostAuthor()
    }, [author_id])
    return (
        <main className="flex-box flex-col w-full items-start space-y-6 p-2 rounded-xl pb-6 bg-[#f9f9f9]">
            <div className="bg-cover w-full aspect-video rounded-lg cursor-pointer" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="px-6 space-y-6">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="font-extrabold text-2xl">{title}</p>
                        <div className="flex-box justify-start gap-3">
                            <div className="profile" style={{ backgroundImage: `url(${author?.profile_picture})` }}>{!author?.profile_picture ? author?.name?.[0] : "" }</div>
                            <div className="flex-box flex-col items-start">
                                <p className="font-bold text-md">{author?.name}</p>
                                <p className="font-light text-sm">{author?.position} at {author?.institution}</p>
                            </div>
                        </div>
                    </div>
                    <p>{showFullDescription ? description : `${description.slice(0, 100)}...`}</p>
                    <a className="link" onClick={() => setShowFullDescription(!showFullDescription)}>{showFullDescription ? "Show less" : "Show more"}</a>
                </div>   
                <button onClick={()=> user != undefined ? document.getElementById("collabModal").showModal() : openLoginModal()} className="button-primary flex-box gap-3 w-full"><FaHandsClapping />Collaborate</button>   
            </div>
            <dialog id="collabModal" className="modal">
                <div className="modal-box space-y-6">
                    <div className="space-y-3">
                        <div className="flex-box gap-3 justify-start">
                            <div className="profile w-8 text-xs" style={{ backgroundImage: `url(${author?.profile_picture})` }}>{!author?.profile_picture ? author?.name?.[0] : "" }</div>
                            <p className="font-medium text-base">{author?.name}</p>
                        </div>
                        <div>
                            <p className="font-bold text-2xl">{title}</p>
                            <p>Send a message to {author?.name} for you to start the collaboration</p>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                            <div className="form-section">
                                <label>Message <a className="font-light">(Optional)</a></label>
                                <textarea className="textarea textarea-bordered w-full focus:outline-none focus:ring-0" placeholder={`Hi ${author?.name}, I would love to collaborate!`}></textarea>
                            </div>        
                            <div className="flex-box justify-between w-full gap-12">
                                <button onClick={(e) => sendCollabEmail(e)} className="button-primary w-full">Send</button>
                            </div>
                        </form>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <AuthModal />
        </main>
    )
}
  