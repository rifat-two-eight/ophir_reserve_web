"use client";

import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
    id: number;
    title: string;
    category: string;
    subcategories: string[];
    booked: boolean;
    image?: string;
}

// ─── Initial Services Data ────────────────────────────────────────────────────
const initialServices: Service[] = [
    {
        id: 1,
        title: "Heritage Garden Gala",
        category: "Bengali",
        subcategories: ["Floral Arrangement", "Outdoor Setup", "Lighting Design"],
        booked: true,
        image: "/service.png"
    },
    {
        id: 2,
        title: "Royal Mehendi Evening",
        category: "South Asian",
        subcategories: ["Mehendi Art", "Live Music", "Catering"],
        booked: true,
        image: "/service.png"
    },
    {
        id: 3,
        title: "Coastal Farewell Ceremony",
        category: "Western",
        subcategories: ["Beach Setup", "Photography", "Décor"],
        booked: false,
        image: "/service.png"
    },
    {
        id: 4,
        title: "Black Tie Dinner Soirée",
        category: "European",
        subcategories: ["Fine Dining", "Wine Pairing", "Live Jazz"],
        booked: false,
        image: "/service.png"
    },
    {
        id: 5,
        title: "Intimate Nikah Celebration",
        category: "Islamic",
        subcategories: ["Venue Dressing", "Calligraphy", "Floral Arches"],
        booked: true,
        image: "/service.png"
    },
    {
        id: 6,
        title: "Rooftop Cocktail Evening",
        category: "Modern Fusion",
        subcategories: ["Bar Service", "DJ Setup", "Ambient Lighting"],
        booked: false,
        image: "/service.png"
    },
];

const cultureCategories = [
    "Bengali",
    "South Asian",
    "Islamic",
    "Western",
    "European",
    "Modern Fusion",
    "East Asian",
    "African",
    "Latin",
    "Persian",
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
    label,
    value,
    sub,
    gold,
    icon,
}: {
    label: string;
    value: string;
    sub: string;
    gold?: boolean;
    icon: React.ReactNode;
}) {
    return (
        <div
            className={`relative flex flex-col gap-4 rounded-sm p-6 bg-[#161616] overflow-hidden transition-all duration-300 hover:bg-[#1a1a1a] ${gold
                ? "border border-[#F2CA50]/30"
                : "border border-white/5 hover:border-white/10"
                }`}
        >
            {gold && <div className="absolute inset-0 bg-[#F2CA50]/3 pointer-events-none" />}
            <div className="flex items-start justify-between">
                <div
                    className={`h-10 w-10 flex items-center justify-center rounded-sm ${gold
                        ? "bg-[#F2CA50]/15 border border-[#F2CA50]/25 text-[#F2CA50]"
                        : "bg-white/5 border border-white/8 text-stone-400"
                        }`}
                >
                    {icon}
                </div>
                <span
                    className={`text-[10px] uppercase tracking-widest font-sans px-2 py-1 rounded-sm ${gold
                        ? "bg-[#F2CA50]/10 text-[#F2CA50]/70 border border-[#F2CA50]/15"
                        : "bg-white/4 text-stone-600 border border-white/5"
                        }`}
                >
                    Total
                </span>
            </div>
            <div>
                <p
                    className={`text-3xl font-semibold font-serif leading-none ${gold ? "text-[#F2CA50]" : "text-stone-100"
                        }`}
                >
                    {value}
                </p>
                <p className="text-xs text-stone-500 font-sans mt-1.5 uppercase tracking-widest">
                    {label}
                </p>
            </div>
            <p className="text-xs text-stone-600 font-sans">{sub}</p>
        </div>
    );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
    service,
    onView,
    onEdit,
    onDelete,
}: {
    service: Service;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex flex-col bg-[#161616] border border-white/5 rounded-sm overflow-hidden hover:border-white/10 transition-all duration-300 hover:bg-[#1a1a1a] group">
            {/* Image / Placeholder */}
            <div className="relative h-36 bg-[#111] flex items-center justify-center overflow-hidden border-b border-white/5">
                {service.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 opacity-20">
                        <svg className="h-8 w-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-[9px] uppercase tracking-widest text-stone-500 font-sans">No Image</span>
                    </div>
                )}

                {/* Booked badge */}
                <div className="absolute top-3 left-3">
                    <span
                        className={`text-[8px] uppercase tracking-[0.15em] font-sans font-semibold px-2 py-1 rounded-sm border ${service.booked
                            ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                            : "bg-stone-500/10 border-stone-500/20 text-stone-500"
                            }`}
                    >
                        {service.booked ? "Booked" : "Available"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-5 flex-1">
                <div>
                    <h4 className="text-sm font-semibold text-stone-100 font-serif tracking-wide leading-snug">
                        {service.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] uppercase tracking-[0.15em] font-sans px-2 py-0.5 bg-[#F2CA50]/10 border border-[#F2CA50]/20 text-[#F2CA50]/80 rounded-sm">
                            {service.category}
                        </span>
                    </div>
                </div>

                {/* Subcategories */}
                <div className="flex flex-wrap gap-1.5">
                    {service.subcategories.map((sub, i) => (
                        <span
                            key={i}
                            className="text-[9px] uppercase tracking-wide font-sans px-2 py-0.5 bg-white/4 border border-white/8 text-stone-500 rounded-sm"
                        >
                            {sub}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center border-t border-white/5">
                <button
                    onClick={onView}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[9px] uppercase tracking-[0.12em] font-sans font-semibold text-stone-500 hover:text-[#F2CA50] hover:bg-[#F2CA50]/5 border-r border-white/5 transition-all duration-200 cursor-pointer"
                >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    View
                </button>
                <button
                    onClick={onEdit}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[9px] uppercase tracking-[0.12em] font-sans font-semibold text-stone-500 hover:text-stone-200 hover:bg-white/4 border-r border-white/5 transition-all duration-200 cursor-pointer"
                >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[9px] uppercase tracking-[0.12em] font-sans font-semibold text-stone-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 cursor-pointer"
                >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
}

// ─── Add/Edit Modal ───────────────────────────────────────────────────────────
function ServiceModal({
    open,
    onClose,
    onSubmit,
    initial,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Service, "id" | "booked">) => void;
    initial?: Service | null;
}) {
    const [title, setTitle] = useState(initial?.title ?? "");
    const [category, setCategory] = useState(initial?.category ?? "");
    const [subs, setSubs] = useState<string[]>(
        initial?.subcategories ?? ["", "", ""]
    );
    const [imagePreview, setImagePreview] = useState<string>(initial?.image ?? "");
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const updateSub = (i: number, val: string) => {
        const next = [...subs];
        next[i] = val;
        setSubs(next);
    };

    const addSubField = () => setSubs([...subs, ""]);
    const removeSub = (i: number) => setSubs(subs.filter((_, idx) => idx !== i));

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleSubmit = () => {
        if (!title.trim() || !category.trim()) return;
        onSubmit({
            title: title.trim(),
            category: category.trim(),
            subcategories: subs.filter((s) => s.trim() !== ""),
            image: imagePreview,
        });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg bg-[#161616] border border-white/10 rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-6 border-b border-white/5">
                    <div>
                        <h2 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
                            {initial ? "Edit Service" : "Add New Service"}
                        </h2>
                        <p className="text-xs text-stone-500 font-sans mt-0.5">
                            Fill in the details for your service listing
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-500 hover:text-stone-300 hover:border-white/15 transition-all duration-200 cursor-pointer flex-shrink-0"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-7 py-6 space-y-5">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                            Service Title <span className="text-[#F2CA50]">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Heritage Garden Gala"
                            className="w-full px-4 py-3 text-sm bg-white/4 border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans"
                        />
                    </div>

                    {/* Culture Category */}
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                            Culture Category <span className="text-[#F2CA50]">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 text-sm bg-white/4 border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 rounded-sm outline-none transition-all duration-200 font-sans appearance-none cursor-pointer"
                            >
                                <option value="" disabled className="bg-[#1a1a1a] text-stone-500">
                                    Select a culture category
                                </option>
                                {cultureCategories.map((c) => (
                                    <option key={c} value={c} className="bg-[#1a1a1a] text-stone-200">
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Subcategories */}
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                            Subcategories
                        </label>
                        <div className="space-y-2">
                            {subs.map((sub, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 flex-1 px-4 py-3 bg-white/4 border border-white/8 focus-within:border-[#F2CA50]/40 rounded-sm transition-all duration-200">
                                        <span className="text-[10px] text-stone-600 font-sans w-4 flex-shrink-0">{i + 1}</span>
                                        <input
                                            type="text"
                                            value={sub}
                                            onChange={(e) => updateSub(i, e.target.value)}
                                            placeholder={`Subcategory ${i + 1}`}
                                            className="flex-1 text-sm bg-transparent text-stone-200 placeholder-stone-700 outline-none font-sans"
                                        />
                                    </div>
                                    {subs.length > 1 && (
                                        <button
                                            onClick={() => removeSub(i)}
                                            className="h-8 w-8 flex items-center justify-center border border-white/8 text-stone-600 hover:text-red-400 hover:border-red-500/25 rounded-sm transition-all duration-200 cursor-pointer flex-shrink-0"
                                        >
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addSubField}
                            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] font-sans font-semibold text-stone-600 hover:text-[#F2CA50] transition-colors duration-200 cursor-pointer mt-1"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Subcategory
                        </button>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                            Service Image
                        </label>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current?.click()}
                            className={`relative flex flex-col items-center justify-center gap-3 h-36 border-2 border-dashed rounded-sm cursor-pointer transition-all duration-200 ${dragOver
                                ? "border-[#F2CA50]/50 bg-[#F2CA50]/5"
                                : imagePreview
                                    ? "border-white/10 bg-white/2"
                                    : "border-white/8 hover:border-[#F2CA50]/30 hover:bg-[#F2CA50]/3"
                                }`}
                        >
                            {imagePreview ? (
                                <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-sm" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-sm">
                                        <span className="text-[9px] uppercase tracking-widest text-white font-sans">Change Image</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="h-10 w-10 flex items-center justify-center rounded-sm bg-white/5 border border-white/8 text-stone-500">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-stone-400 font-sans">Drop image here or click to browse</p>
                                        <p className="text-[10px] text-stone-600 font-sans mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                                    </div>
                                </>
                            )}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFile(file);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-white/5">
                    <button
                        onClick={onClose}
                        className="text-[9px] uppercase tracking-[0.15em] font-sans font-semibold px-5 py-2.5 border border-white/10 text-stone-500 hover:text-stone-300 hover:border-white/20 rounded-sm transition-all duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="text-[9px] uppercase tracking-[0.15em] font-sans font-semibold px-6 py-2.5 bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50] hover:bg-[#F2CA50]/25 hover:border-[#F2CA50]/50 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {initial ? "Save Changes" : "Upload Service"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({
    open,
    serviceName,
    onClose,
    onConfirm,
}: {
    open: boolean;
    serviceName: string;
    onClose: () => void;
    onConfirm: () => void;
}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-sm bg-[#161616] border border-white/10 rounded-sm shadow-2xl p-7">
                <div className="flex items-center justify-center h-12 w-12 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 mx-auto mb-5">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>
                <h3 className="text-base font-semibold text-stone-100 font-serif text-center tracking-wide">
                    Delete Service
                </h3>
                <p className="text-xs text-stone-500 font-sans text-center mt-2 leading-relaxed">
                    Are you sure you want to delete <span className="text-stone-300">"{serviceName}"</span>? This action cannot be undone.
                </p>
                <div className="flex items-center gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 text-[9px] uppercase tracking-[0.15em] font-sans font-semibold py-2.5 border border-white/10 text-stone-500 hover:text-stone-300 hover:border-white/20 rounded-sm transition-all duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 text-[9px] uppercase tracking-[0.15em] font-sans font-semibold py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 hover:border-red-500/50 rounded-sm transition-all duration-200 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VendorServicesPage() {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editService, setEditService] = useState<Service | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

    const totalServices = services.length;
    const totalBooked = services.filter((s) => s.booked).length;
    const totalUnbooked = services.filter((s) => !s.booked).length;

    const handleAdd = (data: Omit<Service, "id" | "booked">) => {
        setServices((prev) => [
            ...prev,
            { ...data, id: Date.now(), booked: false },
        ]);
    };

    const handleEdit = (data: Omit<Service, "id" | "booked">) => {
        if (!editService) return;
        setServices((prev) =>
            prev.map((s) => (s.id === editService.id ? { ...s, ...data } : s))
        );
        setEditService(null);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    return (
        <div className="space-y-6 w-full">

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    label="Total Services"
                    value={String(totalServices)}
                    sub="All active listings"
                    gold
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                    }
                />
                <StatCard
                    label="Total Booked"
                    value={String(totalBooked)}
                    sub="Currently reserved"
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
                <StatCard
                    label="Total Unbooked"
                    value={String(totalUnbooked)}
                    sub="Available for booking"
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* ── Services Grid ── */}
            <div className="space-y-5">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
                            Service Listings
                        </h3>
                        <p className="text-xs text-stone-500 font-sans mt-0.5">
                            {totalServices} services in your portfolio
                        </p>
                    </div>
                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] font-sans font-semibold px-4 py-2.5 bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50] hover:bg-[#F2CA50]/25 hover:border-[#F2CA50]/50 rounded-sm transition-all duration-200 cursor-pointer"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Service
                    </button>
                </div>

                {/* Cards Grid */}
                {services.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#161616] border border-white/5 rounded-sm">
                        <div className="h-14 w-14 flex items-center justify-center rounded-sm bg-white/4 border border-white/8 text-stone-600 mb-4">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                        </div>
                        <p className="text-sm text-stone-500 font-sans">No services yet</p>
                        <p className="text-xs text-stone-700 font-sans mt-1">Click "Add New Service" to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onView={() => { }}
                                onEdit={() => setEditService(service)}
                                onDelete={() => setDeleteTarget(service)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ── Modals ── */}
            <ServiceModal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSubmit={handleAdd}
            />
            <ServiceModal
                open={!!editService}
                initial={editService}
                onClose={() => setEditService(null)}
                onSubmit={handleEdit}
            />
            <DeleteModal
                open={!!deleteTarget}
                serviceName={deleteTarget?.title ?? ""}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}