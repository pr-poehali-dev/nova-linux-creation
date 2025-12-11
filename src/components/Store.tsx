import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface StoreProps {
  onInstall: (distro: string) => void;
}

const Store = ({ onInstall }: StoreProps) => {
  const distros = [
    {
      name: 'Debian',
      version: '12.0',
      description: 'Стабильный и надёжный дистрибутив Linux',
      color: 'border-primary',
      textColor: 'text-primary',
      icon: '🌀',
    },
    {
      name: 'Ubuntu',
      version: '23.10',
      description: 'Популярный и удобный дистрибутив для всех',
      color: 'border-secondary',
      textColor: 'text-secondary',
      icon: '🎯',
    },
  ];

  return (
    <div className="p-6 bg-background min-h-[600px]">
      <h2 className="text-2xl font-bold text-foreground mb-6">Магазин дистрибутивов Linux</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {distros.map((distro) => (
          <Card
            key={distro.name}
            className={`p-6 border-2 ${distro.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="text-6xl">{distro.icon}</div>
              <h3 className={`text-2xl font-bold ${distro.textColor}`}>
                {distro.name}
              </h3>
              <p className="text-sm text-muted-foreground">Версия {distro.version}</p>
              <p className="text-foreground">{distro.description}</p>
              
              <Button
                onClick={() => onInstall(distro.name.toLowerCase())}
                className={`w-full ${
                  distro.name === 'Debian'
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-secondary hover:bg-secondary/90'
                }`}
              >
                Скачать и установить
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Store;
