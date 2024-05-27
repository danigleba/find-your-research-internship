"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import PostCard from "@/components/PostCard"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Pagination from "@/components/Pagination"

export default function Home() {
  const searchParams = useSearchParams()
  const categories = ["STEM", "Humanities", "Social Sciences", "Health Sciences",  "Arts"]
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [user, setUser] = useState({})
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const page = searchParams.get("page") || 0

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

  const getPosts = async () => {
    try {
      const response = await fetch("/api/db/getPosts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({page: page})
      })
      const data = await response.json({})
      setPosts(data.data)
    } catch (error) {
        console.error("Error fetching data:", error)
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

  const searchCollaborations = async (e) => {  
    e.preventDefault()
    if (search) getSearchedPosts()
    if (search == "") getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    getUserData()
  }, [Cookies])

  useEffect(() => {
    getPosts()
  }, [page])
  return (
    <main className="mt-6 md:mt-12 text-[#30313D] overflow-hidden">
      <div className="mx-6 md:mx-24 space-y-12 pb-12">
        <Header user={user} />
        <div className="space-y-6">
          {!user && (
            <Hero />
          )}
          <div id="content" className="space-y-6">
            {/*Search Bar*/}
            <div className="flex-box flex-col justify-center w-full space-y-3 py-6"> 
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
            </div>
            {/*Categories
            <div className="flex-box justify-start md:justify-center space-x-6 overflow-x-auto pb-1 md:pb-3">
              {categories.map((item, index) => (
                  <button key={index} onClick={(e) => item != category ? setCategory(item)  :setCategory("")} className={`${item == category ? "bg-[#30313D] text-white border border-[#30313D]" : "bg-[#f9f9f9] text-[#30313D] border border-[#dee1e7]"}  px-6 py-2 rounded-md`}>
                      <p className="text-sm font-semibold whitespace-nowrap">{item}</p>
                  </button>
              ))}
            </div>*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {category == "" && (
              <>
                {posts?.map((item, index) => (
                  <PostCard user={user} key={index} item={item} />
                ))}
              </>
            )}
            {category != "" && (
              <>
                {filteredPosts?.map((item, index) => (
                  <PostCard user={user} key={index} item={item} />
                ))}
              </>
            )}
          </div>
          </div>
        </div>
      </div>
      <Pagination page={page} user={user}/>
      <Footer />
    </main>
  )
}
