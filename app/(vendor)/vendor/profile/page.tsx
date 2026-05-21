"use client";

import { useState, useEffect, useRef } from "react";

interface ProfileState {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    bio: string;
    avatar: string;
}

export default function VendorProfilePage() {
    // Safe initialization
    const [profile, setProfile] = useState<ProfileState>({
        fullName: "John Doe",
        email: "john.doe@ophir-reserve.com",
        phone: "+1 (555) 019-2831",
        role: "Vendor",
        bio: "Chief Executive Liaison overseeing curated exceptionals. Dedicated to preserving the legacy and operational integrity of Ophir Reserve.",
        avatar: "", // empty by default, uses inline SVG
    });

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedProfile = localStorage.getItem("vendor_profile");
        if (savedProfile) {
            try {
                setProfile(JSON.parse(savedProfile));
            } catch (e) {
                console.error("Failed to parse saved profile data", e);
            }
        }
    }, []);

    const showNotification = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingProfile(true);

        setTimeout(() => {
            localStorage.setItem("vendor_profile", JSON.stringify(profile));
            setIsSavingProfile(false);
            showNotification("Profile database registry updated successfully.");
        }, 800);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword) {
            showNotification("Please provide your current vendor password.", "error");
            return;
        }

        if (newPassword.length < 8) {
            showNotification("New password must be at least 8 characters long.", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification("New passwords do not match. Please verify.", "error");
            return;
        }

        setIsUpdatingPassword(true);

        setTimeout(() => {
            setIsUpdatingPassword(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            showNotification("Security keys and authorization credentials updated successfully.");
        }, 1000);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const updated = { ...profile, avatar: base64String };
                setProfile(updated);
                localStorage.setItem("vendor_profile", JSON.stringify(updated));
                showNotification("Profile avatar successfully loaded.");
            };
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = (e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = { ...profile, avatar: "" };
        setProfile(updated);
        localStorage.setItem("vendor_profile", JSON.stringify(updated));
        showNotification("Profile avatar reset to system default.");
    };

    return (
        <div className="space-y-7 w-full max-w-7xl mx-auto pb-10">
            {/* Toast Alert */}
            {toast && (
                <div
                    className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border rounded-sm shadow-2xl transition-all duration-300 font-sans ${toast.type === "success"
                        ? "bg-[#161616] border-emerald-500/30 text-emerald-300"
                        : "bg-[#161616] border-red-500/30 text-red-300"
                        }`}
                >
                    {toast.type === "success" ? (
                        <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    )}
                    <p className="text-xs uppercase tracking-wider font-semibold">{toast.message}</p>
                </div>
            )}

            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-semibold text-[#F2CA50] font-serif tracking-wide">Vendor Profile</h2>
                <p className="text-xs text-stone-500 font-sans mt-1 tracking-wide">
                    Manage your elite credentials, administrative privileges, and authorization codes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Avatar card */}
                <div className="bg-[#161616] border border-white/6 p-8 rounded-sm flex flex-col items-center text-center justify-between">
                    <div className="w-full flex flex-col items-center">
                        {/* Avatar Circle */}
                        <div
                            onClick={handleAvatarClick}
                            className="h-32 w-32 rounded-full relative group overflow-hidden border border-[#F2CA50]/30 bg-[#F2CA50]/5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#F2CA50]/60"
                        >
                            {profile.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <svg className="h-12 w-12 text-[#F2CA50]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-[#0d0d0d]/85 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg className="h-6 w-6 text-[#F2CA50] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-sans font-semibold">Change Image</span>
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <h3 className="text-lg font-semibold text-stone-200 mt-5 font-serif">{profile.fullName}</h3>
                        <span className="inline-block px-3 py-1 rounded-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-[10px] uppercase tracking-widest mt-2 font-sans font-semibold">
                            {profile.role}
                        </span>

                        {profile.avatar && (
                            <button
                                onClick={removeAvatar}
                                className="mt-4 text-[10px] uppercase tracking-wider text-red-400/70 hover:text-red-400 font-semibold font-sans cursor-pointer transition-colors duration-200"
                            >
                                Reset Image
                            </button>
                        )}
                    </div>

                    <div className="w-full pt-8 border-t border-white/5 mt-8 space-y-3.5 text-left text-xs font-sans text-stone-500">
                        <div className="flex justify-between">
                            <span>Account Status</span>
                            <span className="text-emerald-400 font-semibold uppercase tracking-wider">Active</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Security Level</span>
                            <span className="text-[#F2CA50] font-semibold uppercase tracking-wider">Tier 1 Vendor</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Registered On</span>
                            <span className="text-stone-300 font-semibold">2026-01-14</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Main Form */}
                <div className="lg:col-span-2 bg-[#161616] border border-white/6 p-8 rounded-sm">
                    <h3 className="text-base font-semibold text-stone-200 font-serif tracking-wide mb-6">Personal Profile Details</h3>

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={profile.fullName}
                                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                    placeholder="Enter full name"
                                    className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans px-4 py-2.5 text-xs w-full"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    placeholder="Enter email address"
                                    className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans px-4 py-2.5 text-xs w-full"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    placeholder="Enter phone number"
                                    className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans px-4 py-2.5 text-xs w-full"
                                />
                            </div>

                            {/* Role - Read Only */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                        Administrative Position
                                    </label>
                                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-[#F2CA50]">
                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Locked Field
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    value={profile.role}
                                    className="bg-white/2 border border-white/5 text-stone-500 rounded-sm outline-none font-sans px-4 py-2.5 text-xs w-full cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                Professional Bio / Credentials Statement
                            </label>
                            <textarea
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="Write a brief professional bio..."
                                className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans px-4 py-2.5 text-xs w-full resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSavingProfile}
                                className="bg-[#F2CA50] text-[#111111] hover:bg-[#e0b83b] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-widest font-sans cursor-pointer transition-all duration-200 shadow-md"
                            >
                                {isSavingProfile ? "Commiting Changes..." : "Save Registry Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Change Password Section at the Bottom */}
            <div className="bg-[#161616] border border-white/6 p-8 rounded-sm w-full">
                <div className="mb-6">
                    <h3 className="text-base font-semibold text-stone-200 font-serif tracking-wide">Vendor Credentials Configuration</h3>
                    <p className="text-xs text-stone-500 font-sans mt-0.5 tracking-wide">
                        Update your administrative authorization password.
                    </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPass ? "text" : "password"}
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans pl-4 pr-11 py-2.5 text-xs w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors p-1 cursor-pointer"
                                >
                                    {showCurrentPass ? (
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPass ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans pl-4 pr-11 py-2.5 text-xs w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPass(!showNewPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors p-1 cursor-pointer"
                                >
                                    {showNewPass ? (
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans pl-4 pr-11 py-2.5 text-xs w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors p-1 cursor-pointer"
                                >
                                    {showConfirmPass ? (
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={isUpdatingPassword}
                            className="border border-[#F2CA50]/30 hover:border-[#F2CA50]/60 text-[#F2CA50] hover:bg-[#F2CA50]/8 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-widest font-sans cursor-pointer transition-all duration-200"
                        >
                            {isUpdatingPassword ? "Updating Vendor Password..." : "Update Vendor Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
