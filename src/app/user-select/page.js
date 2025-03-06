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
              href="/register?type=investor"
              className="w-full flex items-center justify-between px-4 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center">
                <TrendingUp className="mr-4 h-6 w-6" />
                I'm an Investor
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/register?type=startup"
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

