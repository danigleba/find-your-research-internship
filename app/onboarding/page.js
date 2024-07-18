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
import PostCard from "@/components/PostCard"

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

    const updateProfile = async (e) => {
        try {
            const response = await fetch("/api/db/updateProfile", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: user, profileData: profileData})
            })
            const data = await response.json()
        } catch (error) { 
            console.error("Error fetching data:", error)
            setLoading(true)
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

    const openNewPostModal = async (e) => {
        e.preventDefault()
        document.getElementById("newPostModal").showModal()
    }

    const closeEditProfilePostModal = async () => {
        const closeButton = document.getElementById(`closeEditProfile`)
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
        if (user?.email) {
            getUserPosts()
        }
        setProfileData(user)
    }, [user])

    useEffect(() => {
        updateProfile()
    }, [profileData])
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
                <AppHeader user={user} />
                <div className="w-full px-6 md:px-24 space-y-6 pb-12">
                    <div className="space-y-6 md:w-1/2">
                        <div className="p-3 space-y-6">
                            <div className="space-y-1">
                                <h2 className="text-3xl font-extrabold">Onboarding</h2>
                                <p>Fill this info for other researchers to know you better.</p>
                            </div>
                            <form className="flex-box justify-start items-start flex-col space-y-6" >  
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
                                    <label htmlFor="position">Orcid <a className="font-light">(optional)</a></label>
                                    <input value={profileData?.orcid} onChange={(e) => setProfileData(prevState => ({...prevState, orcid: e.target.value}))} type="text" id="orcid" name="orcid" placeholder="0000-0000-0000-0000" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div>  
                                <div className="space-y-1">
                                    <h2>Your Skills</h2>
                                    <p>Please add any experiment, technique, or skill you have experience with. </p>
                                </div>
                                <div className={`${posts?.length == 0 ? "hidden" : ""} grid grid-cols-1 md:grid-cols-3 gap-6`}>
                                    {posts?.map((item, index) => (
                                        <PostCard key={index} user={user} item={item} getUserPosts={getUserPosts}/> 
                                    ))}
                                </div>
                                <button onClick={(e) => openNewPostModal(e)} className="flex-box py-3 font-medium w-full border border-gray-200 hover:bg-gray-200 transition rounded-lg">
                                    + Add Skill
                                </button>    
                                <div className="w-full pt-6 text-center">
                                    <button onClick={(e) => updateProfile(e)} className="flex-box gap-3 button-primary w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box"></span> : "Continue"}</button>
                                    <a className="link">Skip</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            {showToast == true && (
                <Toast text="Profile updated!" />                
            )}
        </Suspense>
        <NewPostModal user={user} getUserPosts={getUserPosts}/>
    </>
  )
}
