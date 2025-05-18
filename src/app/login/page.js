"use client";

import { useState } from "react";
import Link from "next/link";
import { QrCode, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(
        err.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-100 to-pink-100">
      {/* Left side - Image */}
      {/* <div className="hidden lg:block lg:w-1/2 h-screen relative">
  <Image
    src="/login.jpg"
    alt="Login background"
    className="h-80vh w-50vh "
    fill
    priority
  />
</div> */}
      {/* <div className=" lg:block lg:w-1/2 h-screen relative ">
  <Image
    src="/login.jpg"
    alt="Login background"
    width={800} // or adjust based on your needs
    height={800}
    className="object-cover w-[80%] h-[80%]"
   
    priority
  />
</div> */}
      <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center bg-white">
        <Image
          src="/login.jpg"
          alt="Login background"
          width={800}
          height={800}
          className="object-cover w-[80%] h-[80%]"
          priority
        />
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col  justify-center px-4 sm:px-6 lg:px-12 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Login To BlockPitch
          </h2>
          <p className="text-gray-600 mb-8">
            Welcome back! Log in now to start trading
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email/ID
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
                placeholder="Please fill in the email form."
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
                placeholder="Please enter a password."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-slate-600 hover:text-slate-500 transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 p-5 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg border border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900">
              Earn up to $25 worth of crypto
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Discover How Specific Cryptocurrencies Work — And Get A Bit Of
              Each Crypto To Try Out For Yourself.
            </p>
            <div className="mt-4">
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
              >
                Create Account
                <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
