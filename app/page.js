import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import Catagories from "@/components/Categories"
import UserCard from "@/components/UserCard"

export default function Home() {
  return (
    <main className="mx-24 my-12 mb-24 space-y-6">
      <Header />
      <SearchBar />
      <Catagories />
      <UserCard />
    </main>
  )
}
