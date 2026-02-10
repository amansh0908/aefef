import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const MusicPlayer = ({ autoPlay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAutoPlayed = useRef(false);

  const handleToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (autoPlay && !hasAutoPlayed.current && audioRef.current) {
      hasAutoPlayed.current = true;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, [autoPlay]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        // 🎵 Replace with your music file path:
        src="/romantic-music.mp3"
        preload="auto"
      />
      <Button
        onClick={handleToggle}
        size="icon"
        className="rounded-full w-14 h-14 bg-card/90 backdrop-blur-sm border border-primary/30 shadow-romantic hover:shadow-glow transition-all duration-300"
        variant="ghost"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-primary" />
        ) : (
          <div className="relative">
            <Music className="w-6 h-6 text-primary" />
            <Play className="w-3 h-3 text-primary absolute -right-1 -bottom-1" />
          </div>
        )}
      </Button>
      <span className="absolute -top-8 right-0 text-xs text-muted-foreground whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </span>
    </div>
  );
};

export default MusicPlayer;
