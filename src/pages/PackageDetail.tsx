import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Users, MapPin, Check, Star, Loader2, ArrowLeft } from "lucide-react";

// Import package images
import maasaiMaraImg from "@/assets/destinations/maasai-mara-real.jpg";
import maasaiMara2 from "@/assets/destinations/maasai-mara-wildlife.jpg";
import maasaiMara3 from "@/assets/destinations/maasai-mara-authentic.jpg";
import serengetiImg from "@/assets/destinations/serengeti-real.jpg";
import serengeti2 from "@/assets/destinations/serengeti-landscape.jpg";
import mountKenyaImg from "@/assets/destinations/mount-kenya-real.jpg";
import mountKenya2 from "@/assets/destinations/mount-kenya-authentic.jpg";
import zanzibarImg from "@/assets/destinations/zanzibar-beach-real.jpg";
import zanzibar2 from "@/assets/destinations/zanzibar-authentic.jpg";
import amboseliImg from "@/assets/destinations/amboseli-real.jpg";
import amboseli2 from "@/assets/destinations/amboseli-elephants.jpg";
import bwindiImg from "@/assets/destinations/bwindi-forest.jpg";
import bwindi2 from "@/assets/destinations/bwindi-authentic.jpg";
import wildlife1 from "@/assets/gallery/elephants-real.jpg";
import wildlife2 from "@/assets/gallery/lion-kenya-real.jpg";
import wildlife3 from "@/assets/gallery/giraffes-sunset.jpg";

// Map package image identifiers to images and gallery images
const packageImages: Record<string, string> = {
  "maasai-mara": maasaiMaraImg,
  "serengeti": serengetiImg,
  "mount-kenya": mountKenyaImg,
  "zanzibar": zanzibarImg,
  "amboseli": amboseliImg,
  "bwindi": bwindiImg,
};

const packageGalleryImages: Record<string, { src: string; alt: string }[]> = {
  "maasai-mara": [
    { src: maasaiMara2, alt: "Maasai Mara Wildlife" },
    { src: maasaiMara3, alt: "Maasai Mara Landscape" },
    { src: wildlife1, alt: "African Elephants" },
    { src: wildlife2, alt: "Lions in the Wild" },
    { src: wildlife3, alt: "Giraffes at Sunset" },
  ],
  "serengeti": [
    { src: serengeti2, alt: "Serengeti Plains" },
    { src: wildlife1, alt: "African Elephants" },
    { src: wildlife2, alt: "Lions in the Wild" },
    { src: wildlife3, alt: "Giraffes at Sunset" },
  ],
  "mount-kenya": [
    { src: mountKenya2, alt: "Mount Kenya Peak" },
    { src: wildlife1, alt: "Mountain Wildlife" },
  ],
  "zanzibar": [
    { src: zanzibar2, alt: "Zanzibar Old Town" },
  ],
  "amboseli": [
    { src: amboseli2, alt: "Amboseli Elephants" },
    { src: wildlife1, alt: "Elephant Herds" },
    { src: wildlife3, alt: "Safari Views" },
  ],
  "bwindi": [
    { src: bwindi2, alt: "Bwindi Forest Interior" },
  ],
};

const PackageDetail = () => {
  const { id } = useParams();

  const { data: packageData, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select(`
          *,
          destinations (
            title,
            country,
            region
          )
        `)
        .eq("id", id)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The package you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/packages">Browse All Packages</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const destinationName = packageData.destinations 
    ? `${packageData.destinations.title}, ${packageData.destinations.country}`
    : "Kenya";

  // Mock data for fields not yet in database
  const mockData = {
    groupSize: `${packageData.seats_total} people max`,
    reviews: 127,
  };

  const displayData = {
    ...packageData,
    ...mockData,
    destination: destinationName,
    duration: `${packageData.duration_days} Days / ${packageData.duration_nights} Nights`,
    itinerary: packageData.itinerary || [
      {
        day: 1,
        title: "Arrival & Orientation",
        description: "Pick up from Nairobi, drive to Maasai Mara with scenic stops. Check into lodge, evening game drive."
      },
      {
        day: 2,
        title: "Full Day Safari",
        description: "Morning and afternoon game drives. Picnic lunch in the reserve. Sunset photography session."
      },
      {
        day: 3,
        title: "Cultural Experience",
        description: "Morning game drive, afternoon visit to Maasai village. Learn about traditions and customs."
      },
      {
        day: 4,
        title: "Great Migration Viewing",
        description: "Early morning departure to witness the migration (seasonal). Full day exploring different areas of the reserve."
      },
      {
        day: 5,
        title: "Departure",
        description: "Final morning game drive, breakfast at the lodge, return journey to Nairobi."
      }
    ],
  };

  const mainImage = packageImages[displayData.image_url || ""] || maasaiMaraImg;
  const galleryImages = packageGalleryImages[displayData.image_url || ""] || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-8">
        <Button asChild variant="ghost" className="mb-4 hover-scale">
          <Link to="/packages">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Packages
          </Link>
        </Button>

        {/* Gallery Section */}
        <div className="mb-6 sm:mb-8">
          <ImageGallery 
            images={galleryImages}
            mainImage={mainImage}
            mainAlt={displayData.title}
          />
        </div>

        {/* Header Info */}
        <div className="mb-8">
          <Badge className="bg-accent text-accent-foreground mb-3">
            {displayData.difficulty}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {displayData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{displayData.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{displayData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{displayData.groupSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm sm:text-base">{displayData.rating} ({displayData.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {displayData.description}
              </p>
            </section>

            {/* Highlights */}
            {displayData.highlights && displayData.highlights.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {displayData.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-6">
                {Array.isArray(displayData.itinerary) && displayData.itinerary.map((day: any) => (
                  <div key={day.day} className="border-l-4 border-primary pl-6 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-semibold">{day.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{day.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included */}
            {(displayData.included || displayData.not_included) && (
              <section>
                <h2 className="text-3xl font-bold mb-6">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {displayData.included && displayData.included.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-accent">Included</h3>
                      <ul className="space-y-2">
                        {displayData.included.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {displayData.not_included && displayData.not_included.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-destructive">Not Included</h3>
                      <ul className="space-y-2">
                        {displayData.not_included.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">• {item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6 shadow-soft">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    KES {displayData.price_kes.toLocaleString()}
                  </span>
                </div>
                <p className="text-muted-foreground">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{displayData.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Group Size</span>
                  <span className="font-semibold">{displayData.groupSize}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Seats Available</span>
                  <span className="font-semibold text-accent">{displayData.seats_available}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Difficulty</span>
                  <Badge>{displayData.difficulty}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link to={`/booking/${id}`}>
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Now
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Contact Us
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center mt-6">
                🔒 Secure booking • Free cancellation up to 48h
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;
