export default function Toast({ text }) {
  return (
    <div className="toast toast-center z-50">
        <div className="bg-[#30313D] text-white font-semibold rounded-md text-center border-none px-12 py-3 shadow-md">
            <span >{text}</span>
        </div>
    </div>
  )
} 
  