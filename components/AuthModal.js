import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export default function AuthModal({ baseAuthOption }) {
  const [authOption, setAuthOption] = useState("Login")
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    position: "",
    department: "",
    institution: "",
  })
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""  
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = async (e, form) => {
    const { name, value } = e.target
    if (form == signupData) setSignupData({ ...form, [name]: value })
    if (form == loginData) setLoginData({ ...form, [name]: value })
  }

  const checkForm = async (e, form) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = {}
    newErrors.apiError == null

    if (form == signupData && signupData.password.length < 6) {
      newErrors.password = "password must be at least 6 digits"
    }

    for (const item in form) {
      if (form[item] === "") {
          newErrors[item] = `${item} is required`
      }
    }   

    setErrors(newErrors)
    if (Object.values(form).every(value => value !== "")) {
      if (form == signupData) await signup()
      if (form == loginData) await login()
    }
    else setLoading(false)
  }

  const signup = async () => {
    try {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signupData.email, password: signupData.password, name: signupData.name, position: signupData.position, department: signupData.department, institution: signupData.institution })
    })
    const data = await response.json()
    if (data?.data?.user?.id) {
        await Cookies.set("portiko-id", data?.data?.user?.id, {expires: 30})
        window.location.reload()
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

  const login = async () => {
    try {
      const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: loginData.email, password: loginData.password})
      })
      const data = await response.json()
      if (data) {
          Cookies.set("portiko-id", data.data.user.id, {expires: 30})
          window.location.reload()
      }
      else {
          setLoading(false)
          setErrors(prevState => ({ ...prevState, apiError: "Wrong credentials" }))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setErrors(prevState => ({ ...prevState, apiError: "Wrong credentials" }))
      setLoading(false)
    }  
  }

  const openLoginModal = async () => {
      setAuthOption("Login")
      document.getElementById("authModal").showModal()
  }

  const openSignupModal = async () => {
      setAuthOption("Signup")
      document.getElementById("authModal").showModal()
  }

  useEffect(() => {
    setAuthOption(baseAuthOption)
  }, [baseAuthOption])
  return (
    <dialog id="authModal" className="modal">
      <div className="modal-box space-y-12">
        <div>
          <p className="font-extrabold text-2xl text-center">{authOption == "Login" ? "Log in" : "Sign up"}</p>
          {authOption == "Signup" && (
            <div className="modal-action">
              <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                <div className="w-full space-y-3">
                  <div className="form-section">
                    <label htmlFor="email">Email</label>
                    <input value={signupData.email} onChange={(e) => handleChange(e, signupData)} type="email" id="email" name="email" placeholder="isaac@example.com" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-section">
                    <label htmlFor="password">Password</label>
                    <input value={signupData.password} onChange={(e) => handleChange(e, signupData)} type="password" id="password" name="password" placeholder="*******" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                    {errors.password && <p className="error">{errors.password}</p>}
                  </div>
                  <div className="flex-box items-start gap-6">
                    <div className="form-section">
                      <label htmlFor="name">Name</label>
                      <input value={signupData.name} onChange={(e) => handleChange(e, signupData)} type="text" id="name" name="name" placeholder="Isaac Newton" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="form-section">
                      <label htmlFor="position">Position</label>
                      <input value={signupData.position} onChange={(e) => handleChange(e, signupData)} type="text" id="position" name="position" placeholder="Researcher" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                      {errors.position && <p className="error">{errors.position}</p>}
                    </div>
                  </div>
                  <div className="flex-box items-start gap-6">
                    <div className="form-section">
                      <label htmlFor="department">Department</label>
                      <input value={signupData.department} onChange={(e) => handleChange(e, signupData)} type="text" id="department" name="department" placeholder="Physics" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                      {errors.department && <p className="error">{errors.department}</p>}
                    </div>
                    <div className="form-section">
                      <label htmlFor="institution">Institution</label>
                      <input value={signupData.institution} onChange={(e) => handleChange(e, signupData)} type="text" id="institution" name="institution" placeholder="Cambridge" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                      {errors.institution && <p className="error">{errors.institution}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex-box flex-col items-center space-y-3 w-full">
                  <button type="submit" onClick={(e) => checkForm(e, signupData)} className="button-primary w-full">{loading ? <span className="loading loading-spinner loading-xs flex-box h-full " ></span> : "Sign up"}</button>
                  {errors.apiError && <p className="error">{errors.apiError}</p>}
                  <p>Already have an account? <a onClick={() => openLoginModal()} className="link">Log in</a></p>
                </div>
              </form>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
              </form>
            </div>
          )}
          {authOption == "Login" && (
            <div className="modal-action">
              <form onSubmit={(e) => login(e)} method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                <div className="w-full space-y-3">
                  <div className="form-section">
                    <label>Email</label>
                    <input value={loginData.email} onChange={(e) => handleChange(e, loginData)} id="email" name="email" type="email" placeholder="example@email.com" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-section">
                    <label>Password</label>
                    <input value={loginData.password} onChange={(e) => handleChange(e, loginData)} type="password" id="password" name="password" placeholder="*******" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                    {errors.password && <p className="error">{errors.password}</p>}
                  </div>
                </div>
                <div className="flex-box flex-col items-center space-y-3 w-full">
                  <button type="submit" onClick={(e) => checkForm(e, loginData)} className="button-primary w-full">{loading ? <span className="flex-box h-full loading loading-spinner pb-0 loading-xs flex-box h-full "></span> : "Log in"}</button>
                  {errors.apiError && <p className="error">{errors.apiError}</p>}
                  <p>Don"t have an account yet? <a onClick={() => openSignupModal()} className="link">Sign up</a></p>
                </div>
              </form>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
} 
  