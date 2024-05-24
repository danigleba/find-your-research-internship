"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import Catagories from "@/components/Categories"
import PostCard from "@/components/PostCard"
import Footer from "@/components/Footer"

export default function Home() {
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

  const getAllPosts = async () => {
    try {
      const response = await fetch("/api/db/getAllPosts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setPosts(data.data)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    getUserData()
  }, [Cookies])
  return (
    <main className="mt-6 md:mt-12 text-[#30313D]">
      <div className="mx-6 md:mx-24 space-y-12">
        <Header user={user} />
        <div className="space-y-6">
          <SearchBar />
          <Catagories />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {posts?.map((item, index) => (
            <PostCard user={user} key={index} title={item.title} description={item.description} image={item.image} author_id={item.author} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
