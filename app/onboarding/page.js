"use client"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Cookies from "js-cookie"
import AppHeader from "@/components/AppHeader"
import Toast from "@/components/Toast"
import MiniPostCard from "@/components/MiniPostCard"


export default function Home() {
    const router = useRouter()
    const [posts, setPosts] = useState([])
    const [postData, setPostData] = useState({
        title: "",
        description: "",
        categories: "STEM",
    })
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState({})
    const [showToast, setShowToast] = useState(false)
    const [errors, setErrors] = useState({})

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
            body: JSON.stringify({ id: user?.id })
        })
        const data = await response.json()
        console.log(data)
        if (data?.data) setPosts(data?.data)
        else setPosts([])
        } catch (error) {
        console.error("Error fetching data:", error)
        } 
    }

    const handleChange = async (e, form) => {
        e.preventDefault()
        const { name, value } = e.target
        setPostData({ ...form, [name]: value })
      }
    
      const checkForm = async (e, form) => {
        e.preventDefault()
        setLoading(true)
        const newErrors = {}
        newErrors.apiError == null
    
        for (const item in form) {
          if (form[item] === "") {
              newErrors[item] = `${item} is required`
          }
        }
        console.log(newErrors)
        setErrors(newErrors)
        if (Object.values(form).every(value => value !== "")) {
          uploadNewPost()
        }
        else setLoading(false)
      }
    
      const uploadNewPost = async () => {
        try {
        const response = await fetch("/api/db/uploadNewPost", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user, postData: postData })
        })
        const data = await response.json()
        await router.refresh()
        closeNewPostModal()
        setPostData({title: "", description: "", category: "STEM"})
        getUserPosts()
        setPostData(prevState => ({...prevState }))
        setLoading(false)
        } catch (error) {
          console.error("Error fetching data:", error)
          setErrors(prevState => ({ ...prevState, apiError: "An unexpected error occurred. Please try again." }))
          setLoading(false)
        }  
    }

    const closeNewPostModal = async () => {
        const closeButton = document.getElementById("closeOnboardingNewPostModal")
        closeButton.click()
    }

    const openNewPostModal = async (e) => {
        e.preventDefault()
        document.getElementById("onboardingNewPostModal").showModal()
    }

    useEffect(() => {
        if (!Cookies.get("portiko-id")) router.push("/")
        getUserData()
    }, [Cookies])

    useEffect(() => {
        if (user?.email) getUserPosts()

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
                    <div className="space-y-6">
                        <form className="p-3 space-y-6">
                            <div className="space-y-1 md:w-1/2">
                                <h2 className="text-3xl font-extrabold">Tell us about yourself</h2>
                                <p>The more other researchers know about you, the easier it will be to find collaborations.</p>
                            </div>
                            <div className="flex-box justify-start items-start flex-col space-y-6" >  
                                <div className="flex-box items-start gap-6 w-full md:w-1/2">
                                    <div className="form-section">
                                        <label htmlFor="position">Position</label>
                                        <input value={profileData?.position} onChange={(e) => setProfileData(prevState => ({...prevState, position: e.target.value}))} type="text" id="position" name="position" placeholder="Researcher" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    </div>
                                    <div className="form-section">
                                        <label htmlFor="institution">Institution</label>
                                        <input value={profileData?.institution} onChange={(e) => setProfileData(prevState => ({...prevState, institution: e.target.value}))} type="text" id="institution" name="institution" placeholder="Cambridge" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    </div>
                                </div> 
                                <div className="space-y-1 md:w-1/2">
                                    <h2>Your Skills</h2>
                                    <p>Please add any experiment, technique, or skill you have experience with. </p>
                                </div>
                                <div className={`${posts?.length == 0 ? "hidden" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6`}>
                                    {posts?.map((item, index) => (
                                        <MiniPostCard key={index} user={user} item={item} getUserPosts={getUserPosts}/> 
                                    ))}
                                </div>
                                <button onClick={(e) => openNewPostModal(e)} className="flex-box md:w-1/2 py-3 font-medium w-full border border-gray-200 hover:bg-gray-200 transition rounded-lg">
                                    + Add Skill
                                </button>    
                                <div className="form-section md:w-1/2">
                                    <label htmlFor="position">Orcid <a className="font-light">(optional)</a></label>
                                    <input value={profileData?.orcid} onChange={(e) => setProfileData(prevState => ({...prevState, orcid: e.target.value}))} type="text" id="orcid" name="orcid" placeholder="0000-0000-0000-0000" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                </div> 
                                <div className="pt-6 w-full md:w-1/2">
                                    <button onClick={(e) => {e.preventDefault(); router.push("/explore")}} className="flex-box gap-3 button-primary hover:scale-105 w-full">{loading ? <span className="flex-box loading loading-spinner loading-xs flex-box"></span> : "Continue"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <dialog id="onboardingNewPostModal" className="modal">
                <div className="modal-box space-y-6">
                <div className="modal-action mt-0 p-3">
                    <form method="dialog" className="flex-box flex-col items-center w-full space-y-6" >
                    <p className="font-extrabold text-2xl text-center">New Skill</p>
                    <div className="w-full space-y-6">
                        <div className="form-section">
                        <label htmlFor="Title">Name of the experiment or technique you do</label>
                        <input value={postData?.title} onChange={(e) => handleChange(e, postData)} type="text" id="title" name="title" placeholder="Identification and characterization of microorganism " className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                        {errors.title && <p className="error">{errors.title}</p>}
                        </div>        
                        <div className="form-section">
                        <label htmlFor="Description">Description</label>
                        <textarea value={postData?.description} onChange={(e) => handleChange(e, postData)} type="text" id="description" name="description" rows={3} className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder="Experiment the identification and characterization of microorganism using techniques like..."></textarea>
                        {errors.description && <p className="error">{errors.description}</p>}
                        </div>      
                    </div>
                    <div className="flex-box flex-col items-center space-y-3 w-full">
                        <button type="submit" onClick={(e) => checkForm(e, postData)} className="button-primary w-full">{loading ? <span className="loading loading-spinner loading-xs flex-box h-full "></span> : "Add Skill"}</button>
                        {errors.apiError && <p className="error">{errors.apiError}</p>}
                    </div>   
                    </form>                  
                </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                <button id="closeOnboardingNewPostModal">close</button>
                </form>         
            </dialog>
            {showToast == true && (
                <Toast text="Profile updated!" />                
            )}
        </Suspense>
    </>
  )
}
