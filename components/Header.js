import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { Rubik } from "next/font/google"
import { IoLogOut } from "react-icons/io5"

const rubik = Rubik({ subsets: ["latin"] })

export default function Header({ user }) {
  const router = useRouter()
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

    for (const item in form) {
      if (form[item] == "") {
        setErrors(prevState => {return { ...prevState, [item]: `${item} is required` }})
      } else setErrors(prevState => {const updatedErrors = { ...prevState }; delete updatedErrors[item]; return updatedErrors})
    }    

    if (Object.values(form).every(value => value !== "")) {
      if (form == signupData) {
        await signup()
        await createUserRow()
      }
      if (form == loginData) login()
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
        body: JSON.stringify({ email: signupData.email, password: signupData.password})
      })
      const data = await response.json()
      if (data) {
        Cookies.set("portiko-id", data.data.user.id, {expires: 30})
        createUserRow(data.data.user.id)
      }
      else setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }  
  }

  const createUserRow = async (userId) => {
    try {
      const response = await fetch("/api/db/createUserRow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, email: signupData.email, name: signupData.name, position: signupData.position, department: signupData.department, institution: signupData.institution })
      })
      const data = await response.json()
      if (data) {
        closeAuthModal()
        setLoading(false)
        router.refresh()
      }
    } catch (error) {
        console.error("Error fetching data:", error)
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
        closeAuthModal()
        setLoading(false)
        router.refresh()
      }
      else setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }  
  }

  const logout = async () => {
    Cookies.remove("portiko-id")
    router.refresh()
  }

  const openLoginModal = async () => {
    setAuthOption("Login")
    document.getElementById("authModal").showModal()
  }

  const openSignupModal = async () => {
    setAuthOption("Signup")
    document.getElementById("authModal").showModal()
  }

  const closeAuthModal = async () => {
    document.getElementById("authModal").close()
  }
  return (
    <main className="flex items-center justify-between w-full">
      <p className={`${rubik.className} text-[#30313D] text-xl md:text-2xl font-bold`}>Portiko</p>
      {user == undefined && (
        <div className="flex-box gap-6">
          <button onClick={() => openLoginModal()} className="button-secondary">Login</button>
          <button onClick={() => openSignupModal()} className="button-tertiary hover:bg-[#4040e6] hover:text-white transition">Sign Up</button>
        </div>
      )}
      {user != undefined && (
        <div className="flex-box gap-6 justify-start">
          <button className="button-primary">+ New collab</button>
          <div className="flex-box gap-3">
            <p className="font-semibold text-base">{user?.name}</p>
            <div className="profile" style={{ backgroundImage: `url(${user?.profile_picture})` }}>{!user?.profile_picture ? user?.name?.[0] : "" }</div>
            <IoLogOut className="cursor-pointer" onClick={() => logout()} size={30} />
          </div>
        </div>
      )}
      <dialog id="authModal" className="modal">
        <div className="modal-box space-y-12">
          <div>
            <p className="font-extrabold text-2xl text-center">{authOption == "Login" ? "Log in" : "Sign up"}</p>
            {authOption == "Signup" && (
              <div className="modal-action">
                <form method="dialog" className="flex-box flex-col items-end w-full space-y-12" >
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
                  <div className="flex-box flex-col items-center space-y-6 w-full">
                    <div className="flex-box justify-between gap-6 w-full">
                      <button onClick={() => closeAuthModal()} className="button-secondary w-1/3">Close</button>
                      <button type="submit" onClick={(e) => checkForm(e, signupData)} className="button-primary w-2/3">{loading ? "Loading..." : "Sign up"}</button>
                    </div>
                    <p>Already have an account? <a onClick={() => openLoginModal()} className="link">Log in</a></p>
                  </div>
                </form>
              </div>
            )}
            {authOption == "Login" && (
              <div className="modal-action">
                <form onSubmit={(e) => login(e)} method="dialog" className="flex-box flex-col items-end w-full space-y-12" >
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
                  <div className="flex-box flex-col items-center space-y-6 w-full">
                    <div className="flex-box justify-between gap-6 w-full">
                      <button onClick={() => closeAuthModal()} className="button-secondary w-1/3">Close</button>
                      <button type="submit" onClick={(e) => checkForm(e, loginData)} className="button-primary w-2/3">Log in</button>
                    </div>
                    <p>Don"t have an account yet? <a onClick={() => openSignupModal()} className="link">Sign up</a></p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </main>
  )
}
  