import { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

interface Moment {
  message: string;
}

const getImageCandidates = (cardNumber: number) => {
  const formats = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

  return formats.flatMap((format) => [
    `/moment-${cardNumber}.${format}`,
    `/moment${cardNumber}.${format}`,
    `/moments/moment-${cardNumber}.${format}`,
    `/moments/moment${cardNumber}.${format}`,
  ]);
};

const MomentImage = ({ cardNumber }: { cardNumber: number }) => {
  const imageCandidates = getImageCandidates(cardNumber);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    if (candidateIndex < imageCandidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
      return;
    }

    setShowFallback(true);
  };

  return (
    <>
      <img
        src={imageCandidates[candidateIndex]}
        alt={`Moment ${cardNumber}`}
        className={`w-full h-full object-cover ${showFallback ? 'hidden' : ''}`}
        onError={handleImageError}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-lavender/20 flex flex-col items-center justify-center text-foreground ${
          showFallback ? 'flex' : 'hidden'
        }`}
      >
        <Camera className="w-12 h-12 mb-2" />
        <span className="text-sm">Photo {cardNumber}</span>
        <span className="text-xs mt-1 text-center px-2">
          Add: public/moment-{cardNumber}.jpg (or .png/.jpeg/.webp)
        </span>
      </div>
    </>
  );
};

const CapturedMoments = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFlip = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter((i) => i !== index));
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };

  // ============================================
  // 📸 CUSTOMIZE YOUR MOMENTS HERE:
  // Upload files in public/ as moment-1.jpg ... moment-6.jpg
  // ============================================
  const moments: Moment[] = [
    {
      message: 'The day we first met... my heart knew you were special ❤️',
    },
    {
      message: 'Your smile makes everything better 🌟',
    },
    {
      message: 'Adventures with you are my favorite 🌈',
    },
    {
      message: 'Every moment with you is precious 💫',
    },
    {
      message: 'You make my world complete 🌸',
    },
    {
      message: 'Forever grateful for us 💕',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 py-20"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Camera className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-romantic text-3xl md:text-4xl text-foreground">
          Captured Moments 📸
        </h2>
        <p className="text-muted-foreground mt-2">Click to flip and see the memory</p>
      </div>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {moments.map((moment, index) => (
          <div
            key={index}
            className={`perspective-1000 cursor-pointer transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100 + 200}ms` }}
            onClick={() => handleFlip(index)}
          >
            <div
              className={`relative w-full aspect-[4/3] preserve-3d transition-transform duration-700 ${
                flippedCards.includes(index) ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front - Image */}
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-soft hover:shadow-romantic transition-shadow duration-300">
                <div className="w-full h-full bg-gradient-to-br from-muted to-lavender-light flex items-center justify-center">
                  <MomentImage cardNumber={index + 1} />
                </div>
                <div className="absolute bottom-3 right-3 text-xs text-card/80 bg-foreground/30 backdrop-blur-sm px-2 py-1 rounded-full">
                  Tap to flip
                </div>
              </div>

              {/* Back - Message */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/90 to-lavender/90 p-6 flex items-center justify-center">
                  <p className="font-cursive text-xl md:text-2xl text-primary-foreground text-center leading-relaxed">
                    {moment.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CapturedMoments;
