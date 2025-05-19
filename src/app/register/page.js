"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("type") || "investor";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
    terms: false
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      setError("You must agree to the Terms of Service");
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
    } catch (err) {
      setError(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center h-screen justify-center overflow-hidden  bg-gradient-to-br from-indigo-100 via-slate-100 to-pink-100">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center bg-white ">
        <Image
          src="/register.jpg"
          alt="Register background"
          width={800}
          height={800}
          className="object-cover w-[80%] h-[80%]"
          priority
        />
      </div>

      {/* Right side - Register form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Start your crypto journey with BlockPitch
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex items-center justify-center gap-3 ">
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div></div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200"
              >
                <option value="investor">Investor</option>
                <option value="startup">Startup</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the Terms of Service
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-slate-600 hover:text-slate-500 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4 text-gray-400" />
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
