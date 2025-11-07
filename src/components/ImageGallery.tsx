import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  mainImage: string;
  mainAlt: string;
}

const ImageGallery = ({ images, mainImage, mainAlt }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = [{ src: mainImage, alt: mainAlt }, ...images];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(allImages[index].src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex].src);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex].src);
  };

  return (
    <>
      <div className="space-y-2 sm:space-y-4">
        {/* Main Image */}
        <div 
          className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mainImage}
            alt={mainAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm sm:text-base bg-black/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
              Click to view gallery
            </span>
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index + 1)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {index === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      +{images.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 sm:left-4 text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            onClick={prevImage}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
            <img
              src={selectedImage}
              alt={allImages[currentIndex].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-white mt-4 text-center text-sm sm:text-base px-4">
              {currentIndex + 1} / {allImages.length}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            onClick={nextImage}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
