"use client"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Cookies from "js-cookie"
import AppHeader from "@/components/AppHeader"
import EditPostModal from "@/components/EditPostModal"
import Toast from "@/components/Toast"
import { FaXTwitter } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa"
import { FaGoogleScholar } from "react-icons/fa6"
import NewPostModal from "@/components/NewPostModal"

export default function Home() {
    const router = useRouter()
    const [posts, setPosts] = useState([])
    const [projects, setProjects] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState({})
    const [showToast, setShowToast] = useState(false)

    const getUserData = async () => {
        try {
        const response = await fetch("/api/db/getUserData", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: Cookies.get("portiko-id")})
        })
        const data = await response.json()
        if (data?.data?.[0]) setUser(data?.data?.[0])
        else router.push("/")
        } catch (error) {
        console.error("Error fetching data:", error)
        } 
    }

    const getUserPosts = async () => {
        try {
        const response = await fetch("/api/db/getUserPosts", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user?.id})
        })
        const data = await response.json()
        if (data?.data?.[0]) setPosts(data?.data)
        else setPosts([])
        } catch (error) {
        console.error("Error fetching data:", error)
        } 
    }

    const getUserProjects = async () => {
        try {
        const response = await fetch("/api/db/getUserProjects", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user?.id})
        })
        const data = await response.json()
        if (data?.data?.[0]) setProjects(data?.data)
        else setProjects([])
        } catch (error) {
        console.error("Error fetching data:", error)
        } 
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/db/updateProfile", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: user, profileData: profileData})
            })
            const data = await response.json()
            if (data?.data?.[0]) {
                setUser(data?.data)
                getUserData()
                setLoading(false)
                closeEditProfilePostModal()
                showSuccessToast()
            }
        } catch (error) { 
            console.error("Error fetching data:", error)
            setLoading(true)
        } 
    }

    const deleteAccount = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/db/deleteAccount", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: user?.id, email: user?.email})
            })
            const data = await response.json()
            if (data) {
                Cookies.remove("portiko-id")
                router.push("/")
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        } 
    }

    const closeEditProfilePostModal = async () => {
        const closeButton = document.getElementById(`closeEditProfile`)
        closeButton.click()
    }

    const logout = async () => {
        Cookies.remove("portiko-id")
        router.push("/")
    }

    const showSuccessToast = async () => {
        setShowToast(true)
        
        const timeout = setTimeout(() => {
          setShowToast(false)
        }, 5000)
        
        return () => clearTimeout(timeout)
    }

    useEffect(() => {
        if (!Cookies.get("portiko-id")) router.push("/")
        getUserData()
    }, [Cookies])

    useEffect(() => {
        if (user?.email) {
            getUserPosts()
            getUserProjects()
        }
        setProfileData(user)
    }, [user])
    return (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Portiko | Find scientific collaborations in seconds"/>
            <meta property="og:title" content="Portiko" />
            <meta property="og:description" content="Portiko | Find scientific collaborations in seconds" />
            <meta property="og:image" content="/icon.png" />
            <meta property="og:url" content="joinportiko.com" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Portiko" />
            <meta name="twitter:description" content="Portiko | Find scientific collaborations in seconds" />
            <meta name="twitter:image" content="/icon.png" />
            <link rel="icon" href="/icon.png" />
            <title>Portiko</title>
        </Head>
        <Suspense fallback={<div>Loading...</div>}>
            <main className="mt-6 md:mt-12 text-[#30313D] overflow-hidden">
                <AppHeader user={user} getUserPosts={getUserPosts} getUserProjects={getUserProjects} />
                <div className="w-full px-6 md:px-24 space-y-6 pb-12">
                    <div className="flex-box flex-col md:flex-row justify-start items-start md:item-center gap-6">
                        <div className="flex-box justify-start gap-3">
                            <div className="profile w-16" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
                            <div className="flex-box flex-col items-start w-5/6">
                                <div className="hidden md:flex tooltip tooltip-right pr-2 text-left" data-tip="Only Pro users can see researchers' names">
                                    <p className="font-semibold text-md cursor-default">{user?.name}</p>
                                </div>
                                <p className="font-medium text-md cursor-default md:hidden">{user?.name}</p>
                                {user?.position && user?.institution && (<p className="font-light text-sm line-clamp-2">{user?.position} at {user?.institution}</p>)}
                                {(user?.position == null || user?.institution == null) && (<p onClick={() =>  document.getElementById("editProfile").showModal()} className="link font-light text-sm line-clamp-2">Add research position</p>)}

                            </div>
                        </div>
                        <button onClick={() => document.getElementById("editProfile").showModal()} className="button-secondary">Edit profile</button>
                    </div>
                    <div className={`${!user?.socials ? "hidden" : ""} flex-box gap-3 text-lg w-max`}>
                        {user?.socials?.[0]?.twitter && (<a href={user?.socials?.[0]?.twitter} target="_blank"><FaXTwitter/></a>)}
                        {user?.socials?.[0]?.linkedIn && (<a href={user?.socials?.[0]?.linkedIn} target="_blank"><FaLinkedin /></a>)}
                        {user?.socials?.[0]?.googleScholar && (<a href={user?.socials?.[0]?.googleScholar} target="_blank"><FaGoogleScholar /></a>)}
                    </div>
                    <p className="md:w-1/2">{user?.bio}</p>
                    <div className="flex-box justify-start gap-6 ">
                        <h2>My Skills</h2>
                        <button onClick={() => document.getElementById("newPostModal").showModal()} className="button-primary w-max px-6 py-3">+ Add New</button>
                    </div>
                    <div className={`${posts?.length == 0 ? "hidden" : ""} grid grid-cols-1 md:grid-cols-3 gap-6`}>
                        {posts?.map((item, index) => (
                            <EditPostModal key={index} user={user} item={item} getUserPosts={getUserPosts}/> 
                        ))}
                    </div>
                    <button onClick={() => document.getElementById("newPostModal").showModal()} className="flex-box py-3 font-medium w-full md:w-1/3 border border-gray-200 hover:bg-gray-200 transition rounded-lg">
                        + Add new
                    </button> 
                    <div className="flex flex-col items-start w-56 gap-3 pt-6">
                        <button onClick={() => logout()} className="button-secondary w-full">Log Out</button>
                        <button onClick={() => document.getElementById(`deleteProfile-${user?.id}`).showModal()} className="button-delete w-full">Delete Account</button>
                    </div>
                </div>
                {/*Edit profile modal*/}
                <dialog id={`editProfile`} className="modal">
                    <div className="modal-box space-y-6">
                        <div className="modal-action p-3">
                            <form className="flex-box justify-start items-start flex-col space-y-6" >  
                                <div className="profile w-14" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
                                <div className="form-section">
                                    <label htmlFor="name">Name</label>
                                    <input value={profileData?.name} onChange={(e) => setProfileData(prevState => ({...prevState, name: e.target.value}))} type="text" id="name" name="name" placeholder="Isaac Newton" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div> 
                                <div className="form-section">
                                    <label htmlFor="name">Bio</label>
                                    <textarea value={profileData?.bio} onChange={(e) => setProfileData(prevState => ({...prevState, bio: e.target.value}))} type="text" id="bio" name="bio" placeholder="Isaac Newton" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></textarea>
                                </div> 

                                <div className="flex-box items-start gap-6 w-full">
                                    <div className="form-section">
                                        <label htmlFor="position">Position</label>
                                        <input value={profileData?.position} onChange={(e) => setProfileData(prevState => ({...prevState, position: e.target.value}))} type="text" id="position" name="position" placeholder="Researcher" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    </div>
                                    <div className="form-section">
                                        <label htmlFor="institution">Institution</label>
                                        <input value={profileData?.institution} onChange={(e) => setProfileData(prevState => ({...prevState, institution: e.target.value}))} type="text" id="institution" name="institution" placeholder="Cambridge" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    </div>
                                </div>
                                <div className="form-section">
                                    <label htmlFor="position">Twitter</label>
                                    <input value={profileData?.twitter} onChange={(e) => setProfileData(prevState => ({...prevState, twitter: e.target.value}))} type="text" id="twitter" name="twitter" placeholder="twitter.com/yourname" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div>
                                <div className="form-section">
                                    <label htmlFor="position">LinkedIn</label>
                                    <input value={profileData?.linkedIn} onChange={(e) => setProfileData(prevState => ({...prevState, linkedIn: e.target.value}))} type="text" id="linkedIn" name="linkedIn" placeholder="linkedin.com/yourname" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div>
                                <div className="form-section">
                                    <label htmlFor="position">Google Scholar</label>
                                    <input value={profileData?.googleScholar} onChange={(e) => setProfileData(prevState => ({...prevState, googleScholar: e.target.value}))} type="text" id="googleScholar" name="googleScholar.com/yourname" placeholder="Researcher" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div>
                                <button onClick={(e) => updateProfile(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Save"}</button>
                            </form>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button id="closeEditProfile">close</button>
                    </form>  
                </dialog>
                {/*Delete profile modal*/}
                <dialog id={`deleteProfile-${user?.id}`} className="modal">
                    <div className="modal-box space-y-6">
                        <div className="modal-action mt-0">
                            <form method="dialog" className="flex-box flex-col items-end w-full space-y-6">
                                <h2 className="text-center w-full">Are you sure you want to delete your account?</h2>      
                                <div className="flex-box justify-between w-full gap-6">
                                    <button className="flex-box gap-3 button-delete w-full">Cancel</button>
                                    <button onClick={(e) => deleteAccount(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Yes"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </main>
            {showToast == true && (
                <Toast text="Profile updated!" />                
            )}
        </Suspense>
        <NewPostModal />
    </>
  )
}
