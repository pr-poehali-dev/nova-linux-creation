import { useState, useEffect } from 'react';

interface BiosScreenProps {
  onBoot: () => void;
}

const BiosScreen = ({ onBoot }: BiosScreenProps) => {
  const [countdown, setCountdown] = useState(15);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'y') {
        setShowPrompt(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onBoot();
    }
  }, [countdown, onBoot]);

  return (
    <div className="h-screen w-screen bg-black text-green-400 font-mono p-8 overflow-auto">
      <div className="space-y-2 text-sm animate-fade-in">
        <div className="text-xl mb-4 text-primary">NovaLinux BIOS v1.0</div>
        <div>CPU: Galactic Core i9-9000 @ 5.0GHz</div>
        <div>Memory: 32GB DDR5-6000</div>
        <div>Storage: 2TB NVMe SSD</div>
        <div className="my-4 border-t border-green-400/30 pt-4">
          <div>Checking boot devices...</div>
          <div className="ml-4">✓ NovaLinux System Drive</div>
          <div className="ml-4">✓ Debian Installation Found</div>
          <div className="ml-4">✓ Ubuntu Installation Found</div>
        </div>
        
        {showPrompt && (
          <div className="mt-6 p-4 border border-primary animate-pulse">
            <div className="text-primary text-lg mb-2">Press Y to enter BIOS Setup</div>
            <div className="text-foreground">Booting in {countdown} seconds...</div>
          </div>
        )}

        {!showPrompt && (
          <div className="mt-6 space-y-2 animate-fade-in">
            <div className="text-primary text-xl mb-4">╔═══ BIOS SETUP ═══╗</div>
            <div className="ml-4">System Information</div>
            <div className="ml-4">Boot Order Configuration</div>
            <div className="ml-4">Advanced Settings</div>
            <div className="ml-4">Security Settings</div>
            <div className="ml-4">Exit & Save</div>
            <div className="mt-6 text-muted-foreground">
              (BIOS Setup interface - Press ESC to continue boot)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiosScreen;