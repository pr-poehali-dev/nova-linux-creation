import Icon from '@/components/ui/icon';

interface DesktopProps {
  onOpenApp: (title: string, component: string) => void;
}

const Desktop = ({ onOpenApp }: DesktopProps) => {
  const desktopApps = [
    { name: 'Firefox', icon: 'Globe', component: 'firefox', color: 'text-primary' },
    { name: 'Store', icon: 'ShoppingBag', component: 'store', color: 'text-secondary' },
  ];

  return (
    <div className="absolute inset-0 p-6">
      <div className="grid grid-cols-6 gap-6">
        {desktopApps.map((app) => (
          <button
            key={app.name}
            onClick={() => onOpenApp(app.name, app.component)}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/30 transition-all duration-200 hover:scale-110 group"
          >
            <div className={`${app.color} group-hover:animate-glow`}>
              <Icon name={app.icon} size={48} />
            </div>
            <span className="text-foreground text-sm font-medium">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Desktop;
