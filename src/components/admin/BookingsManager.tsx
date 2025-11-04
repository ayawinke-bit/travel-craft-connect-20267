import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const BookingsManager = () => {
  const queryClient = useQueryClient();
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          packages(title),
          profiles(full_name, phone)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: string }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ booking_status: status })
        .eq("id", bookingId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking status updated");
      setUpdatingBookingId(null);
    },
    onError: (error) => {
      toast.error("Failed to update booking");
      console.error(error);
      setUpdatingBookingId(null);
    },
  });

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setUpdatingBookingId(bookingId);
    updateBookingMutation.mutate({ bookingId, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      confirmed: "default",
      cancelled: "destructive",
      completed: "secondary",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

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
        <CardTitle>All Bookings</CardTitle>
        <CardDescription>View and manage customer bookings</CardDescription>
      </CardHeader>
      <CardContent>
        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Travel Date</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking: any) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.profiles?.full_name || "Unknown"}</div>
                        {booking.profiles?.phone && (
                          <div className="text-sm text-muted-foreground">{booking.profiles.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{booking.packages?.title || "N/A"}</TableCell>
                    <TableCell>{new Date(booking.travel_date).toLocaleDateString()}</TableCell>
                    <TableCell>{booking.num_travelers}</TableCell>
                    <TableCell>KES {Number(booking.total_amount).toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(booking.payment_status)}</TableCell>
                    <TableCell>{getStatusBadge(booking.booking_status)}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.booking_status}
                        onValueChange={(value) => handleStatusChange(booking.id, value)}
                        disabled={updatingBookingId === booking.id}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bookings yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsManager;
