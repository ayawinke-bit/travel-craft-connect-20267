import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, Calendar, Package, MapPin } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import BookingsManager from "@/components/admin/BookingsManager";
import PackagesManager from "@/components/admin/PackagesManager";
import DestinationsManager from "@/components/admin/DestinationsManager";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Check if user has admin role
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      return data;
    },
    enabled: !!user,
  });

  // Get summary statistics
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [bookingsRes, packagesRes, destinationsRes] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact" }),
        supabase.from("packages").select("id", { count: "exact" }),
        supabase.from("destinations").select("id", { count: "exact" }),
      ]);

      return {
        totalBookings: bookingsRes.count || 0,
        totalPackages: packagesRes.count || 0,
        totalDestinations: destinationsRes.count || 0,
      };
    },
    enabled: !!isAdmin,
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

  if (!user || isLoading) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>You don't have permission to access the admin dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/dashboard")}>
                  Go to My Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage bookings, packages, and destinations</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
                <p className="text-xs text-muted-foreground">All customer bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalPackages || 0}</div>
                <p className="text-xs text-muted-foreground">Published packages</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Destinations</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalDestinations || 0}</div>
                <p className="text-xs text-muted-foreground">Available destinations</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <BookingsManager />
            </TabsContent>
            
            <TabsContent value="packages">
              <PackagesManager />
            </TabsContent>
            
            <TabsContent value="destinations">
              <DestinationsManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
