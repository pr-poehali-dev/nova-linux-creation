import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DebianOSProps {
  onShutdown: () => void;
}

const DebianOS = ({ onShutdown }: DebianOSProps) => {
  const [apps, setApps] = useState([
    { name: 'Терминал', icon: 'Terminal', color: 'text-primary' },
    { name: 'Файлы', icon: 'Folder', color: 'text-primary' },
    { name: 'Firefox', icon: 'Globe', color: 'text-primary' },
    { name: 'Настройки', icon: 'Settings', color: 'text-primary' },
  ]);

  return (
    <div className="h-screen w-screen bg-[#dc143c] flex flex-col">
      <div className="h-12 bg-[#a00000] border-b-2 border-white/20 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🌀</div>
          <span className="text-white font-bold text-lg">Debian 12</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Пользователь: admin</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onShutdown}
            className="text-white hover:bg-white/20"
          >
            <Icon name="Power" size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="grid grid-cols-4 gap-6">
          {apps.map((app) => (
            <button
              key={app.name}
              className="flex flex-col items-center gap-2 p-6 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="text-white">
                <Icon name={app.icon} size={64} />
              </div>
              <span className="text-white font-medium">{app.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <h2 className="text-white text-2xl font-bold mb-4">Добро пожаловать в Debian!</h2>
          <p className="text-white/90 mb-4">
            Debian — стабильный и надёжный дистрибутив Linux, используемый миллионами пользователей по всему миру.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded">
              <div className="text-3xl mb-2">📦</div>
              <div className="text-white font-bold">50,000+</div>
              <div className="text-white/80 text-sm">Пакетов</div>
            </div>
            <div className="p-4 bg-white/10 rounded">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-white font-bold">Безопасность</div>
              <div className="text-white/80 text-sm">Приоритет #1</div>
            </div>
            <div className="p-4 bg-white/10 rounded">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-white font-bold">Стабильность</div>
              <div className="text-white/80 text-sm">Проверенная</div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 bg-[#a00000] border-t-2 border-white/20 flex items-center justify-center">
        <span className="text-white text-sm">Debian GNU/Linux 12 (bookworm)</span>
      </div>
    </div>
  );
};

export default DebianOS;
