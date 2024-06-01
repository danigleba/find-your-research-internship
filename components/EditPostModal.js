import { useRouter } from "next/navigation"
import { useState } from "react"
import Toast from "./Toast"
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

export default function EditPostModal({ user, item, getUserPosts }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(item?.title)
    const [description, setDescription] = useState(item?.description)
    const [showToast, setShowToast] = useState(false)
    const [showFullDescription, setShowFullDescription] = useState(false)

    const saveEditedPost = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/db/updatePost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: item?.id, title: title, description: description })
            })
            const data = await response.json()
            if (data) {
                await closePostModal()
                setLoading(false)
                showSuccessToast()
                getUserPosts()
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        } 
    }

    const deletePost = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/db/deletePost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: item?.id })
            })
            const data = await response.json()
            if (data) {
                await getUserPosts()
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        } 
    }

    const closePostModal = async () => {
        const closeButton = document.getElementById(`closeEditPostModal-${item.id}`)
        closeButton.click()
    }
    
    const showSuccessToast = async () => {
        setShowToast(true)
        
        const timeout = setTimeout(() => {
          setShowToast(false)
        }, 5000)
        
        return () => clearTimeout(timeout)
    }
    return (
        <>
            <main className="flex-box flex-col w-full items-start justify-between space-y-6 p-6 rounded-xl pb-6 bg-[#f9f9f9]">
                <div className="flex-box items-end justify-between bg-cover w-full h-max rounded-lg cursor-pointer gap-6 p-0 rom-violet-600 to-indigo-600">
                    <div className={`${!user?.institution ? "invisible" : ""} tag bg-[#30313D] text-white truncate`}>{user?.institution}</div>
                    <div className="tag whitespace-nowrap">{item?.categories?.[0]}</div>
                </div>
                <div className="flex-box flex-col justify-between items-start w-full h-full space-y-6">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="font-extrabold text-2xl">{item?.title}</p>
                            <div onClick={() => router.push(`/profile/${user?.id}`)} className="flex-box justify-start gap-3 cursor-pointer">
                                <div className="profile w-12" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
                                <div className="flex-box flex-col items-start w-5/6">
                                    <div className="hidden md:flex tooltip tooltip-right pr-2 text-left" data-tip="Only Pro users can see researchers' names">
                                        <p className="font-medium text-md cursor-default">{user?.name}</p>
                                    </div>
                                    <p className="font-medium text-md cursor-default md:hidden">{user?.name}</p>
                                    <p className="font-light text-sm line-clamp-2">{user?.position} at {user?.institution}</p>
                                </div>
                            </div>
                        </div>
                        <p>{item?.description ? showFullDescription ? item?.description : `${item?.description?.slice(0, 75)}${item?.description?.length > 75 ? "..." : ""}` : "No description."}</p>
                        <a className={`${item?.description?.length <= 75 || !item?.description ? "hidden" : "link"}`} onClick={() => setShowFullDescription(!showFullDescription)}>{showFullDescription ? "Show less" : "Show more"}</a>
                    </div>   
                    <div className="flex-box gap-6 w-full">
                        <button onClick={() => document.getElementById(`deletePost-${item.id}`).showModal()} className="flex-box gap-3 button-delete w-full"><MdDelete />Delete</button>
                        <button onClick={() => document.getElementById(`editPost-${item.id}`).showModal()} className="button-tertiary flex-box gap-3 w-full"><FaEdit />Edit</button>   
                    </div>
                </div>
                <dialog id={`editPost-${item.id}`} className="modal">
                    <div className="modal-box space-y-6">
                        <div className="space-y-3">
                            <div className="flex-box gap-3 justify-start">
                                <div className="profile w-10 text-xs" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
                                <div>
                                    <div className="hidden md:flex w-max tooltip tooltip-right pr-2" data-tip="Only Pro users can see researchers' names">
                                        <p className="font-medium text-base font-medium cursor-default">{user?.name}</p>
                                    </div>
                                    <p className="font-medium text-base font-medium cursor-default md:hidden">{user?.name}</p>
                                    <p className="font-light">{user?.position} at {user?.institution}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                                <div className="form-section">
                                    <label>Title</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="description" name="description" className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder={`Hi, I would love you to collaborate on my paper!`}></input>                             
                                </div>
                                <div className="form-section">
                                    <label>Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" name="description" className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder={`Hi, I would love you to collaborate on my paper!`}></textarea>
                                </div>        
                                <div className="flex-box justify-between w-full gap-12">
                                    <button className="flex-box gap-3 button-delete w-full">Cancel</button>
                                    <button onClick={(e) => saveEditedPost(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Save"}</button>
                                </div>
                            </form>
                            <form method="dialog">
                                <button id={`closeEditPostModal-${item.id}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <dialog id={`deletePost-${item.id}`} className="modal">
                    <div className="modal-box space-y-6">
                        <div className="modal-action">
                            <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                                <h2 className="text-center w-full">Are you sure you want to delete this?</h2>      
                                <div className="flex-box justify-between w-full gap-12">
                                    <button className="flex-box gap-3 button-delete w-full">Cancel</button>
                                    <button onClick={(e) => deletePost(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Yes"}</button>
                                </div>
                            </form>
                            <form method="dialog">
                                <button id={`closeEditPostModal-${item.id}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                {showToast == true && (
                    <Toast text="Post updated!" />                
                )}
            </main> 
        </>
    )
}
  