import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import DestinationCard from "@/components/DestinationCard";
import PackageCardSkeleton from "@/components/ui/PackageCardSkeleton";
import DestinationCardSkeleton from "@/components/ui/DestinationCardSkeleton";
import Testimonials from "@/components/Testimonials";
import SpecialOffers from "@/components/SpecialOffers";
import Newsletter from "@/components/Newsletter";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUs from "@/components/WhyChooseUs";
import TravelRequirements from "@/components/TravelRequirements";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Shield, Award, Headphones } from "lucide-react";

// Map destination titles to image paths
const destinationImages: Record<string, string> = {
  "Maasai Mara National Reserve": "/images/destinations/maasai-mara-real.jpg",
  "Serengeti National Park": "/images/destinations/serengeti-real.jpg",
  "Mount Kenya National Park": "/images/destinations/mount-kenya-real.jpg",
  "Mount Kenya": "/images/destinations/mount-kenya-real.jpg",
  "Nairobi City": "/images/destinations/nairobi-real.jpg",
  "Zanzibar Archipelago": "/images/destinations/zanzibar-beach-real.jpg",
  "Bwindi Impenetrable Forest": "/images/destinations/bwindi-forest.jpg",
  "Amboseli National Park": "/images/destinations/amboseli-real.jpg",
  "Victoria Falls": "/images/destinations/victoria-falls-real.jpg",
  "Diani Beach": "/images/destinations/diani-real.jpg",
  "Samburu National Reserve": "/images/destinations/samburu-reserve.jpg",
  "Lake Victoria": "/images/destinations/lake-victoria.jpg",
  "Mount Kilimanjaro": "/images/destinations/kilimanjaro.jpg",
  "Volcanoes National Park": "/images/destinations/volcanoes-rwanda.jpg",
  "Simien Mountains": "/images/destinations/simien-mountains.jpg",
  "Lake Nakuru National Park": "/images/destinations/maasai-mara-wildlife.jpg",
  "Tsavo National Parks": "/images/gallery/elephants-real.jpg",
  "Hell's Gate National Park": "/images/destinations/mount-kenya-authentic.jpg",
};

// Map package image URLs to paths
const packageImages: Record<string, string> = {
  "maasai-mara": "/images/destinations/maasai-mara-real.jpg",
  "serengeti": "/images/destinations/serengeti-real.jpg",
  "mount-kenya": "/images/destinations/mount-kenya-real.jpg",
  "zanzibar": "/images/destinations/zanzibar-beach-real.jpg",
  "amboseli": "/images/destinations/amboseli-real.jpg",
  "bwindi": "/images/destinations/bwindi-forest.jpg",
  "victoria-falls": "/images/destinations/victoria-falls-real.jpg",
  "diani": "/images/destinations/diani-real.jpg",
};

const Home = () => {
  const { data: featuredPackages, isLoading: packagesLoading } = useQuery({
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

  const { data: popularDestinations, isLoading: destinationsLoading } = useQuery({
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
      
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-safari.jpg"
            alt="Safari Kenya Hero"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white text-center">
          <div className="mb-3 sm:mb-4 text-accent font-semibold text-base sm:text-lg md:text-xl animate-fade-in">
            Karibu Kenya, Hakuna Matata 🦁
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in leading-tight">
            Discover the Magic of East Africa
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto text-white/90 px-2">
            Experience unforgettable safaris, pristine beaches, and rich cultures across Kenya, Tanzania, Uganda, Rwanda, and beyond
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
            <Button size="lg" asChild className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-primary hover:bg-primary/90">
              <Link to="/packages">
                Browse Packages <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
              <Link to="/destinations">Explore Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">15+ Years</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Trusted operator</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Safety First</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Fully licensed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">50+ Destinations</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">All East Africa</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <Headphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Always available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 lg:mb-4">Featured Safari Packages</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Handpicked adventures designed to give you the best of East Africa
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {packagesLoading ? (
              <>
                <PackageCardSkeleton />
                <PackageCardSkeleton />
                <PackageCardSkeleton />
              </>
            ) : (
              featuredPackages?.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  id={pkg.id}
                  title={pkg.title}
                  description={pkg.description || ""}
                  imageUrl={packageImages[pkg.image_url || ""] || "/images/destinations/maasai-mara-real.jpg"}
                  priceKes={Number(pkg.price_kes)}
                  durationDays={pkg.duration_days}
                  durationNights={pkg.duration_nights}
                  difficulty={pkg.difficulty}
                  seatsAvailable={pkg.seats_available}
                  rating={Number(pkg.rating) || 4.5}
                />
              ))
            )}
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

      <section className="py-10 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 lg:mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              From savannas to beaches, explore East Africa's diverse landscapes
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {destinationsLoading ? (
              <>
                <DestinationCardSkeleton />
                <DestinationCardSkeleton />
                <DestinationCardSkeleton />
                <DestinationCardSkeleton />
              </>
            ) : (
              popularDestinations?.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  id={dest.id}
                  title={dest.title}
                  country={dest.country}
                  region={dest.region}
                  imageUrl={destinationImages[dest.title] || "/images/destinations/maasai-mara-real.jpg"}
                  description={dest.description}
                />
              ))
            )}
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

      <SpecialOffers />

      <WhyChooseUs />

      <Testimonials />

      <TravelRequirements />

      <Newsletter />

      <section className="py-10 md:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 lg:mb-6 px-2">Ready for Your East African Adventure?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90 px-2">
            Book your dream safari today and create memories that will last a lifetime
          </p>
          <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <Link to="/packages">Start Planning Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
