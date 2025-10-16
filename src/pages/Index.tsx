import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import beachImage from "@/assets/beach-coast.jpg";
import cityImage from "@/assets/city-urban.jpg";
import mountainImage from "@/assets/mountain-adventure.jpg";
import heroImage from "@/assets/hero-safari.jpg";

const Index = () => {
  const featuredPackages = [
    {
      id: "1",
      title: "Maasai Mara Safari Experience",
      destination: "Maasai Mara, Kenya",
      price: 85000,
      duration: "5 Days",
      groupSize: "4-12 people",
      image: heroImage,
      rating: 4.9,
      difficulty: "Easy"
    },
    {
      id: "2",
      title: "Coastal Paradise Escape",
      destination: "Diani Beach, Kenya",
      price: 55000,
      duration: "3 Days",
      groupSize: "2-8 people",
      image: beachImage,
      rating: 4.8,
      difficulty: "Easy"
    },
    {
      id: "3",
      title: "Urban Discovery Tour",
      destination: "Nairobi, Kenya",
      price: 35000,
      duration: "2 Days",
      groupSize: "4-15 people",
      image: cityImage,
      rating: 4.7,
      difficulty: "Easy"
    },
    {
      id: "4",
      title: "Mountain Trekking Adventure",
      destination: "Mount Kenya",
      price: 95000,
      duration: "7 Days",
      groupSize: "4-10 people",
      image: mountainImage,
      rating: 4.9,
      difficulty: "Challenging"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Featured Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Packages</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked adventures that showcase the best of East Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Travel With Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make your African adventure seamless and unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-muted-foreground">
                Local experts with deep knowledge of African wildlife and culture
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Your safety is our priority with fully licensed operators
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Value</h3>
              <p className="text-muted-foreground">
                Competitive prices with flexible payment options including M-Pesa
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
