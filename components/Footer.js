import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })

export default function Footer() {
    return (
        <main className="bg-[#f9f9f9] border-t border-[#dee1e7] h-full w-full md:px-12 pb-16 pt-3 mt-24">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-12 mx-8 md:mx-20 mt-12">
                {/*Company summary*/}
                <div className="flex flex-col items-center md:items-start justify-center">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <p className={`${rubik.className} text-[#30313D] text-2xl font-bold`}>Portiko</p>
                    </div>
                    <p className="text-sm pt-3 text-center md:text-left">Find scientific collaborations in minutes</p>
                    <p className="text-sm text-center md:text-left">Portiko © 2024 All rights reserved</p>
                </div>
                <div className="md:flex md:justify-end items-center space-y-12 md:space-y-0 gap-24 text-lg md:text-sm">
                    {/*Social*/}
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-lg pb-2">Social</p>
                        <div className="space-y-1">
                            <div>
                                <a href="https://twitter.com/danigleba" target="_blank" className="hover:underline px-12 md:px-0">X</a>
                            </div> 
                            <div>
                                <a href="https://www.linkedin.com/in/danigleba/" target="_blank" className="hover:underline px-12 md:px-0">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    {/*Legal*/}
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-lg pb-2">Legal</p>
                        <div className="space-y-1">
                            <div>
                                <a href="/terms-of-service" className="hover:underline px-12 md:px-0">Terms of servide</a>
                            </div> 
                            <div>
                                <a href="/privacy-policy" className="hover:underline px-12 md:px-0">Privacy policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
  }
  