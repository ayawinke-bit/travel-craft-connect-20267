import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DestinationCard from "@/components/DestinationCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Import destination images - Authentic East African wildlife and landscapes
import maasaiMaraImg from "@/assets/destinations/maasai-mara-real.jpg";
import serengetiImg from "@/assets/destinations/serengeti-real.jpg";
import mountKenyaImg from "@/assets/destinations/mount-kenya-real.jpg";
import nairobiImg from "@/assets/destinations/nairobi-real.jpg";
import zanzibarImg from "@/assets/destinations/zanzibar-beach-real.jpg";
import bwindiImg from "@/assets/destinations/bwindi-forest.jpg";
import amboseliImg from "@/assets/destinations/amboseli-real.jpg";
import victoriaFallsImg from "@/assets/destinations/victoria-falls-real.jpg";
import dianiBeachImg from "@/assets/destinations/diani-real.jpg";
import samburuImg from "@/assets/destinations/samburu-reserve.jpg";
import lakeVictoriaImg from "@/assets/destinations/lake-victoria.jpg";
import nileRiverImg from "@/assets/destinations/nile-river.jpg";
import lamuIslandImg from "@/assets/destinations/lamu-island.jpg";
import kilimanjaroImg from "@/assets/destinations/kilimanjaro.jpg";
import volcanoesRwandaImg from "@/assets/destinations/volcanoes-rwanda.jpg";
import simienMountainsImg from "@/assets/destinations/simien-mountains.jpg";
import lakeNakuruImg from "@/assets/destinations/maasai-mara-wildlife.jpg";
import tsavoImg from "@/assets/gallery/elephants-real.jpg";
import hellsGateImg from "@/assets/destinations/mount-kenya-authentic.jpg";

// Map destination titles to authentic African wildlife images
const destinationImages: Record<string, string> = {
  "Maasai Mara National Reserve": maasaiMaraImg,
  "Serengeti National Park": serengetiImg,
  "Mount Kenya National Park": mountKenyaImg,
  "Mount Kenya": mountKenyaImg,
  "Nairobi City": nairobiImg,
  "Zanzibar Archipelago": zanzibarImg,
  "Bwindi Impenetrable Forest": bwindiImg,
  "Amboseli National Park": amboseliImg,
  "Victoria Falls": victoriaFallsImg,
  "Diani Beach": dianiBeachImg,
  "Samburu National Reserve": samburuImg,
  "Lake Victoria": lakeVictoriaImg,
  "River Nile": nileRiverImg,
  "Lamu Island": lamuIslandImg,
  "Mount Kilimanjaro": kilimanjaroImg,
  "Volcanoes National Park": volcanoesRwandaImg,
  "Simien Mountains": simienMountainsImg,
  "Lake Nakuru National Park": lakeNakuruImg,
  "Tsavo National Parks": tsavoImg,
  "Hell's Gate National Park": hellsGateImg,
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
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
                  imageUrl={destinationImages[dest.title] || maasaiMaraImg}
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
