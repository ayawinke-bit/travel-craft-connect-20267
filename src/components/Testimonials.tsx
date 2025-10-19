import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & John Martinez",
    location: "California, USA",
    rating: 5,
    text: "Our 10-day safari with Friends Life Adventure was absolutely breathtaking! The guides were knowledgeable, accommodations were top-notch, and seeing the Big Five in Maasai Mara was a dream come true. Highly recommend!",
    date: "December 2024"
  },
  {
    name: "Emily Chen",
    location: "Singapore",
    rating: 5,
    text: "I traveled solo and felt completely safe and cared for. The gorilla trekking in Uganda was the highlight of my life. The team went above and beyond to make my adventure unforgettable!",
    date: "November 2024"
  },
  {
    name: "Mohammed Al-Rashid",
    location: "Dubai, UAE",
    rating: 5,
    text: "Exceptional service from start to finish. The Serengeti migration tour was spectacular. Every detail was perfectly planned. Friends Life Adventure exceeded all our expectations!",
    date: "October 2024"
  },
  {
    name: "Lisa & Tom Williams",
    location: "London, UK",
    rating: 5,
    text: "The best vacation we've ever had! Zanzibar beaches were paradise, and the cultural experiences were authentic and enriching. Can't wait to book our next trip with them!",
    date: "September 2024"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied adventurers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-bold text-lg">4.9/5</span>
            <span className="text-muted-foreground">from 2,500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
