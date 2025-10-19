import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "Booking & Payments",
    questions: [
      {
        q: "How do I book a safari with Friends Life Adventure?",
        a: "You can book directly through our website by selecting your desired package, or contact us via WhatsApp, email, or phone. We'll guide you through the entire booking process and answer any questions you may have."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept PayPal, M-Pesa, bank transfers, and major credit cards. A 30% deposit is required to confirm your booking, with the balance due 30 days before departure."
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellations made 60+ days before departure receive a full refund minus 10% admin fee. 30-59 days: 50% refund. Less than 30 days: no refund. We recommend travel insurance to protect your investment."
      }
    ]
  },
  {
    category: "Safari Preparation",
    questions: [
      {
        q: "What should I pack for my safari?",
        a: "Pack lightweight, neutral-colored clothing, comfortable walking shoes, sunscreen, insect repellent, binoculars, camera with zoom lens, and any personal medications. We'll send you a detailed packing list upon booking."
      },
      {
        q: "Do I need vaccinations for East Africa?",
        a: "Yellow fever vaccination is required for entry to some countries. We recommend malaria prophylaxis and routine vaccinations. Consult your doctor or travel clinic 6-8 weeks before departure."
      },
      {
        q: "What's the best time to visit for wildlife viewing?",
        a: "For the Great Migration in Maasai Mara: July-October. For general wildlife: January-February and June-September are excellent. Each season offers unique experiences."
      }
    ]
  },
  {
    category: "During Your Safari",
    questions: [
      {
        q: "What type of accommodations do you provide?",
        a: "We offer a range from luxury lodges to comfortable tented camps, all with private facilities, quality meals, and excellent locations for wildlife viewing. Accommodation type varies by package."
      },
      {
        q: "Is safari safe?",
        a: "Yes! Your safety is our top priority. Our experienced guides follow strict safety protocols, vehicles are well-maintained, and we provide comprehensive briefings. Wildlife viewing is done from safe distances."
      },
      {
        q: "What if I have dietary restrictions?",
        a: "We cater to all dietary requirements including vegetarian, vegan, halal, kosher, and food allergies. Just inform us at booking, and we'll make all necessary arrangements with lodges and camps."
      }
    ]
  },
  {
    category: "Travel Logistics",
    questions: [
      {
        q: "Do I need a visa?",
        a: "Most nationalities require a visa for Kenya, Tanzania, Uganda, and Rwanda. We recommend applying for an e-visa online before departure. Some countries offer visa-on-arrival. Check requirements for your nationality."
      },
      {
        q: "Can I extend my safari or add extra destinations?",
        a: "Absolutely! We can customize any itinerary. Popular extensions include Zanzibar beach, gorilla trekking in Uganda/Rwanda, or Victoria Falls. Contact us to design your perfect trip."
      },
      {
        q: "What about travel insurance?",
        a: "We strongly recommend comprehensive travel insurance covering medical emergencies, evacuation, trip cancellation, and lost luggage. We can recommend reputable providers."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers! Find everything you need to know about planning your East African adventure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqData.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem
                      key={qIndex}
                      value={`${catIndex}-${qIndex}`}
                      className="border rounded-lg px-6 bg-card"
                    >
                      <AccordionTrigger className="hover:no-underline text-left">
                        <span className="font-semibold">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our friendly team is here to help you plan the perfect adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://wa.me/254700123456"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
