"use client"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { useEffect, useState, Suspense} from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import CheckoutModal from "@/components/CheckOutModal"
import FinalCTA from "@/components/FinalCta"
import LandingSearch from "@/components/LandingSearch"

export default function Home() {
  const router = useRouter()
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
      if (data?.data?.[0]){
        setUser(data?.data?.[0])
        router.push("/account")
      }
      else setUser(undefined)
    } catch (error) {
      console.error("Error fetching data:", error)
    } 
  }

  useEffect(() => {
    getUserData()
  }, [Cookies])
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
            <div className="space-y-6">
             <Hero />
            </div>
            <LandingSearch />
            <FinalCTA />
          </div>
          <Footer />
        </main>
        <CheckoutModal />
      </Suspense>
    </>
  )
}
