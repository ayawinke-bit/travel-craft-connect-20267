import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error) return false;
      return data;
    },
    enabled: !!user,
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={logo} alt="Friends Life Adventure" className="h-12 w-12 object-contain" />
            <span className="font-bold text-lg text-foreground">Friends Life Adventure</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/destinations" className="text-foreground hover:text-primary transition-colors font-medium">
              Destinations
            </Link>
            <Link to="/packages" className="text-foreground hover:text-primary transition-colors font-medium">
              Packages
            </Link>
            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors font-medium">
              Gallery
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" asChild>
                    <Link to="/admin" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/auth">Book Now</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/destinations"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                to="/packages"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                to="/gallery"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" asChild>
                        <Link to="/admin" className="flex items-center gap-2 justify-center">
                          <Shield className="w-4 h-4" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/auth">Book Now</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
