"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RoleOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles: RoleOption[] = [
    {
      id: "client",
      title: "User / Client",
      description: "Book, explore, and access premium curated experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      id: "collaborator",
      title: "Team Collaborator",
      description: "Coordinate, manage tasks, and align with internal teams.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
    },
    {
      id: "vendor",
      title: "Vendor / Service Provider",
      description: "Offer products, manage bookings, and showcase services.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.615m-7.5 0h7.5m3.75 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.615m-7.5 0h7.5m0 0v-5.25A2.25 2.25 0 0 0 12.75 3h-1.5A2.25 2.25 0 0 0 9 5.25v5.25" />
        </svg>
      ),
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/signup/register?role=${selectedRole}`);
    }
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
        
        {/* Header */}
        <Link href="/started" className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[0.15em] text-[#F2CA50] uppercase font-serif drop-shadow-[0_2px_10px_rgba(242,202,80,0.2)]">
            Ophir Reserve
          </h2>
        </Link>

        {/* Card Panel */}
        <div className="w-full bg-zinc-950/75 backdrop-blur-md border border-[#F2CA50]/30 rounded-sm p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-stone-100 font-serif tracking-wide">
              Select Your Role
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-2 tracking-wide">
              Choose how you want to experience the reserve
            </p>
          </div>

          {/* Role Cards List */}
          <div className="space-y-4 mb-8">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full flex items-start gap-4 p-4 text-left rounded-sm border transition-all duration-300 group cursor-pointer ${
                    isSelected
                      ? "border-[#F2CA50] bg-[#F2CA50]/10 shadow-[0_0_15px_rgba(242,202,80,0.1)]"
                      : "border-stone-800 bg-transparent hover:border-stone-700 hover:bg-white/5"
                  }`}
                >
                  <div className={`p-2.5 rounded-sm border transition-colors duration-300 ${
                    isSelected 
                      ? "bg-[#F2CA50] border-[#F2CA50] text-stone-950" 
                      : "bg-transparent border-stone-800 text-stone-400 group-hover:text-stone-300"
                  }`}>
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm sm:text-base font-semibold tracking-wide transition-colors duration-200 ${
                      isSelected ? "text-[#F2CA50]" : "text-stone-200 group-hover:text-stone-100"
                    }`}>
                      {role.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-sans mt-1 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-3.5 rounded-sm font-sans font-semibold tracking-[0.12em] uppercase transition-all duration-300 text-center text-sm sm:text-base select-none ${
              selectedRole
                ? "bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] cursor-pointer"
                : "bg-stone-900/50 border border-stone-800 text-stone-600 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>

        {/* Footer links */}
        <p className="mt-6 text-xs text-stone-400 tracking-wide font-sans text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#F2CA50] hover:underline tracking-wider font-semibold uppercase ml-1">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
