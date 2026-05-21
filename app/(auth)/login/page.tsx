"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Submitted:", { email, password, rememberMe });
    alert("Login mock submission successful!");
  };

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center overflow-y-auto bg-zinc-950 px-6 py-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/auth.png')",
        }}
      />
      
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {/* Brand Title */}
        <Link href="/started" className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[0.15em] text-[#F2CA50] uppercase font-serif drop-shadow-[0_2px_10px_rgba(242,202,80,0.2)]">
            Ophir Reserve
          </h2>
        </Link>

        {/* Card Form - max-w-lg width, deep dark background, gold border */}
        <div className="w-full bg-zinc-950/75 backdrop-blur-md border border-[#F2CA50]/30 rounded-sm p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-stone-100 font-serif tracking-wide">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-2 tracking-wide">
              Please enter your details to access the reserve
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3 bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-200 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password Container */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
              <label className="flex items-center text-stone-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 h-4 w-4 rounded-sm border-stone-800 bg-[#F2CA50]/8 text-[#F2CA50] focus:ring-0 focus:ring-offset-0 accent-[#F2CA50]"
                />
                Remember Me
              </label>
              <Link
                href="/forgot-password"
                className="text-[#F2CA50] hover:underline hover:text-[#e0b83b] transition-colors duration-150 font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 font-sans font-semibold tracking-[0.12em] rounded-sm uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] cursor-pointer text-sm sm:text-base"
            >
              Log In
            </button>
          </form>

          {/* Footer links */}
          <div className="flex justify-center mt-8 text-xs text-stone-400 font-sans tracking-wide">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#F2CA50] hover:underline uppercase tracking-wider font-semibold ml-1">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
