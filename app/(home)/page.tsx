import Hero from "@/components/home/Hero";
import Heritage from "@/components/home/heritage";
import Artisans from "@/components/home/artisans";
import Planning from "@/components/home/planning";
import Works from "@/components/home/works";
import Elevate from "@/components/home/elevate";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Heritage />
      <Artisans />
      <Planning />
      <Works />
      <Elevate />
      {/* Other sections like Featured Vendors, Categories, etc. can go here */}
    </>
  );
}
