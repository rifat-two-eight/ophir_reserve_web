"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get("role") || "client";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "client":
        return "User / Client";
      case "collaborator":
        return "Team Collaborator";
      case "vendor":
        return "Vendor / Service Provider";
      default:
        return "User / Client";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Submitted:", { ...formData, role: roleParam });
    // In a real application, you would submit to API here.
    alert(`Registration successful as a ${getRoleDisplayName(roleParam)}!`);
  };

  return (
    <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
      {/* Brand Title */}
      <Link href="/started" className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[0.15em] text-[#F2CA50] uppercase font-serif drop-shadow-[0_2px_10px_rgba(242,202,80,0.2)]">
          Ophir Reserve
        </h2>
      </Link>

      {/* Card Form - Increased max-w-lg, deeper background, gold border */}
      <div className="w-full bg-zinc-950/75 backdrop-blur-md border border-[#F2CA50]/30 rounded-sm p-6 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-stone-100 font-serif tracking-wide">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-sans mt-2 tracking-wide">
            Registering as{" "}
            <span className="text-[#F2CA50] font-semibold">
              {getRoleDisplayName(roleParam)}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-3 bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-200 focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? (
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

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 font-sans font-semibold tracking-[0.12em] rounded-sm uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] cursor-pointer text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-between w-full mt-6 text-xs text-stone-400 font-sans tracking-wide">
          <Link href="/signup" className="hover:text-stone-200 transition-colors duration-150 uppercase tracking-wider font-semibold">
            &larr; Change Role
          </Link>
          <Link href="/login" className="text-[#F2CA50] hover:underline uppercase tracking-wider font-semibold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
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

      {/* Suspense Boundary for useSearchParams in App Router */}
      <Suspense fallback={<div className="relative z-10 text-stone-400 font-sans">Loading registration...</div>}>
        <RegisterFormContent />
      </Suspense>
    </div>
  );
}
