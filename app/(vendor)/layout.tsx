import type { Metadata } from "next";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import VendorTopNav from "@/components/vendor/VendorTopNav";

export const metadata: Metadata = {
  title: "Vendor Dashboard – Ophir Reserve",
  description: "Vendor Master Control for Ophir Reserve",
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main Column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <VendorTopNav />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
