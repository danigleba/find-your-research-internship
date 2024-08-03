import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Toast from "./Toast"
import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })

export default function NewProjectModal({ user, getUserPosts, getUserProjects}) {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    categories: "STEM",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = async (e, form) => {
    e.preventDefault()
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
        uploadNewProject()
    }
    else setLoading(false)
  }

  const uploadNewProject = async () => {
    try {
    const response = await fetch("/api/db/uploadNewProject", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, postData: postData })
    })
    console.log(response)
    const data = await response.json()
    if (data) {
      closeNewPostModal()
      setPostData({title: "", description: "", category: "STEM"})
      showSuccessToast()
      getUserPosts()
      getUserProjects()
      setPostData(prevState => ({...prevState }))
      router.refresh()
      setLoading(false)
    }
    else {
        setLoading(false)
        setErrors(prevState => ({ ...prevState, apiError: "An unexpected error occurred. Please try again." }))
    }
    } catch (error) {
      console.error("Error fetching data:", error)
      setErrors(prevState => ({ ...prevState, apiError: "An unexpected error occurred. Please try again." }))
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
    const closeButton = document.getElementById("closeNewProjectModal")
    closeButton.click()
  }
  return (
    <>
      <dialog id="newProjectModal" className="modal">
        <div className="modal-box space-y-6">
          <div className="modal-action mt-0 p-3">
            <form method="dialog" className="flex-box flex-col items-center w-full space-y-6" >
              <p className="font-extrabold text-2xl text-center">New Project</p>
              <div className="w-full space-y-6">
                <div className="form-section">
                  <label htmlFor="Title">Name of the experiment or technique you need help with</label>
                  <input value={postData?.title} onChange={(e) => handleChange(e, postData)} type="text" id="title" name="title" placeholder="Identification and characterization of microorganism " className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                  {errors.title && <p className="error">{errors.title}</p>}
                </div>        
                <div className="form-section">
                  <label htmlFor="Description">Description</label>
                  <textarea value={postData?.description} onChange={(e) => handleChange(e, postData)} type="text" id="description" name="description" rows={3} className="textarea textarea-bordered w-full leading-6 focus:outline-none focus:ring-0" placeholder="Experiment the identification and characterization of microorganism using techniques like..."></textarea>
                  {errors.description && <p className="error">{errors.description}</p>}
                </div>      
              </div>
              <div className="flex-box flex-col items-center space-y-3 w-full">
                <button type="submit" onClick={(e) => checkForm(e, postData)} className="button-primary w-full">{loading ? <span className="loading loading-spinner loading-xs flex-box h-full "></span> : "Add Project"}</button>
                {errors.apiError && <p className="error">{errors.apiError}</p>}
              </div>   
            </form>                  
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="closeNewProjectModal">close</button>
        </form>         
      </dialog>
      {showToast == true && (
        <Toast text="Project submitted!" />
      )}  
    </>
  )
} 
