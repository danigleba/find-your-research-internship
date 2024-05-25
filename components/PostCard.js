import { useEffect, useState } from "react"
import AuthModal from "./AuthModal"
import { FaHandsClapping } from "react-icons/fa6"
import { IoSend } from "react-icons/io5"

export default function PostCard({ user, item }) {
    const [author, setAuthor] = useState({})
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

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

    const sendCollabEmail = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/emails/sendCollabEmail", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ author: author, user: user, title: item?.title, comment: comment})
            })
            const data = await response.json()
            if (data) {
                setEmailSent(true)
            }
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        }
    }

    const openLoginModal = async () => {
        document.getElementById("authModal").showModal()
    }
    
    useEffect(() => {
        if (item?.author) getPostAuthor()
    }, [item?.author])
    return (
        <main className="flex-box flex-col w-full items-start space-y-6 p-2 rounded-xl pb-6 bg-[#f9f9f9]">
            <div className="flex-box items-end justify-end bg-cover w-full aspect-video rounded-lg cursor-pointer p-3" style={{ backgroundImage: `url(${item?.image ? item?.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6H-wpoicibd_-GAWDXZUQGzX2kF3YeCwbJwikwdaq2Q&s"})` }}>
                <div className="tag">{item?.categories?.[0]}</div>
            </div>
            <div className="flex-box flex-col justify-between items-start w-full h-2/3 px-6 space-y-6">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="font-extrabold text-2xl">{item?.title}</p>
                        <div className="flex-box justify-start gap-3">
                            <div className="profile" style={{ backgroundImage: `url(${author?.profile_picture})` }}>{!author?.profile_picture ? author?.name?.[0] : "" }</div>
                            <div className="flex-box flex-col items-start">
                                <p className="font-medium text-md opacity-100 cursor-default" style={{filter: "blur(2.75px)" }}>{author?.name}</p>
                                <p className="font-light text-sm">{author?.position} at {author?.institution}</p>
                            </div>
                        </div>
                    </div>
                    <p>{showFullDescription ? item?.description : `${item?.description.slice(0, 100)}...`}</p>
                    <a className="link" onClick={() => setShowFullDescription(!showFullDescription)}>{showFullDescription ? "Show less" : "Show more"}</a>
                </div>   
                <button onClick={()=> user != undefined ? document.getElementById("collabModal").showModal() : openLoginModal()} className="button-primary flex-box gap-3 w-full"><FaHandsClapping />Collaborate</button>   
            </div>
            <dialog id="collabModal" className="modal">
                <div className="modal-box space-y-6">
                    <div className="space-y-3">
                        <div className="flex-box gap-3 justify-start">
                            <div className="profile w-8 text-xs blur-sm" style={{ backgroundImage: `url(${author?.profile_picture})` }}>{!author?.profile_picture ? author?.name?.[0] : "" }</div>
                            <p className="font-medium text-base blur-sm">{author?.name}</p>
                        </div>
                        <div>
                            <p className="font-bold text-2xl">{item?.title} collaboration</p>
                            <p>The researcher will get an email with your message and your contact information so you can start working together asap.</p>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                            <div className="form-section">
                                <label>Write them a message <a className="font-light">(Optional)</a></label>
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" id="comment" name="comment" className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder={`Hi, I would love to collaborate!`}></textarea>
                            </div>        
                            <div className="flex-box justify-between w-full gap-12">
                                <button onClick={(e) => sendCollabEmail(e)} className={`${emailSent == true ? "bg-[#30313D] border border-[#30313D] text-white" : ""} flex-box gap-3 button-primary w-full`}>{emailSent == true ? "Message Sent" : loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Ask for a collaboration"}<IoSend className={`${loading || emailSent ? "hidden" : ""}`} /></button>
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
  