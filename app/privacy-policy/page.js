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
                                <p className="font-bold text-2xl md:text-3xl">Privacy policy</p>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Overview</h2>
                                    <p>Thank you for using Lab Inter ("we," "us," or "our"), a Software as a Service (SaaS) platform available at joinLab Inter.com. This Privacy Policy outlines how we collect, use, and safeguard your information.
                                    </p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Information Collected</h2>
                                    <p>We collect personal information you provide when using Lab Inter, including but not limited to your name, email address, and payment details processed through Stripe.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Use of Information</h2>
                                    <p>We use your information to provide and improve Lab Inter services, process payments, and communicate with you. We do not sell or share your information with third parties, except as required by law.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Marketing Use of Image</h2>
                                    <p>We may utilize your profile picture for marketing purposes.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Payment Processing</h2>
                                    <p>Payment information is securely processed by Stripe. We do not store your payment details on our servers.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Cookies and Tracking</h2>
                                    <p>Lab Inter may use cookies and similar technologies to enhance your user experience and gather information about how you use our platform.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Data Security</h2>
                                    <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Third-Party Links</h2>
                                    <p>Lab Inter may contain links to third-party websites. We are not responsible for the privacy practices of these websites. Please review the privacy policies of third-party sites.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Children"s Privacy</h2>
                                    <p>Lab Inter is not intended for children under 18. We do not knowingly collect or store information from individuals under 18.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Changes to the Privacy Policy</h2>
                                    <p>We reserve the right to modify this Privacy Policy at any time. Changes will be effective upon posting to the Lab Inter website.</p>
                                </div>
                                <div>
                                    <h2 className="subtitle text-lg text-[#30313D]">Governing Law</h2>
                                    <p>This Privacy Policy is governed by the laws of Spain.</p>
                                </div>
                                <div>
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