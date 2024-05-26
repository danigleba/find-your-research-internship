import { use, useEffect, useState } from "react"
import AuthModal from "./AuthModal"
import Toast from "./Toast"
import { FaHandsClapping } from "react-icons/fa6"
import { IoSend } from "react-icons/io5"

export default function PostCard({ user, item }) {
    const [author, setAuthor] = useState({})
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const getPostAuthor = async () => {
        try {
            const response = await fetch("/api/db/getPostAuthor", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ author_email: item?.author })
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
                closePostModal()
                setLoading(false)
                showSuccessToast()
                setComment("")
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
        if (item?.author) getPostAuthor()
    }, [item?.author])
    return (
        <main className="flex-box flex-col w-full items-start justify-between space-y-6 p-6 rounded-xl pb-6 bg-[#f9f9f9]">
            <div className="flex-box items-end justify-between bg-cover w-full h-max rounded-lg cursor-pointer p-0 rom-violet-600 to-indigo-600">
                <div className="tag bg-[#30313D] text-white">{author?.institution}</div>
                <div className="tag">{item?.categories?.[0]}</div>
            </div>
            <div className="flex-box flex-col justify-between items-start w-full h-full space-y-6">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="font-extrabold text-2xl">{item?.title}</p>
                        <div className="flex-box justify-start gap-3">
                            <div className="profile" style={{ backgroundImage: `url(${author?.profile_picture ? author?.profile_picture : "/profile.png"})` }}></div>
                            <div className="flex-box flex-col items-start">
                                <div className="hidden md:flex tooltip tooltip-right pr-2" data-tip="Only Pro users can see researchers' names">
                                    <p className="font-medium text-md cursor-default" style={{filter: "blur(2.75px)" }}>{author?.name}</p>
                                </div>
                                <p className="font-medium text-md cursor-default md:hidden" style={{filter: "blur(2.75px)" }}>{author?.name}</p>
                                <p className="font-light text-sm">{author?.position} at {author?.institution}</p>
                            </div>
                        </div>
                    </div>
                    <p>{showFullDescription ? item?.description : `${item?.description.slice(0, 100)}${item?.description?.length > 100 ? "..." : ""}`}</p>
                    <a className={`${item?.description?.length <= 100 ? "hidden" : "link"}`} onClick={() => setShowFullDescription(!showFullDescription)}>{showFullDescription ? "Show less" : "Show more"}</a>
                </div>   
                <button onClick={()=> user != undefined ? document.getElementById(`collabModal-${item.title}-${author.name}`).showModal() : openLoginModal()} className="button-primary flex-box gap-3 w-full"><FaHandsClapping />Collaborate</button>   
            </div>
            <dialog id={`collabModal-${item.title}-${author.name}`} className="modal">
                <div className="modal-box space-y-6">
                    <div className="space-y-3">
                        <div className="flex-box gap-3 justify-start">
                            <div className="profile w-10 text-xs" style={{ backgroundImage: `url(${author?.profile_picture ? author?.profile_picture : "/profile.png"})` }}></div>
                            <div>
                                <div className="hidden md:flex w-max tooltip tooltip-right pr-2" data-tip="Only Pro users can see researchers' names">
                                    <p className="font-medium text-base font-medium cursor-default" style={{filter: "blur(2.75px)" }}>{author?.name}</p>
                                </div>
                                <p className="font-medium text-base font-medium cursor-default md:hidden" style={{filter: "blur(2.75px)" }}>{author?.name}</p>
                                <p className="font-light">{author?.position} at {author?.institution}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="font-bold text-2xl">{item?.title} collaboration</p>
                            <p><b>Note:</b> The researcher will get your contact information (name, e-mail, position and institution).</p>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                            <div className="form-section">
                                <label>Write them a message <a className="font-light">(Optional)</a></label>
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" id="comment" name="comment" className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder={`Hi, I would love to collaborate!`}></textarea>
                            </div>        
                            <div className="flex-box justify-between w-full gap-12">
                                <button onClick={(e) => sendCollabEmail(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Ask for a collaboration"}<IoSend className={`${loading ? "hidden" : ""}`} /></button>
                            </div>
                        </form>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button id={`closePostModal-${item.title}-${author.name}`}>close</button>
                </form>
            </dialog>
            <AuthModal />
            {showToast == true && (
                <Toast text="Collaboration request sent!" />
            )}
        </main>
    )
}
  