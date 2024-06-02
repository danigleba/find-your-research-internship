"use client"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function PrivacyPolicy() {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const resetPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors(prevState => ({...prevState, apiError: undefined}))
        
        if (newPassword == "") {
            setLoading(false)
            setErrors(prevState => ({...prevState, newPassword: "A new password is required."}))
            return
        } else setErrors(prevState => ({...prevState, newPassword: undefined }))

        if (newPassword != confirmedPassword) {
            setLoading(false)
            setErrors(prevState => ({...prevState, confirmedPassword: "Password don't match."}))
            return
        } else setErrors(prevState => ({...prevState, confirmedPassword: undefined }))

        if (newPassword?.length < 6) {
            setLoading(false)
            setErrors(prevState => ({...prevState, apiError: "Password must be at least 6 characters."}))
            return
        } else setErrors(prevState => ({...prevState, apiError: undefined }))

        try {
            const response = await fetch("/api/auth/resetPassword", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newPassword: newPassword, accessToken: accessToken })
            })
            const data = await response.json()
            if (data) router.push("/")
            else setErrors(prevState => ({...prevState, apiError: "Error resetting password. Please try again."}))
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        if (!params.get("access_token")) router.push("/")
        setAccessToken(params.get("access_token"))
    }, [])
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
            <main className="mt-6 md:mt-12 text-[#30313D]">
                <div className="mx-6 md:mx-24 space-y-12 pb-12">
                    <Header />
                    <form method="dialog" className="flex-box flex-col w-full w-full space-y-6 py-24">
                        <p className="font-extrabold text-2xl text-center">Reset your password</p>
                        <div className="w-full md:w-1/3 space-y-6">
                            <div className="w-full space-y-3">
                                <div className="form-section">
                                    <label className="flex-box justify-between">New Password</label>
                                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" id="newPassword" name="newPassword" placeholder="*******" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    {errors.newPassword && <p className="error">{errors.newPassword}</p>}
                                </div>
                                <div className="form-section">
                                    <label className="flex-box justify-between">Confirm Password</label>
                                    <input value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} type="password" id="confirmedPassword" name="confirmedPassword" placeholder="*******" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                                    {errors.confirmedPassword && <p className="error">{errors.confirmedPassword}</p>}
                                </div>
                            </div>
                            <div className="flex-box flex-col items-center space-y-3 w-full">
                                <button type="submit" onClick={(e) => resetPassword(e)} className="button-primary w-full">{loading ? <span className="flex-box h-full loading loading-spinner pb-0 loading-xs flex-box h-full "></span> : "Reset password"}</button>
                                {errors.apiError && <p className="error">{errors.apiError}</p>}
                                <a onClick={() => router.push("/")} className="link">Go back</a>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </main>
        </>
    )
}