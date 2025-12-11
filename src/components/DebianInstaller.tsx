import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DebianInstallerProps {
  onInstallComplete?: () => void;
}

const DebianInstaller = ({ onInstallComplete }: DebianInstallerProps) => {
  const [stage, setStage] = useState<'warning' | 'loading' | 'language' | 'installing' | 'complete'>('warning');
  const [progress, setProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    if (stage === 'loading') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStage('language'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }

    if (stage === 'installing') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setStage('complete');
              if (onInstallComplete) {
                setTimeout(() => onInstallComplete(), 2000);
              }
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [stage]);

  const startInstallation = () => {
    setStage('loading');
    setProgress(0);
  };

  const selectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setTimeout(() => {
      setStage('installing');
      setProgress(0);
    }, 500);
  };

  return (
    <div className="min-h-[600px] bg-[#dc143c] flex items-center justify-center p-6">
      {stage === 'warning' && (
        <div className="text-center animate-fade-in">
          <div className="text-8xl mb-6">🌀</div>
          <div className="bg-[#dc143c] border-4 border-white rounded-lg p-8 max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Debian Installer</h2>
            <p className="text-white text-xl mb-6">
              Debian установщик перезагрузит систему.
            </p>
            <Button
              onClick={startInstallation}
              className="w-full bg-white text-[#dc143c] hover:bg-gray-100 text-lg py-6"
            >
              Продолжить
            </Button>
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <div className="text-center animate-fade-in w-full max-w-md">
          <div className="text-8xl mb-8 animate-pulse">🌀</div>
          <h2 className="text-3xl font-bold text-white mb-6">Debian</h2>
          <Progress value={progress} className="h-4 bg-white/30" />
          <p className="text-white mt-4">Загрузка... {progress}%</p>
        </div>
      )}

      {stage === 'language' && (
        <div className="bg-[#dc143c] border-4 border-white rounded-lg p-8 max-w-md animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">🌀</div>
            <h2 className="text-2xl font-bold text-white">Debian Installer</h2>
          </div>
          <p className="text-white mb-6">Выберите язык установки:</p>
          <div className="space-y-3">
            {['Русский', 'English', 'Deutsch', 'Français'].map((lang) => (
              <Button
                key={lang}
                onClick={() => selectLanguage(lang)}
                className="w-full bg-white text-[#dc143c] hover:bg-gray-100"
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>
      )}

      {stage === 'installing' && (
        <div className="text-center animate-fade-in w-full max-w-md">
          <div className="text-8xl mb-8 animate-spin">🌀</div>
          <h2 className="text-3xl font-bold text-white mb-6">Установка Debian</h2>
          <Progress value={progress} className="h-4 bg-white/30" />
          <p className="text-white mt-4">Установка системы... {progress}%</p>
        </div>
      )}

      {stage === 'complete' && (
        <div className="text-center animate-fade-in">
          <div className="text-8xl mb-6">✅</div>
          <h2 className="text-3xl font-bold text-white mb-4">Установка завершена!</h2>
          <p className="text-white text-xl">Debian успешно установлен</p>
        </div>
      )}
    </div>
  );
};

export default DebianInstaller;