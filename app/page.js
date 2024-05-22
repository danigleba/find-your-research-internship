import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import Catagories from "@/components/Categories"
import UserCard from "@/components/UserCard"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="mt-12 text-[#30313D]">
      <div className="mx-24 space-y-12">
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
      </div>
      <Footer />
    </main>
    
  )
}
