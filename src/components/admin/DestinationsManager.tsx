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

const DestinationsManager = () => {
  const { data: destinations, isLoading } = useQuery({
    queryKey: ["adminDestinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
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
        <CardTitle>All Destinations</CardTitle>
        <CardDescription>View all destinations</CardDescription>
      </CardHeader>
      <CardContent>
        {destinations && destinations.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Highlights</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {destinations.map((destination: any) => (
                  <TableRow key={destination.id}>
                    <TableCell className="font-medium">{destination.title}</TableCell>
                    <TableCell>{destination.country}</TableCell>
                    <TableCell>{destination.region || "N/A"}</TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        {destination.highlights && destination.highlights.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                            {destination.highlights.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{destination.highlights.length - 3}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={destination.status === "published" ? "default" : "secondary"}>
                        {destination.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No destinations found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DestinationsManager;
