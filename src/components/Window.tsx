import { ReactNode, useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface WindowProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  zIndex: number;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onMove: (position: { x: number; y: number }) => void;
}

const Window = ({ id, title, position, zIndex, children, onClose, onFocus, onMove }: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      onFocus();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 400));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 300));
        onMove({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onMove]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-card border-2 border-primary/50 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
        width: '800px',
        minHeight: '600px',
        maxHeight: '80vh',
      }}
      onMouseDown={onFocus}
    >
      <div
        className="window-header h-10 bg-muted border-b border-primary/30 flex items-center justify-between px-4 window-drag"
        onMouseDown={handleMouseDown}
      >
        <span className="text-foreground font-medium select-none">{title}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-6 w-6 hover:bg-destructive hover:text-white transition-colors"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      <div className="overflow-auto" style={{ maxHeight: 'calc(80vh - 40px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
