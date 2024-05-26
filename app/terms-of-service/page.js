"use client"
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
            body: JSON.stringify({ id: Cookies.get("portiko-id")})
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
                                    <h2>Overview</h2>
                                    <p>Thank you for using Portiko ("we," "us," or "our"), a Software as a Service (SaaS) platform available at getPortiko.com. By accessing or using our services, you agree to comply with and be bound by these Terms of Service.</p>
                                </div>
                                <div>
                                    <h2>User Agreement</h2>
                                    <p>By using Portiko, you affirm that you are at least 18 years old and capable of entering into a legally binding agreement.</p>
                                </div>
                                <div >
                                    <h2>SaaS Subscription</h2>
                                    <p>Portiko offers SaaS subscriptions, accessible through getPortiko.com. Payments for subscriptions are processed through Stripe. By subscribing, you agree to Stripe"s terms and conditions.</p>
                                </div>
                                <div>
                                    <h2>Payment and Billing</h2>
                                    <p>All payments are processed securely through Stripe. You agree to provide accurate and complete billing information. Portiko is not responsible for any charges or fees imposed by your financial institution.</p>
                                </div>
                                <div >
                                    <h2>Termination</h2>
                                    <p>We reserve the right to terminate or suspend your account at our discretion, without notice, if we believe you have violated these Terms of Service.</p>
                                </div>
                                <div >
                                    <h2>Privacy Policy</h2>
                                    <p>Your use of Portiko is also governed by our Privacy Policy. Please review the policy at <a href="getPortiko.com/pp" className="underline">getPortiko.com/pp</a>.</p>
                                </div>
                                <div >
                                    <h2>Intellectual Property</h2>
                                    <p>Portiko and its content are protected by intellectual property laws. You may not use, reproduce, or distribute any part of the service without our express written permission.</p>
                                </div>
                                <div >
                                    <h2>Limitation of Liability</h2>
                                    <p>Portiko is provided "as is," and we disclaim any warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of Portiko.</p>
                                </div>
                                <div>
                                    <h2>Governing Law</h2>
                                    <p>These Terms of Service are governed by the laws of Spain. Any disputes shall be resolved in the courts of Spain.</p>
                                </div>
                                <div className="pb-4">
                                    <h2>Contact Information:</h2>
                                    <p>Email: <a className="underline" href="mailto:dani@joinportiko.com">dani@joinportiko.com</a> <br/><br/>For any questions or concerns regarding these Terms of Service, please contact us at the provided email address. <br/><br/> Thank you for using Portiko!</p>
                                    <p className="legal-text pt-6">Last updated: 31.12.2023</p>
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