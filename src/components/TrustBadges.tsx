import { Shield, Award, Heart, Users } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Safe & encrypted bookings"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Best Safari Operator 2024"
    },
    {
      icon: Heart,
      title: "98% Satisfaction",
      description: "Rated excellent by clients"
    },
    {
      icon: Users,
      title: "10,000+ Travelers",
      description: "Happy customers worldwide"
    }
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
