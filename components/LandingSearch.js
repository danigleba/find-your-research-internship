import PostCard from "./PostCard"


export default function LandingSearch({ }) {
    return (
        <>
            <h2 className="underline decoration-wavy decoration-fuchsia-300">Find a professor that fits you</h2>
            <div className="flex-box flex-col gap-3 md:flex-row justify-between">
                <form onSubmit={(e) => {e.preventDefault(); document.getElementById("checkout").showModal()}} className="flex-box justify-between gap-6 w-full md:w-96 border border-[#dee1e7] rounded-full pl-6 pr-1 placeholder:text-[#30313D] w-2/3">
                    <input type="text" placeholder="Search..." className="no-ring w-full py-1 placeholder:text-[#dee1e7] focus:outline-none focus:ring-0" />
                    <button type="submit" className="px-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#dee1e7" className="size-5 mr-3 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
                <div className="flex-box flex-wrap gap-3 overflow-scroll scrollbar-hide justify-start">
                    <button onClick={() => document.getElementById("checkout").showModal()} className="filter">📍 Filter by State</button>
                    <button onClick={() => document.getElementById("checkout").showModal()} className="filter">🏫 Filter by School</button>
                    <button onClick={() => document.getElementById("checkout").showModal()} className="filter">🐸 Filter by Department</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
            <div className="flex-box gap-6">
                <a onClick={() => document.getElementById("checkout").showModal()} className="font-medium hover:underline cursor-pointer">9 out of 250+</a>
                <button onClick={() => document.getElementById("checkout").showModal()} className="bg-[#30313D] text-white font-medium hover:scale-105 transition py-2 px-6">Show more</button>
            </div>
        </>
    )
}
