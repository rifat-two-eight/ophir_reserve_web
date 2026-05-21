import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopNav from "@/components/admin/AdminTopNav";

export const metadata: Metadata = {
  title: "Admin Dashboard – Ophir Reserve",
  description: "Platform Master Control for Ophir Reserve",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <AdminTopNav />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
