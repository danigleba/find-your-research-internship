export default function UserCard() {
    return (
        <main className="flex-box flex-col w-full items-start space-y-6 p-2 rounded-xl pb-6 bg-[#f9f9f9]  border-[#dee1e7]">
            <div className="bg-cover bg-[url('/example.jpg')] w-full aspect-video rounded-lg"></div>
            <div className="px-6 space-y-6">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="font-extrabold text-2xl">MRNA in situ hybridization</p>
                        <div className="flex-box justify-start gap-3">
                            <div className="profile"></div>
                            <div className="flex-box flex-col items-start">
                                <p className="font-bold text-md">Ana Alcaina-Caro</p>
                                <p className="font-light text-sm">PhD student at CABD-CSIC</p>
                            </div>
                        </div>
                    </div>
                    <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de tex... <a className="underline">Read more</a></p>
                </div>             
                <button className="button-primary w-full">Contact</button>   
            </div>
        </main>
    )
  }
  