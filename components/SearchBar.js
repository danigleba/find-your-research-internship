export default function SearchBar() {
    return (
      <main className="flex-box justify-start gap-6 w-full border border-[#30313D] rounded-full px-6 placeholder:text-[#30313D]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" placeholder="Looking for..." className="no-ring w-full py-2" />
      </main>
    )
  }
  