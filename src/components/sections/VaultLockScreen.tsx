import { useState, forwardRef } from 'react';
import { Lock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VaultLockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = '27042024';

const VaultLockScreen = forwardRef<HTMLDivElement, VaultLockScreenProps>(({ onUnlock }, ref) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleKeyPress = (key: string) => {
    if (password.length < 8) {
      setPassword((prev) => prev + key);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPassword('');
    setError(false);
  };

  const handleUnlock = () => {
    if (password === CORRECT_PASSWORD) {
      setUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-light via-lavender-light to-peach transition-opacity duration-700 ${
        unlocking ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Decorative Hearts */}
      <div className="absolute top-10 left-10 animate-float-heart">
        <Heart className="w-8 h-8 text-primary/40 fill-primary/20" />
      </div>
      <div className="absolute top-20 right-16 animate-float-heart" style={{ animationDelay: '1s' }}>
        <Heart className="w-6 h-6 text-primary/30 fill-primary/15" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float-heart" style={{ animationDelay: '2s' }}>
        <Heart className="w-10 h-10 text-primary/25 fill-primary/10" />
      </div>

      {/* Main Card */}
      <div className="glass rounded-3xl p-8 md:p-12 max-w-sm w-full shadow-romantic">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow">
            <Lock className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-romantic text-3xl md:text-4xl text-center text-foreground mb-2">
          The Vault 🔐
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Enter Special Date (DDMMYYYY)
        </p>

        {/* Password Display */}
        <div
          className={`flex justify-center gap-2 mb-8 ${error ? 'animate-shake' : ''}`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-10 md:w-10 md:h-12 rounded-lg border-2 flex items-center justify-center text-xl font-medium transition-all duration-200 ${
                password[i]
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-card'
              } ${error ? 'border-destructive' : ''}`}
            >
              {password[i] ? '❤️' : ''}
            </div>
          ))}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {keys.map((key) => (
            <Button
              key={key}
              variant="ghost"
              onClick={() => {
                if (key === 'C') handleClear();
                else if (key === '⌫') handleDelete();
                else handleKeyPress(key);
              }}
              className={`h-14 text-xl font-medium rounded-xl transition-all duration-200 ${
                key === 'C'
                  ? 'text-muted-foreground hover:text-foreground'
                  : key === '⌫'
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {key}
            </Button>
          ))}
        </div>

        {/* Unlock Button */}
        <Button
          onClick={handleUnlock}
          disabled={password.length !== 8}
          className="w-full h-14 rounded-xl text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft transition-all duration-300 hover:shadow-romantic disabled:opacity-50"
        >
          Unlock Gift 💖
        </Button>
      </div>
    </div>
  );
});

VaultLockScreen.displayName = 'VaultLockScreen';

export default VaultLockScreen;
