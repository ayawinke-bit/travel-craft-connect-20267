import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, Star } from "lucide-react";

interface PackageCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  priceKes: number;
  durationDays: number;
  durationNights: number;
  difficulty: string;
  seatsAvailable: number;
  rating?: number;
}

const PackageCard = ({
  id,
  title,
  description,
  imageUrl,
  priceKes,
  durationDays,
  durationNights,
  difficulty,
  seatsAvailable,
  rating = 4.5,
}: PackageCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-secondary text-secondary-foreground";
      case "moderate":
        return "bg-accent text-accent-foreground";
      case "challenging":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
        <Badge className={`absolute top-3 left-3 ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </Badge>
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {durationDays}D / {durationNights}N
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span>{seatsAvailable} seats left</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{formatPrice(priceKes)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link to={`/packages/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
