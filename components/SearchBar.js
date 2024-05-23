export default function SearchBar() {
  return (
    <main className="flex-box flex-col justify-center w-full space-y-3"> 
      <h2>Search for the experiment or analysis you do or you need</h2>
      <div className="flex-box gap-6 w-full md:w-2/3 border border-[#dee1e7] shadow-sm rounded-full px-6 placeholder:text-[#30313D] w-2/3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#dee1e7" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" placeholder="MRNA in situ hybridization..." className="no-ring w-full py-2 placeholder:text-[#dee1e7] focus:outline-none focus:ring-0" />
      </div>
    </main>
  )
}
  