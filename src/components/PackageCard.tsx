import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface PackageCardProps {
  id: string;
  title: string;
  destination: string;
  price: number;
  duration: string;
  groupSize: string;
  image: string;
  rating: number;
  difficulty: string;
}

const PackageCard = ({
  id,
  title,
  destination,
  price,
  duration,
  groupSize,
  image,
  rating,
  difficulty
}: PackageCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-strong transition-all duration-300">
      <div className="relative overflow-hidden h-64">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent text-accent-foreground">
            {difficulty}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span className="text-sm">{destination}</span>
        </div>
        <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {groupSize}
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">KES {price.toLocaleString()}</span>
          <span className="text-muted-foreground">per person</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link to={`/packages/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
