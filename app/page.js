import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import Catagories from "@/components/Categories"
import UserCard from "@/components/UserCard"

export default function Home() {
  return (
    <main className="mx-24 my-12 mb-24 space-y-12 text-[#30313D]">
      <Header />
      <div className="space-y-6">
        <SearchBar />
        <Catagories />
      </div>
      <div className="grid grid-cols-3 gap-12 w-full">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </main>
  )
}
