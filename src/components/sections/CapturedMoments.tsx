import { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

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
  // Replace placeholder images in public folder
  // ============================================
  const moments = [
    {
      image: '/moment-1.jpg',
      message: 'The day we first met... my heart knew you were special ❤️',
    },
    {
      image: '/moment-2.jpg',
      message: 'Your smile makes everything better 🌟',
    },
    {
      image: '/moment-3.jpg',
      message: 'Adventures with you are my favorite 🌈',
    },
    {
      image: '/moment-4.jpg',
      message: 'Every moment with you is precious 💫',
    },
    {
      image: '/moment-5.jpg',
      message: 'You make my world complete 🌸',
    },
    {
      image: '/moment-6.jpg',
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
              <img
                    src={moment.image}
                    alt={`Moment ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
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
