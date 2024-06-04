"use client"
import Head from "next/head"
import { useParams } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense} from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PostCard from "@/components/PostCard"

export default function Home() {
    const params = useParams()
    const { researcher_id } = params
    const [researcher, setResearcher] = useState({})
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

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

    const getResearcherData = async () => {
        try {
        const response = await fetch("/api/db/getResearcher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ researcherId: researcher_id })
        })
        const data = await response.json({})
        setResearcher(data.data[0])
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const getResearcherPosts = async () => {
        try {
        const response = await fetch("/api/db/getResearcherPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: researcher_id })
        })
        const data = await response.json({})
        setPosts(data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [Cookies])

    useEffect(() => {
       if (researcher_id) getResearcherData()
    }, [researcher_id])

    useEffect(() => {
       if (researcher?.email) getResearcherPosts()
    }, [researcher])
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
                <Header user={user} />
                <div className="flex-box justify-start gap-3">
                    <div className="profile w-12" style={{ backgroundImage: `url(${researcher?.profile_picture ? researcher?.profile_picture : "/profile.png"})` }}></div>
                    <div className="flex-box flex-col items-start w-5/6">
                        <div className="hidden md:flex tooltip tooltip-right pr-2 text-left" data-tip="Only Pro users can see researchers' names">
                            <p className="font-medium text-md cursor-default" style={{filter: "blur(2.75px)" }}>{researcher?.name}</p>
                        </div>
                        <p className="font-medium text-md cursor-default md:hidden" style={{filter: "blur(2.75px)" }}>{researcher?.name}</p>
                        <p className="font-light text-sm line-clamp-2">{researcher?.position} at {researcher?.institution}</p>
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
                        <PostCard key={index} user={user} item={item} />
                    ))}
                </div>
            </div>
            <Footer />
            </main>
        </Suspense>
    </>
  )
}
