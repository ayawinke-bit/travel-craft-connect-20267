import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Loader2, ArrowLeft, Users, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { bookingSchema } from "@/lib/bookingValidation";
import { z } from "zod";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [numTravelers, setNumTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [travelerDetails, setTravelerDetails] = useState([
    { fullName: "", email: "", phone: "", passportNumber: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: packageData, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const handleTravelerCountChange = (count: number) => {
    setNumTravelers(count);
    const newDetails = Array.from({ length: count }, (_, i) => 
      travelerDetails[i] || { fullName: "", email: "", phone: "", passportNumber: "" }
    );
    setTravelerDetails(newDetails);
  };

  const handleTravelerDetailChange = (index: number, field: string, value: string) => {
    const newDetails = [...travelerDetails];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setTravelerDetails(newDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to make a booking");
      navigate("/auth");
      return;
    }

    if (!date) {
      toast.error("Please select a travel date");
      return;
    }

    if (!packageData) return;

    setIsSubmitting(true);

    try {
      const totalAmount = packageData.price_kes * numTravelers;

      // Validate booking data
      const validated = bookingSchema.parse({
        packageId: id!,
        numTravelers,
        totalAmount,
        travelDate: format(date, "yyyy-MM-dd"),
        travelerDetails,
        specialRequests: specialRequests || undefined,
      });

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        package_id: validated.packageId,
        num_travelers: validated.numTravelers,
        total_amount: validated.totalAmount,
        travel_date: validated.travelDate,
        traveler_details: validated.travelerDetails,
        special_requests: validated.specialRequests || null,
        booking_status: "pending",
        payment_status: "pending",
      });

      if (error) throw error;

      toast.success("Booking submitted successfully! We'll contact you shortly.");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Booking error:", error);
        toast.error("Failed to submit booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
          <Button asChild>
            <Link to="/packages">Browse All Packages</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalAmount = packageData.price_kes * numTravelers;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <Button asChild variant="ghost" className="mb-6">
          <Link to={`/packages/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Package
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Complete Your Booking</CardTitle>
                <p className="text-muted-foreground">{packageData.title}</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Travel Date */}
                  <div className="space-y-2">
                    <Label>Travel Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Number of Travelers */}
                  <div className="space-y-2">
                    <Label htmlFor="travelers">Number of Travelers *</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleTravelerCountChange(Math.max(1, numTravelers - 1))}
                        disabled={numTravelers <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id="travelers"
                        type="number"
                        min="1"
                        max={packageData.seats_available}
                        value={numTravelers}
                        onChange={(e) => handleTravelerCountChange(parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleTravelerCountChange(Math.min(packageData.seats_available, numTravelers + 1))}
                        disabled={numTravelers >= packageData.seats_available}
                      >
                        +
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        (Max: {packageData.seats_available})
                      </span>
                    </div>
                  </div>

                  {/* Traveler Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <Label className="text-lg">Traveler Details</Label>
                    </div>
                    {travelerDetails.map((traveler, index) => (
                      <Card key={index} className="p-4">
                        <h4 className="font-semibold mb-4">Traveler {index + 1}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`name-${index}`}>Full Name *</Label>
                            <Input
                              id={`name-${index}`}
                              value={traveler.fullName}
                              onChange={(e) => handleTravelerDetailChange(index, "fullName", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`email-${index}`}>Email *</Label>
                            <Input
                              id={`email-${index}`}
                              type="email"
                              value={traveler.email}
                              onChange={(e) => handleTravelerDetailChange(index, "email", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`phone-${index}`}>Phone *</Label>
                            <Input
                              id={`phone-${index}`}
                              type="tel"
                              value={traveler.phone}
                              onChange={(e) => handleTravelerDetailChange(index, "phone", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`passport-${index}`}>Passport Number</Label>
                            <Input
                              id={`passport-${index}`}
                              value={traveler.passportNumber}
                              onChange={(e) => handleTravelerDetailChange(index, "passportNumber", e.target.value)}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests or Dietary Requirements</Label>
                    <Textarea
                      id="requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requirements we should know about?"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Submit Booking
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting, you agree to our terms and conditions. Our team will contact you to confirm payment details.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Package</p>
                  <p className="font-semibold">{packageData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold">
                    {packageData.duration_days} Days / {packageData.duration_nights} Nights
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Travel Date</p>
                  <p className="font-semibold">
                    {date ? format(date, "PPP") : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Number of Travelers</p>
                  <p className="font-semibold">{numTravelers}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Price per Person</p>
                  <p className="font-semibold">
                    KES {packageData.price_kes.toLocaleString()}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-lg font-bold">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">
                    KES {totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-2">What's Included:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {packageData.included?.slice(0, 3).map((item: string, i: number) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;