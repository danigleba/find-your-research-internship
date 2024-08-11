"use client"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { IoIosArrowRoundBack } from "react-icons/io"

export default function PrivacyPolicy() {
    const router = useRouter()
    const [user, setUser] = useState({})

    const getUserData = async () => {
        try {
          const response = await fetch("/api/db/getUserData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: Cookies.get("Lab Inter-id")})
          })
          const data = await response.json()
          if (data?.data?.[0]) setUser(data?.data?.[0])
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
                <meta name="description" content="Lab Inter | Find scientific collaborations in seconds"/>
                <meta property="og:title" content="Lab Inter" />
                <meta property="og:description" content="Lab Inter | Find scientific collaborations in seconds" />
                <meta property="og:image" content="/icon.png" />
                <meta property="og:url" content="joinLab Inter.com" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Lab Inter" />
                <meta name="twitter:description" content="Lab Inter | Find scientific collaborations in seconds" />
                <meta name="twitter:image" content="/icon.png" />
                <link rel="icon" href="/icon.png" />
                <title>Lab Inter</title>
            </Head>
            <main className="mt-6 md:mt-12 text-[#30313D]">
                <div className="mx-6 md:mx-24 space-y-12 pb-12">
                    <Header user={user} />
                    <div className="legal-doc">
                        <div className="flex justify-center items-center w-full">
                            <div className="space-y-6 w-full md:w-2/3 ">
                                <button onClick={() => router.push("/")} className="flex-box gap-3 px-0">
                                    <IoIosArrowRoundBack size={20} />
                                    Go back
                                </button>
                                <p className="font-bold text-2xl md:text-3xl">Terms of Service</p>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Overview</h2>
                                    <p>Thank you for using Lab Inter ("we," "us," or "our"), a Software as a Service (SaaS) platform available at joinLab Inter.com. By accessing or using our services, you agree to comply with and be bound by these Terms of Service.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">User Agreement</h2>
                                    <p>By using Lab Inter, you affirm that you are at least 18 years old and capable of entering into a legally binding agreement.</p>
                                </div>
                                <div >
                                    <h2 className="subtitle text-lg text-[#30313D]">SaaS Subscription</h2>
                                    <p>Lab Inter offers SaaS subscriptions, accessible through joinLab Inter.com. Payments for subscriptions are processed through Stripe. By subscribing, you agree to Stripe"s terms and conditions.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Payment and Billing</h2>
                                    <p>All payments are processed securely through Stripe. You agree to provide accurate and complete billing information. Lab Inter is not responsible for any charges or fees imposed by your financial institution.</p>
                                </div>
                                <div >
                                    <h2 className="subtitle text-lg text-[#30313D]">Termination</h2>
                                    <p>We reserve the right to terminate or suspend your account at our discretion, without notice, if we believe you have violated these Terms of Service.</p>
                                </div>
                                <div >
                                    <h2 className="subtitle text-lg text-[#30313D]">Privacy Policy</h2>
                                    <p>Your use of Lab Inter is also governed by our Privacy Policy. Please review the policy at <a href="joinLab Inter.com/pp" className="underline">joinLab Inter.com/pp</a>.</p>
                                </div>
                                <div >
                                    <h2 className="subtitle text-lg text-[#30313D]">Intellectual Property</h2>
                                    <p>Lab Inter and its content are protected by intellectual property laws. You may not use, reproduce, or distribute any part of the service without our express written permission.</p>
                                </div>
                                <div >
                                    <h2 className="subtitle text-lg text-[#30313D]">Limitation of Liability</h2>
                                    <p>Lab Inter is provided "as is," and we disclaim any warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of Lab Inter.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Governing Law</h2>
                                    <p>These Terms of Service are governed by the laws of Spain. Any disputes shall be resolved in the courts of Spain.</p>
                                </div>
                                <div className="pb-4">
                                    <h2 className="subtitle text-lg text-[#30313D]">Contact Information:</h2>
                                    <p>Email: <a className="underline" href="mailto:daniglebapuig@gmail.com">daniglebapuig@gmail.com</a> <br/><br/>For any questions or concerns regarding these Terms of Service, please contact us at the provided email address. <br/><br/> Thank you for using Lab Inter!</p>
                                    <p className="legal-text pt-6">Last updated: 11.08.2024</p>
                                </div>
                                <button onClick={() => router.push("/")} className="flex-box gap-3 px-0">
                                    <IoIosArrowRoundBack size={20} />
                                    Go back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}