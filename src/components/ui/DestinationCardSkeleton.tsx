import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DestinationCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-72 w-full" />
    </Card>
  );
};

export default DestinationCardSkeleton;
