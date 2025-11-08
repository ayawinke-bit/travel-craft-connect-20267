import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DestinationCard from "@/components/DestinationCard";
import DestinationCardSkeleton from "@/components/ui/DestinationCardSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  "River Nile": "/images/destinations/nile-river.jpg",
  "Lamu Island": "/images/destinations/lamu-island.jpg",
  "Mount Kilimanjaro": "/images/destinations/kilimanjaro.jpg",
  "Volcanoes National Park": "/images/destinations/volcanoes-rwanda.jpg",
  "Simien Mountains": "/images/destinations/simien-mountains.jpg",
  "Lake Nakuru National Park": "/images/destinations/maasai-mara-wildlife.jpg",
  "Tsavo National Parks": "/images/gallery/elephants-real.jpg",
  "Hell's Gate National Park": "/images/destinations/mount-kenya-authentic.jpg",
};

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("status", "published")
        .order("title");
      
      if (error) throw error;
      return data;
    },
  });

  const filteredDestinations = destinations?.filter((dest) =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover East Africa</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore breathtaking destinations across Kenya, Tanzania, Uganda, Rwanda, Ethiopia, and beyond
            </p>
          </div>

          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
            </div>
          ) : filteredDestinations && filteredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  id={dest.id}
                  title={dest.title}
                  country={dest.country}
                  region={dest.region}
                  imageUrl={destinationImages[dest.title] || "/images/destinations/maasai-mara-real.jpg"}
                  description={dest.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No destinations found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Destinations;
