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
      content: `My Sweet Shahin,

I'm so sorry you're feeling down right now. 
I wish I could be there to hold you tight.

Remember this: Storms don't last forever. 
The rain will stop, and the sun will shine again.

You are stronger than you know, braver than you believe, 
and more loved than you could ever imagine.

Here's a virtual hug from me: 🤗

Take a deep breath. Make yourself some tea. 
Play your favorite song. And know that tomorrow 
will be brighter.

I believe in you, always.

With endless love,
Aman 💕`,
    },
    {
      title: "Open When You're Happy",
      emoji: '🎉',
      color: 'from-peach/80 to-gold/60',
      content: `My Wonderful Shahin!

You're happy! That makes ME so incredibly happy too! 🎊

Your happiness is the most beautiful thing in the world 
to me. Seeing you smile, hearing you laugh - these are 
the moments I live for.

Whatever is making you happy right now, I hope you 
treasure this feeling. You deserve all the happiness 
in the universe!

Keep shining, keep smiling, keep being the amazing 
person you are. You light up my life every single day.

Celebrating your joy with you!

All my love,
Aman 🌟`,
    },
    {
      title: "Open When You Can't Sleep",
      emoji: '🌙',
      color: 'from-lavender/80 to-muted/80',
      content: `My Darling Shahin,

Can't sleep? Let me keep you company with my words.

Close your eyes and imagine we're lying under the stars. 
Feel the gentle breeze. Hear the peaceful silence. 
I'm right there beside you.

Think of all the dreams we have together - all the 
adventures waiting for us, all the memories we'll create.

Count the reasons why tomorrow will be beautiful. 
One... you'll wake up and I'll still love you. 
Two... there's coffee waiting. 
Three... we have each other.

Now take slow, deep breaths. 
In... 2... 3... 4...
Out... 2... 3... 4...

Sweet dreams, my love. I'll see you there.

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
        <p className="text-muted-foreground mt-2">Click a letter when the moment feels right</p>
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
              <h3 className="font-romantic text-xl text-primary-foreground pr-12 group-hover:text-card transition-colors duration-300">
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
                  <h3 className="font-romantic text-2xl text-foreground">
                    {letters[selectedLetter].title}
                  </h3>
                </div>
              </div>

              {/* Letter Content */}
              <div className="paper-texture rounded-xl p-6">
                <pre className="font-cursive text-lg text-foreground whitespace-pre-wrap leading-relaxed">
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
