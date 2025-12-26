import Hero from "@/components/Hero";
import LatestCollections from "@/components/LatestCollections";
import BestSellers from "@/components/BestSellers";
import PolicyStrip from "@/components/PolicyStrip";
import SubscriptionSection from "@/components/SubscriptionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <LatestCollections />
      <BestSellers />
      <PolicyStrip />
      <SubscriptionSection />
      <Footer />
    </div>
  );
}
