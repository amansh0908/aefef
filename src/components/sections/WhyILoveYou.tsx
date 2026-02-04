import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import confetti from 'canvas-confetti';

const WhyILoveYou = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ============================================
  // ❤️ CUSTOMIZE YOUR REASONS HERE:
  // ============================================
  const reasons = [
    "Your smile lights up my entire world 🌟",
    "The way you laugh makes my heart skip a beat 💓",
    "You understand me like no one else does 💫",
    "Your kindness inspires me every day ✨",
    "Being with you feels like coming home 🏠",
    "You make even ordinary moments feel magical 🌈",
    "Your strength and courage amaze me 💪",
    "The way you care about others so deeply 💕",
    "You bring out the best version of me 🌸",
    "Every day with you is a blessing 🙏",
  ];

  const handleClick = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const colors = ['#f9a8d4', '#fda4af', '#fb7185', '#e879f9'];
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors,
    });
  };

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
        <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-4" />
        <h2 className="font-romantic text-3xl md:text-4xl text-foreground">
          Why I Love You ❤️
        </h2>
      </div>

      {/* Click Button */}
      <div
        className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <Button
          onClick={handleClick}
          size="lg"
          className="px-10 py-8 text-xl rounded-full bg-gradient-to-r from-primary to-lavender text-primary-foreground shadow-romantic hover:shadow-glow transition-all duration-300 hover:scale-105 animate-pulse-glow"
        >
          Click To Feel Loved 💖
        </Button>
      </div>

      {/* Love Message Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-rose-light border-primary/30 shadow-romantic">
          <DialogTitle className="sr-only">Why I Love You</DialogTitle>
          <div className="flex flex-col items-center py-8">
            {/* Animated Hearts */}
            <div className="relative mb-6">
              <Heart className="w-16 h-16 text-primary fill-primary animate-pulse" />
              <Heart
                className="absolute -top-2 -right-2 w-6 h-6 text-primary/60 fill-primary/60 animate-sparkle"
                style={{ animationDelay: '0.3s' }}
              />
              <Heart
                className="absolute -bottom-1 -left-2 w-5 h-5 text-primary/50 fill-primary/50 animate-sparkle"
                style={{ animationDelay: '0.6s' }}
              />
            </div>

            {/* Reason */}
            <p className="font-cursive text-2xl md:text-3xl text-foreground text-center leading-relaxed mb-8 min-h-[80px] flex items-center">
              {reasons[currentIndex]}
            </p>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              variant="outline"
              size="lg"
              className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              Show Me More Love 💕
            </Button>

            {/* Counter */}
            <p className="text-sm text-muted-foreground mt-4">
              {currentIndex + 1} of {reasons.length} reasons
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WhyILoveYou;
