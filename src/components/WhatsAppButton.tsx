import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "+254700123456"; // Replace with actual WhatsApp number
  const message = encodeURIComponent("Hi! I'm interested in booking a safari with Friends Life Adventure. Can you help me?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <Button
        size="lg"
        className="rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BA55] p-0"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
      <span className="absolute right-20 bottom-4 bg-background border border-border px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp!
      </span>
    </a>
  );
};

export default WhatsAppButton;
