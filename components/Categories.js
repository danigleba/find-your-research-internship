export default function Catagories() {
    const categories = ["category", "category", "category", "category", "category", "category", "category", "category"]
    return (
      <main className="flex-box flex-wrap space-x-6">
        {categories.map((item, index) => (
            <div key={index} className="bg-[#30313D] text-white px-6 py-2 rounded-md">
                <p className="text-sm font-medium">{item}{index}</p>
            </div>
        ))}
      </main>
    )
  }
  