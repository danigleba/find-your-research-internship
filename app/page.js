"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import PostCard from "@/components/PostCard"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"

export default function Home() {
  const categories = ["STEM", "Humanities", "Social Sciences", "Health",  "Arts"]
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [user, setUser] = useState({})
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

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

  const getAllPosts = async () => {
    try {
      const response = await fetch("/api/db/getAllPosts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
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

  const filterPostsByCategory = async () => {
    const filteredPosts = posts.filter(item => item.categories.includes(`${category}`))
    setFilteredPosts(filteredPosts)
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    getUserData()
  }, [Cookies])

  useEffect(() => {
    if (search) getSearchedPosts()
    if (search == "") getAllPosts()
  }, [search])

  useEffect(() => {
    filterPostsByCategory()
  }, [category])
  return (
    <main className="mt-6 md:mt-12 text-[#30313D] overflow-hidden">
      <div className="mx-6 md:mx-24 space-y-12 pb-12">
        <Header user={user} />
        <div className="space-y-6">
          {!Cookies.get("portiko-id") && (
            <Hero />
          )}
          {/*Search Bar*/}
          <div className="flex-box flex-col justify-center w-full space-y-3"> 
            <h2>I need collaborators with expertise in</h2>
            <div className="flex-box gap-6 w-full md:w-2/3 border border-[#dee1e7] shadow-sm rounded-full px-6 placeholder:text-[#30313D] w-2/3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#dee1e7" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." className="no-ring w-full py-2 placeholder:text-[#dee1e7] focus:outline-none focus:ring-0" />
            </div>
          </div>
          {/*Categories*/}
          <div className="flex-box justify-start md:justify-center space-x-6 overflow-x-auto pb-1 md:pb-3">
            {categories.map((item, index) => (
                <button key={index} onClick={(e) => item != category ? setCategory(item)  :setCategory("")} className={`${item == category ? "bg-[#30313D] text-white border border-[#30313D]" : "bg-[#f9f9f9] text-[#30313D] border border-[#dee1e7]"}  px-6 py-2 rounded-md`}>
                    <p className="text-sm font-semibold whitespace-nowrap">{item}</p>
                </button>
            ))}
          </div>
        </div>
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
      <Footer />
    </main>
  )
}
