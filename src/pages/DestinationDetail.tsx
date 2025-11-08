import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, ArrowLeft, Loader2 } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import PackageCardSkeleton from "@/components/ui/PackageCardSkeleton";

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
};

const destinationGalleryImages: Record<string, { src: string; alt: string }[]> = {
  "Maasai Mara National Reserve": [
    { src: "/images/destinations/maasai-mara-wildlife.jpg", alt: "Maasai Mara Wildlife" },
    { src: "/images/destinations/maasai-mara-authentic.jpg", alt: "Maasai Mara Plains" },
    { src: "/images/gallery/elephants-real.jpg", alt: "African Elephants" },
    { src: "/images/gallery/lion-kenya-real.jpg", alt: "Lions" },
    { src: "/images/gallery/giraffes-sunset.jpg", alt: "Giraffes at Sunset" },
  ],
  "Serengeti National Park": [
    { src: "/images/destinations/serengeti-landscape.jpg", alt: "Serengeti Plains" },
    { src: "/images/gallery/elephants-real.jpg", alt: "Elephants" },
    { src: "/images/gallery/lion-kenya-real.jpg", alt: "Lions in Serengeti" },
  ],
  "Mount Kenya National Park": [
    { src: "/images/destinations/mount-kenya-authentic.jpg", alt: "Mount Kenya Peak" },
  ],
  "Nairobi City": [
    { src: "/images/destinations/nairobi-city.jpg", alt: "Nairobi Skyline" },
  ],
  "Zanzibar Archipelago": [
    { src: "/images/destinations/zanzibar-authentic.jpg", alt: "Stone Town" },
  ],
  "Bwindi Impenetrable Forest": [
    { src: "/images/destinations/bwindi-authentic.jpg", alt: "Bwindi Forest Interior" },
  ],
  "Amboseli National Park": [
    { src: "/images/destinations/amboseli-elephants.jpg", alt: "Amboseli Elephants" },
    { src: "/images/gallery/elephants-real.jpg", alt: "Elephant Herds" },
  ],
  "Victoria Falls": [
    { src: "/images/destinations/victoria-falls-view.jpg", alt: "Victoria Falls View" },
  ],
  "Diani Beach": [
    { src: "/images/destinations/diani-beach.jpg", alt: "Diani Beach Coast" },
  ],
};

const DestinationDetail = () => {
  const { id } = useParams();

  const { data: destination, isLoading: destinationLoading } = useQuery({
    queryKey: ["destination", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const { data: packages, isLoading: packagesLoading } = useQuery({
    queryKey: ["destination-packages", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("destination_id", id)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-96 w-full rounded-lg mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-32 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The destination you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/destinations">Browse All Destinations</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const mainImage = destinationImages[destination.title] || "/images/destinations/maasai-mara-real.jpg";
  const galleryImages = destinationGalleryImages[destination.title] || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-8">
        <Button asChild variant="ghost" className="mb-4 hover-scale">
          <Link to="/destinations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Link>
        </Button>

        {/* Gallery Section */}
        <div className="mb-6 sm:mb-8">
          <ImageGallery 
            images={galleryImages}
            mainImage={mainImage}
            mainAlt={destination.title}
          />
        </div>

        {/* Header Info */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {destination.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">
              {destination.region ? `${destination.region}, ${destination.country}` : destination.country}
            </span>
          </div>
          {destination.description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {destination.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Description */}
        <section className="max-w-4xl mb-16">
          <h2 className="text-3xl font-bold mb-6">About This Destination</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {destination.description}
          </p>
        </section>

        {/* Highlights */}
        {destination.highlights && destination.highlights.length > 0 && (
          <section className="max-w-4xl mb-16">
            <h2 className="text-3xl font-bold mb-6">Highlights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {destination.highlights.map((highlight: string, index: number) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available Packages */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Available Safari Packages</h2>
          {packagesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PackageCardSkeleton />
              <PackageCardSkeleton />
              <PackageCardSkeleton />
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard 
                  key={pkg.id}
                  id={pkg.id}
                  title={pkg.title}
                  description={pkg.description || ""}
                  imageUrl={pkg.image_url || ""}
                  priceKes={pkg.price_kes}
                  durationDays={pkg.duration_days}
                  durationNights={pkg.duration_nights}
                  difficulty={pkg.difficulty}
                  seatsAvailable={pkg.seats_available}
                  rating={pkg.rating || 4.5}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-4">
                No packages available for this destination yet.
              </p>
              <Button asChild>
                <Link to="/packages">Browse All Packages</Link>
              </Button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
