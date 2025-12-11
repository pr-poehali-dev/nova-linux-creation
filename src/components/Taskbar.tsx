import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskbarProps {
  onOpenApp: (title: string, component: string) => void;
  onShutdown: () => void;
  onReboot: () => void;
}

const Taskbar = ({ onOpenApp, onShutdown, onReboot }: TaskbarProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-card border-t-2 border-primary/50 flex items-center justify-between px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-primary animate-glow">
          NovaLinux
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenApp('Firefox', 'firefox')}
          className="text-foreground hover:text-primary hover:bg-muted"
        >
          <Icon name="Globe" size={24} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenApp('Store', 'store')}
          className="text-foreground hover:text-secondary hover:bg-muted"
        >
          <Icon name="ShoppingBag" size={24} />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-primary hover:bg-muted"
          >
            <Icon name="Power" size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-primary/50">
          <DropdownMenuItem onClick={onReboot} className="cursor-pointer">
            <Icon name="RotateCw" size={16} className="mr-2" />
            Перезагрузить
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShutdown} className="cursor-pointer">
            <Icon name="Power" size={16} className="mr-2" />
            Выключить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Taskbar;
