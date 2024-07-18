"use client"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Cookies from "js-cookie"
import AppHeader from "@/components/AppHeader"
import Toast from "@/components/Toast"
import PostCard from "@/components/PostCard"
import ProjectCard from "@/components/ProjectCard"
import Pagination from "@/components/Pagination"

export default function Home() {
    const router = useRouter()
    const [posts, setPosts] = useState([])
    const [projects, setProjects] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const searchParams = useSearchParams()
    const section = searchParams.get("section") || "posts"
    const [search, setSearch] = useState("")
    const page = searchParams.get("page") || 0
    const [isSearchResult, setIsSearchResult] = useState(false)

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

    const getPosts = async () => {
        try {
        const response = await fetch("/api/db/getPosts", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({page: page, section: section })
        })
        const data = await response.json()
        if (data?.data?.[0]) setPosts(data?.data)
        else setPosts([])
        } catch (error) {
        console.error("Error fetching data:", error)
        } 
    }

    const getProjects = async () => {
        try {
        const response = await fetch("/api/db/getProjects", {
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
    
    const searchCollaborations = async (e) => {  
      e.preventDefault()
      if (search) {
        getSearchedPosts()
        setIsSearchResult(true)
      }
      if (search == "") {
        getPosts()
        setIsSearchResult(false)
      }
    }

    const getSearchedPosts = async () => {
      try {
        const response = await fetch("/api/db/getSearchedPosts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: search })
        })
        const data = await response.json({})
        setPosts(data.data)
      } catch (error) {
          console.error("Error fetching data:", error)
      }
    }

    useEffect(() => {
        if (!Cookies.get("portiko-id")) router.push("/")
        getUserData()
    }, [Cookies])

    useEffect(() => {
        if (user?.email) {
            getPosts()
            getProjects()
        }
    }, [user])

    useEffect(() => {
      if (section == "posts") getPosts()
        if (section == "projects") getProjects()

    }, [page, section])
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
            <main className="mt-6 md:mt-12 text-[#30313D] overflow-hidden pb-24">
                <AppHeader user={user} />
                <div id="content" className="space-y-6">
                {/*Search Bar*/}
                <div className="flex-box flex-col justify-center w-full space-y-3 py-6 px-6"> 
                  <h2>I need collaborators with expertise in</h2>
                  <form onSubmit={(e) => searchCollaborations(e)} className="flex-box justify-between gap-6 w-full md:w-2/3 border border-[#dee1e7] shadow-sm rounded-full pl-6 pr-1 placeholder:text-[#30313D] w-2/3">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." className="no-ring w-full py-3 placeholder:text-[#dee1e7] focus:outline-none focus:ring-0" />
                    <button type="submit" className="button-primary flex-box gap-2 py-2 rounded-full shadow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#dee1e7" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                      <p>Search</p>
                    </button>
                  </form>
                  <div className="flex-box gap-6">
                    <button onClick={() => router.push(`explore/?section=posts${!user ? "#content" : ""}`)} className={`${section == "posts" ? "bg-[#30313D] text-white" : "text-[#30313D]"} tag-lg`}>👨🏾‍🔬 Researchers</button>
                    <button onClick={() => router.push(`explore/?section=projects${!user ? "#content" : ""}`)} className={`${section == "projects" ? "bg-[#30313D] text-white" : "text-[#30313D]"} tag-lg`}>🏬 Projects</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 md:px-24">
                  {/*Skeleton*/}
                  {posts?.length == 0 && (
                    Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-4 w-full pb-12">
                        <div className="skeleton h-40 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      </div>
                    ))
                  )}
                  {section == "posts" && (
                    <>
                      {posts?.map((item, index) => (
                        <PostCard key={index} user={user} item={item} /> 
                      ))}
                    </>
                  )}
                  {section == "projects" && (
                    <>
                      {projects?.map((item, index) => (
                        <ProjectCard key={index} user={user} item={item} />
                      ))}
                    </>
                  )}
                </div>
            </div>
            {isSearchResult == false && section != "projects" && (
                <Pagination page={page} user={user}/>
            )}
            </main>
            {showToast == true && (
                <Toast text="Profile updated!" />                
            )}
        </Suspense>
    </>
  )
}
