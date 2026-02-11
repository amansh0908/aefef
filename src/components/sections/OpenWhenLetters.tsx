import { useState, useEffect, useRef } from 'react';
import { Mail, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const OpenWhenLetters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
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

  // ============================================
  // ✉️ CUSTOMIZE YOUR LETTERS HERE:
  // ============================================
  const letters = [
    {
      title: 'Open When You Miss Me',
      emoji: '💭',
      color: 'from-primary/80 to-lavender/80',
      content: `
      Remember that I am always with you in spirit.
      Close your eyes and feel my hug. I love you! ❤️
      Forever yours,
      Aman ❤️`,
    },
    {
      title: "Open When You're Sad",
      emoji: '🌧️',
      color: 'from-lavender/80 to-primary/80',
      content: `
      My Sweet Shahin,
      It's okay to be sad sometimes. I'm here for you.
      Take a deep breath, and know that this too shall pass.
      You are strong and loved.
      With endless love,
      Aman 💕`,
    },
    {
      title: "Open When You're Happy",
      emoji: '🎉',
      color: 'from-peach/80 to-gold/60',
      content: `
      My Wonderful Shahin!
      Yay! I'm so happy that you're happy!
      Keep smiling, it looks beautiful on you. 😊
      All my love,
      Aman 🌟`,
    },
    {
      title: "Open When You Can't Sleep",
      emoji: '🌙',
      color: 'from-lavender/80 to-muted/80',
      content: `
      My Darling Shahin,
      Count our memories instead of sheep.
      Think of our best dates and how much fun we have. 
      Sweet dreams my love. 🌙
      Goodnight, beautiful.
      Aman 💤`,
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
        <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-romantic text-3xl md:text-4xl text-foreground">
          Open When… ✉️
        </h2>
        <p className="text-[#5b3441] mt-2">Click a letter when the moment feels right</p>
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`group cursor-pointer transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150 + 200}ms` }}
            onClick={() => setSelectedLetter(index)}
          >
            {/* Postcard Style */}
            <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${letter.color} shadow-soft hover:shadow-romantic transition-all duration-300 hover:scale-[1.02] hover:-rotate-1`}>
              {/* Stamp Effect */}
              <div className="absolute top-3 right-3 w-10 h-10 rounded border-2 border-dashed border-card/40 flex items-center justify-center">
                <span className="text-lg">{letter.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="font-romantic text-xl text-[#2f1821] pr-12 transition-colors duration-300">
                {letter.title}
              </h3>

              {/* Decorative Line */}
              <div className="mt-4 h-0.5 w-16 bg-card/30 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Letter Modal */}
      <Dialog open={selectedLetter !== null} onOpenChange={() => setSelectedLetter(null)}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto bg-gradient-to-br from-cream to-card border-primary/20 shadow-romantic">
          <DialogTitle className="sr-only">
            {selectedLetter !== null ? letters[selectedLetter].title : 'Letter'}
          </DialogTitle>
          {selectedLetter !== null && (
            <div className="py-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{letters[selectedLetter].emoji}</span>
                  <h3 className="font-romantic text-2xl text-[#2f1821]">
                    {letters[selectedLetter].title}
                  </h3>
                </div>
              </div>

              {/* Letter Content */}
              <div className="paper-texture rounded-xl p-6 border border-[#caa9b3]/40">
                <pre className="font-cursive text-lg text-[#3a1a24] whitespace-pre-wrap leading-relaxed">
                  {letters[selectedLetter].content}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OpenWhenLetters;
