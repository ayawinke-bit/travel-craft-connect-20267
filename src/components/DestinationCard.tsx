import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface DestinationCardProps {
  id: string;
  title: string;
  country: string;
  region?: string;
  imageUrl: string;
  description?: string;
}

const DestinationCard = ({
  id,
  title,
  country,
  region,
  imageUrl,
  description,
}: DestinationCardProps) => {
  return (
    <Link to={`/destinations/${id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <div className="relative h-72 overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">
                {region ? `${region}, ${country}` : country}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-white/90 line-clamp-2">{description}</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DestinationCard;
