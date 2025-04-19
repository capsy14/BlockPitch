// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ArrowLeft, CheckCircle } from "lucide-react"
// import { motion } from "framer-motion"
// import { useAuth } from "@/context/AuthContext"
// import { useSearchParams } from "next/navigation"

// export default function RegisterPage() {
//   const searchParams = useSearchParams()
//   const defaultRole = searchParams.get("type") || "investor"

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: defaultRole,
//     terms: false,
//   })
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { signup } = useAuth()

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     // Validate form
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     if (!formData.terms) {
//       setError("You must agree to the Terms of Service")
//       return
//     }

//     setIsLoading(true)

//     try {
//       await signup({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       })
//     } catch (err) {
//       setError(err.message || "Failed to create account")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="sm:mx-auto sm:w-full sm:max-w-md"
//       >
//         <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Create Your BlockPitch Account</h2>
//         <p className="mt-2 text-center text-sm text-gray-600">Start your crypto journey with BlockPitch</p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
//       >
//         <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
//           {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your email address"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Create a strong password"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Confirm your password"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 I am a
//               </label>
//               <div className="mt-1">
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="investor">Investor</option>
//                   <option value="startup">Startup</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 checked={formData.terms}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 required
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
//                 I agree to the{" "}
//                 <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
//                   Privacy Policy
//                 </a>
//               </label>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
//               >
//                 {isLoading ? "Creating Account..." : "Create Account"}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Already have an account?</span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 href="/login"
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
//               >
//                 <ArrowLeft className="mr-2 h-5 w-5 text-gray-400" />
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
//       >
//         <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">Why Choose BlockPitch?</h3>
//           <ul className="mt-4 space-y-2">
//             {[
//               "Secure and reliable cryptocurrency trading platform",
//               "Wide range of supported cryptocurrencies",
//               "Low trading fees and high liquidity",
//               "Advanced trading tools and features",
//               "24/7 customer support",
//             ].map((feature, index) => (
//               <motion.li
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
//                 className="flex items-center text-sm text-gray-600"
//               >
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                 {feature}
//               </motion.li>
//             ))}
//           </ul>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ArrowLeft, CheckCircle } from "lucide-react"
// import { motion } from "framer-motion"
// import { useAuth } from "@/context/AuthContext"
// import { useSearchParams } from "next/navigation"

// export default function RegisterPage() {
//   const searchParams = useSearchParams()
//   const defaultRole = searchParams.get("type") || "investor"

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: defaultRole,
//     terms: false,

//     // INVESTOR FIELDS
//     profileImage: "",
//     walletAddress: "",
//     bio: "",

//     // STARTUP FIELDS
//     foundersName: "",
//     description: "",
//     location: "",
//     category: "",
//     websiteLink: "",
//   })

//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { signup } = useAuth()

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     if (!formData.terms) {
//       setError("You must agree to the Terms of Service")
//       return
//     }

//     setIsLoading(true)

//     try {
//       const {
//         name, email, password, role, profileImage, walletAddress, bio,
//         foundersName, description, location, category, websiteLink
//       } = formData

//       const payload = {
//         name,
//         email,
//         password,
//         role,
//         profileImage,
//         walletAddress,
//         bio,
//         foundersName,
//         description,
//         location,
//         category,
//         websiteLink,
//       }

//       await signup(payload)
//     } catch (err) {
//       setError(err.message || "Failed to create account")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const isInvestor = formData.role === "investor"
//   const isStartup = formData.role === "startup"

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="sm:mx-auto sm:w-full sm:max-w-md"
//       >
//         <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Create Your BlockPitch Account</h2>
//         <p className="mt-2 text-center text-sm text-gray-600">Start your crypto journey with BlockPitch</p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
//       >
//         <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
//           {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* COMMON FIELDS */}
//             <FormInput name="name" label={isStartup ? "Startup Name" : "Full Name"} value={formData.name} onChange={handleChange} />
//             <FormInput name="email" type="email" label="Email" value={formData.email} onChange={handleChange} />
//             <FormInput name="password" type="password" label="Password" value={formData.password} onChange={handleChange} />
//             <FormInput name="confirmPassword" type="password" label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />

//             {/* ROLE SPECIFIC */}
//             {isInvestor && (
//               <>
//                 <FormInput name="profileImage" label="Profile Image URL" value={formData.profileImage} onChange={handleChange} />
//                 <FormInput name="walletAddress" label="Wallet Address" value={formData.walletAddress} onChange={handleChange} />
//                 <FormInput name="bio" label="Short Bio" value={formData.bio} onChange={handleChange} />
//               </>
//             )}

//             {isStartup && (
//               <>
//                 <FormInput name="foundersName" label="Founders Name" value={formData.foundersName} onChange={handleChange} />
//                 <FormInput name="walletAddress" label="Wallet Address" value={formData.walletAddress} onChange={handleChange} />
//                 <FormInput name="description" label="Startup Description" value={formData.description} onChange={handleChange} />
//                 <FormInput name="location" label="Location" value={formData.location} onChange={handleChange} />
//                 <FormInput name="category" label="Category" value={formData.category} onChange={handleChange} />
//                 <FormInput name="websiteLink" label="Website Link" value={formData.websiteLink} onChange={handleChange} />
//               </>
//             )}

//             <div className="flex items-center">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 checked={formData.terms}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 required
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
//                 I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLoading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
//               <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Already have an account?</span></div>
//             </div>

//             <div className="mt-6">
//               <Link href="/login" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                 <ArrowLeft className="mr-2 h-5 w-5 text-gray-400" />
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// const FormInput = ({ name, label, type = "text", value, onChange }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="mt-1">
//       <input
//         id={name}
//         name={name}
//         type={type}
//         required
//         value={value}
//         onChange={onChange}
//         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       />
//     </div>
//   </div>
// )


// ✅ src/app/register/page.js
"use client"
import Link from "next/link"
import { Briefcase, TrendingUp, ArrowRight } from "lucide-react"

export default function UserTypePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-black">Welcome to BlockPitch</h2>
        <p className="mt-2 text-center text-xl text-gray-600">Choose your path in the world of crypto</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <Link
              href="/register/form?type=investor"
              className="w-full flex items-center justify-between px-4 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center">
                <TrendingUp className="mr-4 h-6 w-6" />
                I'm an Investor
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/register/form?type=startup"
              className="w-full flex items-center justify-between px-4 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center">
                <Briefcase className="mr-4 h-6 w-6" />
                I'm a Startup
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Why Choose BlockPitch?</h3>
            <ul className="mt-4 list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Secure and reliable cryptocurrency trading platform</li>
              <li>Tailored experiences for both investors and startups</li>
              <li>Access to a wide range of investment opportunities</li>
              <li>Cutting-edge tools for portfolio management</li>
              <li>Dedicated support for startups seeking funding</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-800">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  )
}
