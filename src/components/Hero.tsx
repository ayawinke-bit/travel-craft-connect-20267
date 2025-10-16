import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-safari.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Discover Africa's
          <span className="block mt-2 bg-gradient-hero bg-clip-text text-transparent">
            Hidden Treasures
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          Unforgettable adventures across stunning landscapes, wildlife safaris, and cultural experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Button asChild size="lg" className="shadow-strong">
            <Link to="/packages">
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Link to="/destinations">
              <Search className="mr-2 h-5 w-5" />
              Browse Destinations
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-white/80">Destinations</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-white/80">Happy Travelers</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="text-white/80">Tour Packages</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">4.9</div>
            <div className="text-white/80">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
