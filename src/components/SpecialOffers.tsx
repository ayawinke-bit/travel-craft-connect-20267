import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, Tag, Users } from "lucide-react";

const offers = [
  {
    title: "Early Bird Special - Maasai Mara",
    discount: "25% OFF",
    originalPrice: 120000,
    salePrice: 90000,
    validUntil: "March 31, 2025",
    description: "Book 60 days in advance and save big on our classic Maasai Mara safari package",
    spots: 12,
    tag: "LIMITED TIME"
  },
  {
    title: "Group Safari Discount",
    discount: "30% OFF",
    originalPrice: 200000,
    salePrice: 140000,
    validUntil: "April 15, 2025",
    description: "Travel with 6+ people and enjoy exclusive group rates across all destinations",
    spots: 8,
    tag: "GROUP DEAL"
  },
  {
    title: "Honeymoon Package - Zanzibar",
    discount: "35% OFF",
    originalPrice: 180000,
    salePrice: 117000,
    validUntil: "June 30, 2025",
    description: "Romantic beach escape with complimentary sunset cruise and spa treatment",
    spots: 5,
    tag: "ROMANCE"
  }
];

const SpecialOffers = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-lg px-4 py-2 bg-primary">
            <Tag className="w-4 h-4 mr-2" />
            Special Offers
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Limited Time Deals</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book now and save on our most popular safari packages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-destructive text-destructive-foreground font-bold text-lg px-3 py-1">
                  {offer.discount}
                </Badge>
              </div>
              
              <CardContent className="pt-6">
                <Badge variant="outline" className="mb-3">{offer.tag}</Badge>
                <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                <p className="text-muted-foreground mb-4 min-h-[3rem]">{offer.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground line-through">
                      KES {offer.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      KES {offer.salePrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">
                      Only {offer.spots} spots left!
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link to="/packages">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            * Terms and conditions apply. Subject to availability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
