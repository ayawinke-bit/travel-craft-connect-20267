import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import gallery images - using Unsplash real photos
const maasaiCulture = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800";
const elephantsSunset = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800";
const africanMarket = "https://images.unsplash.com/photo-1553531087-88d88ac50fa0?w=800";
const lionsSavanna = "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800";
const villageKilimanjaro = "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800";
const giraffesSunset = "https://images.unsplash.com/photo-1551084483-c3b806e7654b?w=800";

// Import destination images - using Unsplash real photos
const maasaiMara = "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
const mountKenya = "https://images.unsplash.com/photo-1609198092357-c7a0c4d0e9e0?w=800";
const dianiBeach = "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800";
const nairobiCity = "https://images.unsplash.com/photo-1547970810-dc1e684757a3?w=800";
const serengeti = "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800";
const zanzibar = "https://images.unsplash.com/photo-1589182373726-e4f658ab50b0?w=800";
const bwindiForest = "https://images.unsplash.com/photo-1619198010303-64e69ac3f1c3?w=800";
const volcanoesRwanda = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800";
const simienMountains = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800";
const victoriaFalls = "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cultureImages = [
    { src: maasaiCulture, title: "Maasai Warriors", description: "Traditional jumping ceremony" },
    { src: africanMarket, title: "African Market", description: "Colorful crafts and textiles" },
    { src: villageKilimanjaro, title: "Traditional Village", description: "Life at the foot of Kilimanjaro" },
  ];

  const wildlifeImages = [
    { src: elephantsSunset, title: "Elephants at Sunset", description: "Majestic African elephants" },
    { src: lionsSavanna, title: "Lion Pride", description: "Kings of the savanna" },
    { src: giraffesSunset, title: "Giraffe Silhouettes", description: "Grace under African skies" },
  ];

  const landscapeImages = [
    { src: maasaiMara, title: "Maasai Mara", description: "Golden hour in the Mara" },
    { src: mountKenya, title: "Mount Kenya", description: "Misty mountain majesty" },
    { src: dianiBeach, title: "Diani Beach", description: "Paradise on the coast" },
    { src: nairobiCity, title: "Nairobi", description: "Modern African metropolis" },
    { src: serengeti, title: "Serengeti", description: "The great migration" },
    { src: zanzibar, title: "Zanzibar", description: "Spice island beaches" },
    { src: bwindiForest, title: "Bwindi Forest", description: "Gorilla habitat" },
    { src: volcanoesRwanda, title: "Volcanoes Park", description: "Misty volcanic peaks" },
    { src: simienMountains, title: "Simien Mountains", description: "Ethiopia's dramatic highlands" },
    { src: victoriaFalls, title: "Victoria Falls", description: "Thunder that smokes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in the beauty of Africa through our curated collection of stunning imagery
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="landscapes">Landscapes</TabsTrigger>
              <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-6">Landscapes</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {landscapeImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{image.title}</h3>
                          <p className="text-sm text-white/80">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Wildlife</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {wildlifeImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{image.title}</h3>
                          <p className="text-sm text-white/80">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Culture</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {cultureImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{image.title}</h3>
                          <p className="text-sm text-white/80">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="landscapes">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {landscapeImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-sm text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wildlife">
              <div className="grid md:grid-cols-3 gap-4">
                {wildlifeImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-sm text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="culture">
              <div className="grid md:grid-cols-3 gap-4">
                {cultureImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-sm text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-white/70 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Gallery;
