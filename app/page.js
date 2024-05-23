import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import Catagories from "@/components/Categories"
import PostCard from "@/components/PostCard"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="mt-6 md:mt-12 text-[#30313D]">
      <div className="mx-6 md:mx-24 space-y-12">
        <Header />
        <div className="space-y-6">
          <SearchBar />
          <Catagories />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
      <Footer />
    </main>
  )
}
