export default function LandingSearch({ }) {
    return (
        <div className="">
            <form onSubmit={(e) => searchCollaborations(e)} className="flex-box justify-between gap-6 w-full md:w-96 border border-[#dee1e7] rounded-full pl-6 pr-1 placeholder:text-[#30313D] w-2/3">
                <input type="text" placeholder="Search..." className="no-ring w-full py-1 placeholder:text-[#dee1e7] focus:outline-none focus:ring-0" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#dee1e7" className="size-5 mr-3 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </form>
        </div>
    )
}
