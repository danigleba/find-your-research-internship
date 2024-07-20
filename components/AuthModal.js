import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Toast from "@/components/Toast"
import { FcGoogle } from "react-icons/fc"

export default function AuthModal({ baseAuthOption }) {
  const router = useRouter()
  const [authOption, setAuthOption] = useState("Signup")
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""  
  })
  const [resetPasswordEmail, setResetPasswordEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

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
        router.push("/onboarding")
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

  const sendPasswordRestEmail = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (resetPasswordEmail == "") {
      setErrors(prevState => ({ ...prevState, resetPasswordEmail: "Email is required" }))
      setLoading(false)
      return
    } else setErrors(prevState => ({ ...prevState, resetPasswordEmail: undefined }))

    try {
      const response = await fetch("/api/auth/sendPasswordResetEmail", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: resetPasswordEmail })
      })
      const data = await response.json()
      if (data) {
        closeForgotPasswordModal()
        showSuccessToast()
        setLoading(false)
        setErrors({})
      } 
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
      setErrors(prevState => ({ ...prevState, apiError: "Error sending email. Please try again." }))
    } 
  }

  const openLoginModal = async () => {
    closeForgotPasswordModal()
    setAuthOption("Login")
    document.getElementById("loginModal").showModal()
  }


  const closeLoginModal = async () => {
    const closeButton = document.getElementById(`closeLoginModal`)
    closeButton.click()  
  }

  const openForgotPasswordModal = async (e) => {
    e.preventDefault()
    closeLoginModal()
    document.getElementById("forgotPasswordModal").showModal()
  }
  const closeForgotPasswordModal = async (e) => {
    const closeButton = document.getElementById(`closeForgotPasswordModal`)
    closeButton.click()  
  }

  const openSignupModal = async () => {
      setAuthOption("Signup")
      document.getElementById("loginModal").showModal()
  }

  const showSuccessToast = async () => {
    setShowToast(true)
    
    const timeout = setTimeout(() => {
      setShowToast(false)
    }, 5000)
    
    return () => clearTimeout(timeout)
  }

  useEffect(() => {
    setAuthOption(baseAuthOption)
  }, [baseAuthOption])

  useEffect(() => {
    console.log(errors)
  }, [errors])
  return (
    <>
      <dialog id="loginModal" className="modal">
        <div className="modal-box space-y-12">
          <div className="p-3">
            <p className="font-extrabold text-2xl text-center">Log in</p>
            <div className="modal-action">
              <form onSubmit={(e) => login(e)} method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                <div className="w-full space-y-3">
                  <div className="form-section">
                    <label>Email</label>
                    <input value={loginData.email} onChange={(e) => handleChange(e, loginData)} id="email" name="email" type="email" placeholder="example@email.com" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-section">
                    <label className="flex-box justify-between">Password <a onClick={() => {closeLoginModal(); document.getElementById("forgotPasswordModal").showModal()}} className="link text-[#e07a5f]">Forgot Password?</a></label>
                    <input value={loginData.password} onChange={(e) => handleChange(e, loginData)} type="password" id="password" name="password" placeholder="*******" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                    {errors.password && <p className="error">{errors.password}</p>}
                  </div>
                </div>
                <div className="flex-box flex-col items-center space-y-3 w-full">
                  <button type="submit" onClick={(e) => checkForm(e, loginData)} className="button-primary w-full">{loading ? <span className="flex-box h-full loading loading-spinner pb-0 loading-xs flex-box h-full "></span> : "Log in"}</button>
                  {errors.apiError && <p className="error">{errors.apiError}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="closeLoginModal">close</button>
        </form>
      </dialog>
      <dialog id="signupModal" className="modal">
        <div className="modal-box space-y-12">
          <div className="p-3">
            <p className="font-extrabold text-2xl text-center">Create an account</p>
            <div className="modal-action">
              <form method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
                <div className="w-full space-y-3">
                  <div className="form-section">
                      <label htmlFor="name">Name</label>
                      <input value={signupData.name} onChange={(e) => handleChange(e, signupData)} type="text" id="name" name="name" placeholder="Isaac Newton" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                      {errors.name && <p className="error">{errors.name}</p>}
                  </div>
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
                </div>
                <div className="flex-box flex-col items-center space-y-3 w-full">
                  <button type="submit" onClick={(e) => checkForm(e, signupData)} className="button-primary w-full">{loading ? <span className="loading loading-spinner loading-xs flex-box h-full " ></span> : "Sign up"}</button>
                  {errors.apiError && <p className="error">{errors.apiError}</p>}
                </div>
                <p className="text-xs text-center w-full">By signing up, you agree to our <a href="/privacy-policy" className="underline">privacy policy</a> and <a href="/terms-of-service" className="underline">terms of service</a>.</p>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="closeLoginModal">close</button>
        </form>
      </dialog>
      {/*Reset Password Modal*/}
      <dialog id="forgotPasswordModal" className="modal">
        <div className="modal-box">
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <p className="font-extrabold text-2xl text-center">Reset Password</p>
              <p>We'll email you a link to reset your password.</p>
            </div>
            <form onSubmit={(e) => login(e)} method="dialog" className="flex-box flex-col items-end w-full space-y-6" >
              <div className="w-full space-y-3">
                <div className="form-section">
                  <label>Email</label>
                  <input value={resetPasswordEmail} onChange={(e) => setResetPasswordEmail(e.target.value)} id="resetPasswordEmail" name="resetPasswordEmail" type="email" placeholder="example@email.com" className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"></input>
                  {errors.resetPasswordEmail && <p className="error">{errors.resetPasswordEmail}</p>}
                </div>
              </div>
              <div className="flex-box flex-col items-center space-y-3 w-full">
                <button type="submit" onClick={(e) => sendPasswordRestEmail(e)} className="flex-box items-center button-primary w-full">{loading ? <span className="flex-box h-full loading loading-spinner pb-0 loading-sm flex-box h-full "></span> : "Send email"}</button>
                {errors.apiError && <p className="error">{errors.apiError}</p>}
                <a onClick={() => openLoginModal()} className="link">Log in</a>
              </div>
            </form>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-[#dee1e7]">✕</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="closeForgotPasswordModal">close</button>
        </form>
      </dialog>
      {showToast == true && (
        <Toast text="Reset password email sent!" />                
      )}
    </>
  )
} 
  