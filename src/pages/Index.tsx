import { useState, useEffect } from 'react';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import Window from '@/components/Window';
import FirefoxBrowser from '@/components/FirefoxBrowser';
import Store from '@/components/Store';
import DebianInstaller from '@/components/DebianInstaller';
import UbuntuInstaller from '@/components/UbuntuInstaller';
import BiosScreen from '@/components/BiosScreen';
import DebianOS from '@/components/DebianOS';

export interface WindowState {
  id: string;
  title: string;
  component: string;
  isOpen: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

const Index = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [showBios, setShowBios] = useState(false);
  const [currentOS, setCurrentOS] = useState<'novalinux' | 'debian' | null>(null);
  const [installedDistros, setInstalledDistros] = useState<string[]>([]);

  useEffect(() => {
    const savedDistros = localStorage.getItem('installedDistros');
    if (savedDistros) {
      setInstalledDistros(JSON.parse(savedDistros));
    }
    const savedOS = localStorage.getItem('currentOS');
    if (savedOS === 'debian') {
      setCurrentOS('debian');
    } else {
      setCurrentOS('novalinux');
    }
  }, []);

  const openWindow = (title: string, component: string) => {
    const existingWindow = windows.find(w => w.title === title);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      title,
      component,
      isOpen: true,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      zIndex: maxZIndex + 1,
    };
    setWindows([...windows, newWindow]);
    setMaxZIndex(maxZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
    setMaxZIndex(newZIndex);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleReboot = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      setIsShuttingDown(false);
      setShowBios(true);
    }, 2000);
  };

  const handleBiosComplete = () => {
    setShowBios(false);
    if (installedDistros.includes('debian')) {
      setCurrentOS('debian');
      localStorage.setItem('currentOS', 'debian');
    } else {
      setCurrentOS('novalinux');
    }
  };

  const handleDebianInstalled = () => {
    const newDistros = [...installedDistros, 'debian'];
    setInstalledDistros(newDistros);
    localStorage.setItem('installedDistros', JSON.stringify(newDistros));
    setTimeout(() => {
      setIsShuttingDown(true);
      setTimeout(() => {
        setIsShuttingDown(false);
        setShowBios(true);
      }, 2000);
    }, 2000);
  };

  const renderWindowContent = (component: string) => {
    switch (component) {
      case 'firefox':
        return <FirefoxBrowser />;
      case 'store':
        return <Store onInstall={(distro) => {
          if (distro === 'debian') {
            openWindow('Debian Installer', 'debian-installer');
          } else if (distro === 'ubuntu') {
            openWindow('Ubuntu Installer', 'ubuntu-installer');
          }
        }} />;
      case 'debian-installer':
        return <DebianInstaller onInstallComplete={handleDebianInstalled} />;
      case 'ubuntu-installer':
        return <UbuntuInstaller />;
      default:
        return <div className="p-4 text-foreground">Unknown application</div>;
    }
  };

  if (showBios) {
    return <BiosScreen onBoot={handleBiosComplete} />;
  }

  if (currentOS === 'debian') {
    return <DebianOS onShutdown={() => {
      setCurrentOS('novalinux');
      localStorage.setItem('currentOS', 'novalinux');
    }} />;
  }

  if (isShuttingDown) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-4xl font-bold text-primary mb-4 animate-glow">NovaLinux</div>
          <div className="text-foreground text-lg">Перезагрузка системы...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <Desktop onOpenApp={openWindow} />
      
      {windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          position={window.position}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          onMove={(position) => updateWindowPosition(window.id, position)}
        >
          {renderWindowContent(window.component)}
        </Window>
      ))}

      <Taskbar 
        onOpenApp={openWindow}
        onShutdown={handleShutdown}
        onReboot={handleReboot}
      />
    </div>
  );
};

export default Index;