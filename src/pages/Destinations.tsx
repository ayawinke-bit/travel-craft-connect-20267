import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import DestinationCard from "@/components/DestinationCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Kenya</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore breathtaking destinations across Kenya
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
                  imageUrl={dest.image_url || ""}
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
    </div>
  );
};

export default Destinations;
