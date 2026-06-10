"use client";

import { useState, useEffect } from "react";

interface Invitation {
  id: string;
  name: string;
  email: string;
  category: "Catering" | "Events" | "Artisan" | "Concierge" | "Heritage";
  status: "Pending" | "Accepted" | "Expired";
  sentAt: string;
  expiresAt: string;
  joinedAt?: string;
  membershipStatus?: "Active" | "Pending" | "Suspended" | "None";
}

const initialInvitations: Invitation[] = [
  {
    id: "INV-9824A",
    name: "Silk Road Catering",
    email: "concierge@silkroad.com",
    category: "Catering",
    status: "Accepted",
    sentAt: "2026-06-01T10:00:00Z",
    expiresAt: "2026-06-08T10:00:00Z",
    joinedAt: "2026-06-02T14:30:00Z",
    membershipStatus: "Active",
  },
  {
    id: "INV-4710B",
    name: "Aurelia Studio",
    email: "studio@aurelia.co.uk",
    category: "Events",
    status: "Accepted",
    sentAt: "2026-06-02T11:15:00Z",
    expiresAt: "2026-06-09T11:15:00Z",
    joinedAt: "2026-06-03T09:12:00Z",
    membershipStatus: "Active",
  },
  {
    id: "INV-3912C",
    name: "Vanguard Concierge",
    email: "ops@vanguard.ch",
    category: "Concierge",
    status: "Accepted",
    sentAt: "2026-06-05T14:00:00Z",
    expiresAt: "2026-06-12T14:00:00Z",
    joinedAt: "2026-06-06T17:45:00Z",
    membershipStatus: "Pending",
  },
  {
    id: "INV-8812D",
    name: "Majestic Florals",
    email: "info@majesticflorals.com",
    category: "Events",
    status: "Pending",
    sentAt: "2026-06-09T08:30:00Z",
    expiresAt: "2026-06-16T08:30:00Z",
    membershipStatus: "None",
  },
  {
    id: "INV-1029E",
    name: "Antique Legacy",
    email: "contact@antiquelegacy.fr",
    category: "Artisan",
    status: "Expired",
    sentAt: "2026-05-20T09:00:00Z",
    expiresAt: "2026-05-27T09:00:00Z",
    membershipStatus: "None",
  },
];

const categoryColors = {
  Catering: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  Events: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Artisan: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  Concierge: "bg-teal-500/15 text-teal-300 border-teal-500/20",
  Heritage: "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

const statusColors = {
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Accepted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Expired: "bg-red-500/15 text-red-300 border-red-500/20",
};

const membershipColors = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Suspended: "bg-red-500/15 text-red-300 border-red-500/20",
  None: "bg-stone-800 text-stone-500 border-stone-700",
};

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Invitation["category"]>("Catering");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ophir_vendor_invitations");
    if (stored) {
      try {
        const parsed: Invitation[] = JSON.parse(stored);
        // Automatically check for expired invitations
        const now = new Date();
        const updated = parsed.map((inv) => {
          if (inv.status === "Pending" && new Date(inv.expiresAt) < now) {
            return { ...inv, status: "Expired" as const };
          }
          // Also sync membership status if vendor registered
          if (inv.status === "Accepted") {
            const savedVendorProfile = localStorage.getItem("vendor_profile");
            if (savedVendorProfile) {
              try {
                const profileObj = JSON.parse(savedVendorProfile);
                if (profileObj.email.toLowerCase() === inv.email.toLowerCase()) {
                  // Keep mock membership status sync or default to Active
                  return { ...inv, membershipStatus: "Active" as const };
                }
              } catch (e) {
                console.error(e);
              }
            }
          }
          return inv;
        });
        setInvitations(updated);
        localStorage.setItem("ophir_vendor_invitations", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to parse invitations", e);
        setInvitations(initialInvitations);
      }
    } else {
      setInvitations(initialInvitations);
      localStorage.setItem("ophir_vendor_invitations", JSON.stringify(initialInvitations));
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      triggerToast("Please fill in all invite fields.");
      return;
    }

    const emailExists = invitations.some(
      (inv) => inv.email.toLowerCase() === email.toLowerCase() && inv.status === "Pending"
    );
    if (emailExists) {
      triggerToast(`A pending invitation for ${email} already exists.`);
      return;
    }

    const uniqueId = `INV-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const sentAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(sentAt.getDate() + 7); // 7 days expiry

    const newInvite: Invitation = {
      id: uniqueId,
      name,
      email,
      category,
      status: "Pending",
      sentAt: sentAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      membershipStatus: "None",
    };

    const updated = [newInvite, ...invitations];
    setInvitations(updated);
    localStorage.setItem("ophir_vendor_invitations", JSON.stringify(updated));

    setName("");
    setEmail("");
    setCategory("Catering");
    triggerToast(`Invitation successfully dispatched to ${name}.`);
  };

  const copyInviteLink = (invite: Invitation) => {
    const inviteLink = `${window.location.origin}/signup/register?role=vendor&inviteCode=${invite.id}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopiedId(invite.id);
      triggerToast("Invitation registration link copied to clipboard.");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const expireInvitation = (id: string) => {
    const updated = invitations.map((inv) =>
      inv.id === id ? { ...inv, status: "Expired" as const } : inv
    );
    setInvitations(updated);
    localStorage.setItem("ophir_vendor_invitations", JSON.stringify(updated));
    triggerToast("Invitation has been manually expired/revoked.");
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Stats computation
  const totalSent = invitations.length;
  const pendingCount = invitations.filter((i) => i.status === "Pending").length;
  const acceptedCount = invitations.filter((i) => i.status === "Accepted").length;
  const expiredCount = invitations.filter((i) => i.status === "Expired").length;

  return (
    <div className="space-y-7 w-full">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border rounded-sm shadow-2xl bg-[#161616] border-emerald-500/30 text-emerald-300 font-sans transition-all duration-300">
          <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs uppercase tracking-wider font-semibold">{toast}</p>
        </div>
      )}



      {/* Invitation Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Dispatched", value: totalSent, color: "text-[#F2CA50]" },
          { label: "Onboarding (Pending)", value: pendingCount, color: "text-amber-400" },
          { label: "Joined Members", value: acceptedCount, color: "text-emerald-400" },
          { label: "Expired / Revoked", value: expiredCount, color: "text-red-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#161616] border border-white/6 rounded-sm p-5 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold font-sans">
              {stat.label}
            </span>
            <span className={`text-2xl font-semibold font-serif ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dispatches Invitation Panel */}
        <div className="lg:col-span-1 bg-[#161616] border border-white/6 p-6 rounded-sm h-fit">
          <h3 className="text-base font-semibold text-stone-200 font-serif tracking-wide mb-5">
            Dispatch Invitation
          </h3>
          <form onSubmit={handleInviteSubmit} className="space-y-4 font-sans text-xs">
            <div className="space-y-1.5">
              <label className="uppercase tracking-wider text-stone-500 font-semibold">Vendor Entity Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kyoto Tea House"
                className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 px-4 py-2.5 w-full text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-wider text-stone-500 font-semibold">Vendor Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. operations@kyoto-tea.jp"
                className="bg-[#1a1a1a] border border-white/8 focus:border-[#F2CA50]/40 text-stone-200 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 px-4 py-2.5 w-full text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#F2CA50] text-[#111111] hover:bg-[#e0b83b] py-3 rounded-sm font-semibold uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer text-center text-xs"
            >
              Dispatch Invite Link
            </button>
          </form>
        </div>

        {/* Invited Registry List */}
        <div className="lg:col-span-2 bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5">
            <h3 className="text-base font-semibold text-stone-200 font-serif tracking-wide">
              Invitation Registry
            </h3>
          </div>
          <div className="overflow-x-auto">
            {invitations.length === 0 ? (
              <div className="p-8 text-center text-stone-600 font-sans text-xs">
                No invitations currently registered in database.
              </div>
            ) : (
              <table className="w-full text-xs font-sans text-left">
                <thead>
                  <tr className="border-b border-white/8 text-stone-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Vendor Entity</th>
                    <th className="px-5 py-4 font-semibold">Membership Status</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4 text-stone-300">
                  {invitations.map((invite) => (
                    <tr key={invite.id} className="hover:bg-white/2 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-stone-200">{invite.name}</p>
                        <p className="text-stone-500 text-[10px] mt-0.5">{invite.email}</p>
                        <p className="text-stone-600 text-[10px] mt-1 font-mono">{invite.id}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-sm border text-[9px] uppercase tracking-wider font-semibold ${membershipColors[invite.membershipStatus || "None"]
                            }`}
                        >
                          {invite.membershipStatus === "None" ? "Not Joined" : invite.membershipStatus}
                        </span>
                        {invite.joinedAt && (
                          <p className="text-stone-600 text-[9px] mt-1">
                            Joined: {formatDate(invite.joinedAt)}
                          </p>
                        )}
                        {!invite.joinedAt && (
                          <p className="text-stone-600 text-[9px] mt-1">
                            Sent: {formatDate(invite.sentAt)} (Status: {invite.status})
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => copyInviteLink(invite)}
                            className="px-2.5 py-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/20 text-stone-300 hover:text-stone-100 transition-colors cursor-pointer text-[10px] uppercase font-semibold"
                          >
                            {copiedId === invite.id ? "Copied" : "Copy Link"}
                          </button>
                          {invite.status === "Pending" && (
                            <button
                              onClick={() => expireInvitation(invite.id)}
                              className="px-2.5 py-1.5 rounded-sm bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer text-[10px] uppercase font-semibold"
                              title="Revoke / Expire invitation"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
