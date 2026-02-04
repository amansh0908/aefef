import { useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import MusicPlayer from '@/components/MusicPlayer';
import VaultLockScreen from '@/components/sections/VaultLockScreen';
import MainReveal from '@/components/sections/MainReveal';
import EnvelopeLetter from '@/components/sections/EnvelopeLetter';
import HowItBegan from '@/components/sections/HowItBegan';
import CapturedMoments from '@/components/sections/CapturedMoments';
import WhyILoveYou from '@/components/sections/WhyILoveYou';
import OpenWhenLetters from '@/components/sections/OpenWhenLetters';
import FinalSurprise from '@/components/sections/FinalSurprise';

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <VaultLockScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-light via-lavender-light to-peach relative overflow-x-hidden">
      {/* Global Background Elements */}
      <FloatingHearts />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-love-pattern opacity-30 pointer-events-none z-0" />
      
      {/* Music Player */}
      <MusicPlayer />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Section 2: Main Reveal */}
        <MainReveal />

        {/* Section 3: Envelope Love Letter */}
        <EnvelopeLetter />

        {/* Section 4: How It All Began */}
        <HowItBegan />

        {/* Section 5: Captured Moments */}
        <CapturedMoments />

        {/* Section 6: Why I Love You */}
        <WhyILoveYou />

        {/* Section 7: Open When Letters */}
        <OpenWhenLetters />

        {/* Section 8: Final Surprise */}
        <FinalSurprise />

        {/* Footer */}
        <footer className="py-12 text-center text-muted-foreground">
          <p className="font-cursive text-2xl text-primary">Made with love 💕</p>
          <p className="text-sm mt-2">Aman ❤️ Shahin</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
