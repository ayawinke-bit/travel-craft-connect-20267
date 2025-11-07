import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PackageCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-56 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </Card>
  );
};

export default PackageCardSkeleton;
