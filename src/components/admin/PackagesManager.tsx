import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const PackagesManager = () => {
  const { data: packages, isLoading } = useQuery({
    queryKey: ["adminPackages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Packages</CardTitle>
        <CardDescription>View all safari packages</CardDescription>
      </CardHeader>
      <CardContent>
        {packages && packages.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price (KES)</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Available Seats</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg: any) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>
                      {pkg.duration_days} days / {pkg.duration_nights} nights
                    </TableCell>
                    <TableCell>KES {Number(pkg.price_kes).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{pkg.difficulty}</Badge>
                    </TableCell>
                    <TableCell>
                      {pkg.seats_available} / {pkg.seats_total}
                    </TableCell>
                    <TableCell>⭐ {pkg.rating}</TableCell>
                    <TableCell>
                      <Badge variant={pkg.status === "published" ? "default" : "secondary"}>
                        {pkg.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No packages found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PackagesManager;
