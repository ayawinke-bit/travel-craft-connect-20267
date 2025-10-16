import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import PackageCard from "@/components/PackageCard";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Shield, Award, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-safari.jpg";

const Home = () => {
  const { data: featuredPackages } = useQuery({
    queryKey: ["featured-packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: popularDestinations } = useQuery({
    queryKey: ["popular-destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Safari Kenya Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover the Magic of Kenya
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Experience unforgettable safaris, pristine beaches, and rich culture with Kenya's leading travel experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              <Link to="/packages">
                Browse Packages <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
              <Link to="/destinations">Explore Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">15+ Years Experience</h3>
              <p className="text-muted-foreground text-sm">Trusted safari operator since 2009</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safety First</h3>
              <p className="text-muted-foreground text-sm">Fully licensed and insured operations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">50+ Destinations</h3>
              <p className="text-muted-foreground text-sm">Covering all of Kenya's highlights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Safari Packages</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked adventures designed to give you the best of Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredPackages?.map((pkg) => (
              <PackageCard
                key={pkg.id}
                id={pkg.id}
                title={pkg.title}
                description={pkg.description || ""}
                imageUrl={pkg.image_url || ""}
                priceKes={Number(pkg.price_kes)}
                durationDays={pkg.duration_days}
                durationNights={pkg.duration_nights}
                difficulty={pkg.difficulty}
                seatsAvailable={pkg.seats_available}
                rating={Number(pkg.rating) || 4.5}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/packages">
                View All Packages <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From savannas to beaches, explore Kenya's diverse landscapes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {popularDestinations?.map((dest) => (
              <DestinationCard
                key={dest.id}
                id={dest.id}
                title={dest.title}
                country={dest.country}
                region={dest.region}
                imageUrl={dest.image_url || ""}
                description={dest.description}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/destinations">
                Explore All Destinations <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Kenya Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Book your dream safari today and create memories that will last a lifetime
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link to="/packages">Start Planning Now</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Safari Kenya</h3>
              <p className="text-sm opacity-80">Your trusted partner for unforgettable Kenyan adventures since 2009.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/packages" className="hover:text-primary transition-colors">Packages</Link></li>
                <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+254 700 123 456</li>
                <li>info@safarike.com</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            © 2025 Safari Kenya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
