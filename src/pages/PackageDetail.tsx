import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Check, Star } from "lucide-react";
import heroImage from "@/assets/hero-safari.jpg";

const PackageDetail = () => {
  const { id } = useParams();

  // Mock data - in production, this would fetch from your backend
  const packageData = {
    id: "1",
    title: "Maasai Mara Safari Experience",
    destination: "Maasai Mara, Kenya",
    price: 85000,
    duration: "5 Days / 4 Nights",
    groupSize: "4-12 people",
    difficulty: "Easy",
    rating: 4.9,
    reviews: 127,
    image: heroImage,
    description: "Embark on an unforgettable journey through the world-famous Maasai Mara National Reserve. Witness the great migration, spot the Big Five, and immerse yourself in Maasai culture.",
    highlights: [
      "Game drives in 4x4 safari vehicles",
      "Visit to a traditional Maasai village",
      "Witness the Big Five in their natural habitat",
      "Sundowner experience in the savanna",
      "Professional guide and park fees included"
    ],
    itinerary: [
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
    included: [
      "Accommodation in safari lodge",
      "All meals during the safari",
      "Park entrance fees",
      "Professional driver-guide",
      "4x4 safari vehicle",
      "Bottled water during drives",
      "Airport transfers"
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and staff",
      "Optional activities"
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] mt-16">
        <img 
          src={packageData.image} 
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <Badge className="bg-accent text-accent-foreground mb-4">
            {packageData.difficulty}
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-4">
            {packageData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{packageData.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{packageData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{packageData.groupSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{packageData.rating} ({packageData.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {packageData.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Highlights</h2>
              <ul className="space-y-3">
                {packageData.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-6">
                {packageData.itinerary.map((day) => (
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
            <section>
              <h2 className="text-3xl font-bold mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent">Included</h3>
                  <ul className="space-y-2">
                    {packageData.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-destructive">Not Included</h3>
                  <ul className="space-y-2">
                    {packageData.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground">• {item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6 shadow-soft">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    KES {packageData.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-muted-foreground">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{packageData.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Group Size</span>
                  <span className="font-semibold">{packageData.groupSize}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Difficulty</span>
                  <Badge>{packageData.difficulty}</Badge>
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
