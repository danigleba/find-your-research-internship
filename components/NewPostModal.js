import { useState } from "react"
import Toast from "./Toast"

export default function NewPostModal({ user }) {
  const categories = ["STEM", "Humanities", "Social Sciences", "Health",  "Arts"]
  const [showToast, setShowToast] = useState(false)
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    categories: "STEM",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = async (e, form) => {
    const { name, value } = e.target
    setPostData({ ...form, [name]: value })
  }

  const checkForm = async (e, form) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = {}
    newErrors.apiError == null

    for (const item in form) {
      if (form[item] === "") {
          newErrors[item] = `${item} is required`
      }
    }

    setErrors(newErrors)
    if (Object.values(form).every(value => value !== "")) {
      uploadNewPost()
    }
    else setLoading(false)
  }

  const uploadNewPost = async () => {
    try {
    const response = await fetch("/api/db/uploadNewPost", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, postData: postData })
    })
    const data = await response.json()
    if (data) {
      closeNewPostModal()
      showSuccessToast()
      setLoading(false)
    }
    else {
        setLoading(false)
        setErrors(prevState => ({ ...prevState, apiError: "An unexpected error occurred. Try using a different email." }))
    }
    } catch (error) {
      console.error("Error fetching data:", error)
      setErrors(prevState => ({ ...prevState, apiError: "An unexpected error occurred. Try using a different email." }))
      setLoading(false)
    }  
  }

  const showSuccessToast = async () => {
    setShowToast(true)
    
    const timeout = setTimeout(() => {
      setShowToast(false)
    }, 5000)
    
    return () => clearTimeout(timeout)
  }

  const closeNewPostModal = async () => {
    const closeButton = document.getElementById("closeNewPostModal")
    closeButton.click()
  }
  return (
    <>
      <dialog id="newPostModal" className="modal">
        <div className="modal-box space-y-6">
          <div className="modal-action">
            <form method="dialog" className="flex-box flex-col items-center w-full space-y-6" >
              <p className="font-extrabold text-2xl text-center">Post a new collaboration</p>
              <div className="w-full space-y-3">
                <div className="form-section">
                  <label htmlFor="Title">Title</label>
                  <input value={postData?.title} onChange={(e) => handleChange(e, postData)} type="text" id="title" name="title" placeholder="Experimtne example" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                  {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="form-section">
                  <label htmlFor="Description">Description</label>
                  <textarea value={postData?.description} onChange={(e) => handleChange(e, postData)} type="text" id="description" name="description" className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder={`Hi, I would love to collaborate!`}></textarea>
                  {errors.description && <p className="error">{errors.description}</p>}
                </div>      
                <div className="form-section">
                  <label htmlFor="categories">Category</label>
                  <div className="w-full border border-gray-300 px-3 rounded-lg" >
                    <select value={postData?.categories} onChange={(e) => handleChange(e, postData)} id="categories" name="categories" className="w-full h-12 focus:outline-none focus:ring-0">
                      {categories.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex-box flex-col items-center space-y-3 w-full">
                <button type="submit" onClick={(e) => checkForm(e, postData)} className="button-primary w-full">{loading ? <span className="loading loading-spinner loading-xs flex-box h-full "></span> : "Post collaboration"}</button>
                {errors.apiError && <p className="error">{errors.apiError}</p>}
              </div>
            </form>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
            </form>                    
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="closeNewPostModal">close</button>
        </form>         
      </dialog>
      {showToast == true && (
        <Toast text="Post submitted!" />
      )}  
    </>
  )
} 
