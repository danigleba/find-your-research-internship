export default function Catagories() {
    const categories = ["Biology", "Education", "Technology", "Neuroscience", "category", "category", "category", "category"]
    return (
      <main className="flex-box flex-wrap space-x-6">
        {categories.map((item, index) => (
            <div key={index} className="bg-[#f9f9f9] text-[#30313D] border border-[#dee1e7] px-6 py-2 rounded-md">
                <p className="text-sm font-semibold">{item}</p>
            </div>
        ))}
      </main>
    )
  }
  