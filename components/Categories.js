export default function Catagories() {
  const categories = ["Biology", "Education", "Technology", "Neuroscience", "category", "category", "category", "category", "Neuroscience", "category", "category", "category", "Neuroscience", "category", "category", "category", "Neuroscience", "category", ]
  return (
    <main className="flex-box justify-start space-x-6 overflow-x-scroll pb-3">
      {categories.map((item, index) => (
          <button key={index} className="bg-[#f9f9f9] text-[#30313D] border border-[#dee1e7] px-6 py-2 rounded-md">
              <p className="text-sm font-semibold">{item}</p>
          </button>
      ))}
    </main>
  )
} 
  