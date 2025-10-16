import { useState } from "react";
import Navbar from "@/components/Navbar";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import beachImage from "@/assets/beach-coast.jpg";
import cityImage from "@/assets/city-urban.jpg";
import mountainImage from "@/assets/mountain-adventure.jpg";
import heroImage from "@/assets/hero-safari.jpg";

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const allPackages = [
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
    },
    {
      id: "5",
      title: "Amboseli Elephant Safari",
      destination: "Amboseli, Kenya",
      price: 75000,
      duration: "4 Days",
      groupSize: "4-10 people",
      image: heroImage,
      rating: 4.8,
      difficulty: "Easy"
    },
    {
      id: "6",
      title: "Lamu Cultural Experience",
      destination: "Lamu Island, Kenya",
      price: 65000,
      duration: "4 Days",
      groupSize: "2-10 people",
      image: beachImage,
      rating: 4.7,
      difficulty: "Easy"
    }
  ];

  const filteredPackages = allPackages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || pkg.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesPrice = selectedPriceRange === "all" || 
                        (selectedPriceRange === "low" && pkg.price < 50000) ||
                        (selectedPriceRange === "medium" && pkg.price >= 50000 && pkg.price < 80000) ||
                        (selectedPriceRange === "high" && pkg.price >= 80000);
    
    return matchesSearch && matchesDifficulty && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Explore Our Packages
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Carefully curated adventures for every type of traveler
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search packages or destinations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="challenging">Challenging</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under KES 50K</SelectItem>
                <SelectItem value="medium">KES 50K - 80K</SelectItem>
                <SelectItem value="high">Above KES 80K</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedDifficulty("all");
                setSelectedPriceRange("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredPackages.length} of {allPackages.length} packages
            </p>
          </div>
          
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No packages match your filters</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDifficulty("all");
                  setSelectedPriceRange("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
