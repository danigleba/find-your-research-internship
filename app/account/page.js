"use client"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import EditPostModal from "@/components/EditPostModal"
import Toast from "@/components/Toast"

export default function Home() {
    const router = useRouter()
    const [posts, setPosts] = useState([])
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
        else setUser(undefined)
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
            body: JSON.stringify({ email: user?.email})
        })
        const data = await response.json()
        if (data?.data?.[0]) setPosts(data?.data)
        else setPosts([])
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
        const closeButton = document.getElementById(`closeEditProfileModal-${user?.id}`)
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
        if (!Cookies.get("portiko-id")) router.push("/")
        getUserData()
    }, [Cookies])

    useEffect(() => {
        if (user?.email) getUserPosts()
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
                <div className="mx-6 md:mx-24 space-y-12 pb-12">
                    <Header user={user} getUserPosts={getUserPosts} />
                    <div className="flex-box flex-col md:flex-row justify-start items-start md:item-center gap-6">
                        <div className="flex-box justify-start gap-3">
                            <div className="profile w-12" style={{ backgroundImage: `url(${user?.profile_picture ? user?.profile_picture : "/profile.png"})` }}></div>
                            <div className="flex-box flex-col items-start w-5/6">
                                <div className="hidden md:flex tooltip tooltip-right pr-2 text-left" data-tip="Only Pro users can see researchers' names">
                                    <p className="font-medium text-md cursor-default">{user?.name}</p>
                                </div>
                                <p className="font-medium text-md cursor-default md:hidden">{user?.name}</p>
                                <p className="font-light text-sm line-clamp-2">{user?.position} at {user?.institution}</p>
                            </div>
                        </div>
                        <div className="flex-box gap-3">
                            <button onClick={() => document.getElementById(`editProfile-${user?.id}`).showModal()} className="button-secondary">Edit Profile</button>
                            <button onClick={() => document.getElementById(`deleteProfile-${user?.id}`).showModal()} className="button-delete">Delete Account</button>
                        </div>
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
                        {/*Skeleton*/}
                        {posts.length == 0 && (
                            Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-4 w-full pb-12">
                                <div className="skeleton h-40 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                            </div>
                            ))
                        )}
                        {posts?.map((item, index) => (
                            <EditPostModal key={index} user={user} item={item} getUserPosts={getUserPosts}/>
                        ))}
                    </div>
                </div>
                <Footer />
                {/*Edit profile modal*/}
                <dialog id={`editProfile-${user?.id}`} className="modal">
                    <div className="modal-box space-y-6">
                        <div className="modal-action">
                            <form method="dialog" className="flex-box flex-col users-end w-full space-y-6" >      
                                <div className="form-section">
                                    <label htmlFor="name">Name</label>
                                    <input value={profileData?.name} onChange={(e) => setProfileData(prevState => ({...prevState, name: e.target.value}))} type="text" id="name" name="name" placeholder="Isaac Newton" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div> 
                                <div className="form-section">
                                    <label htmlFor="position">Position</label>
                                    <input value={profileData?.position} onChange={(e) => setProfileData(prevState => ({...prevState, position: e.target.value}))} type="text" id="position" name="position" placeholder="Researcher" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div>
                                <div className="flex-box items-start gap-6">
                                    <div className="form-section">
                                        <label htmlFor="department">Department</label>
                                        <input value={profileData?.department} onChange={(e) => setProfileData(prevState => ({...prevState, department: e.target.value}))} type="text" id="department" name="department" placeholder="Physics" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    </div>
                                    <div className="form-section">
                                        <label htmlFor="institution">Institution</label>
                                        <input value={profileData?.institution} onChange={(e) => setProfileData(prevState => ({...prevState, institution: e.target.value}))} type="text" id="institution" name="institution" placeholder="Cambridge" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    </div>
                                </div>
                                <div className="flex-box justify-between w-full gap-12">
                                    <button className="flex-box gap-3 button-delete w-full">Cancel</button>
                                    <button onClick={(e) => updateProfile(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Save"}</button>
                                </div>
                            </form>
                            <form method="dialog">
                                <button id={`closeEditProfileModal-${user?.id}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                {/*Delete profile modal*/}
                <dialog id={`deleteProfile-${user?.id}`} className="modal">
                    <div className="modal-box space-y-6">
                        <div className="modal-action">
                            <form method="dialog" className="flex-box flex-col items-end w-full space-y-6">
                                <h2 className="text-center w-full">Are you sure you want to delete your account?</h2>      
                                <div className="flex-box justify-between w-full gap-12">
                                    <button className="flex-box gap-3 button-delete w-full">Cancel</button>
                                    <button onClick={(e) => deleteAccount(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box py-3"></span> : "Yes"}</button>
                                </div>
                            </form>
                            <form method="dialog">
                                <button id={`closeEditPostModal-${user?.id}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </main>
            {showToast == true && (
                <Toast text="Profile updated!" />                
            )}
        </Suspense>
    </>
  )
}
