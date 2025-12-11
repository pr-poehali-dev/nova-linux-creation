import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const FirefoxBrowser = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'NovaLinux', url: 'novalinux://home', active: true },
  ]);
  const [nextTabId, setNextTabId] = useState(2);
  const [currentUrl, setCurrentUrl] = useState('novalinux://home');

  const addTab = () => {
    const newTab = {
      id: nextTabId,
      title: 'Новая вкладка',
      url: 'about:blank',
      active: false,
    };
    setTabs([...tabs.map(t => ({ ...t, active: false })), { ...newTab, active: true }]);
    setNextTabId(nextTabId + 1);
    setCurrentUrl(newTab.url);
  };

  const closeTab = (id: number) => {
    const newTabs = tabs.filter(t => t.id !== id);
    if (newTabs.length === 0) {
      setTabs([{ id: nextTabId, title: 'Новая вкладка', url: 'about:blank', active: true }]);
      setNextTabId(nextTabId + 1);
    } else {
      if (tabs.find(t => t.id === id)?.active && newTabs.length > 0) {
        newTabs[0].active = true;
        setCurrentUrl(newTabs[0].url);
      }
      setTabs(newTabs);
    }
  };

  const switchTab = (id: number) => {
    const tab = tabs.find(t => t.id === id);
    if (tab) {
      setTabs(tabs.map(t => ({ ...t, active: t.id === id })));
      setCurrentUrl(tab.url);
    }
  };

  const renderContent = () => {
    if (currentUrl === 'novalinux://home') {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="text-6xl mb-6 animate-glow">🦊</div>
          <h1 className="text-4xl font-bold text-primary mb-4">Firefox в NovaLinux</h1>
          <p className="text-foreground text-lg mb-8">
            Быстрый и безопасный браузер для галактической системы
          </p>
          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
            <div className="p-4 bg-muted rounded-lg hover:bg-muted/70 transition-all">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm text-foreground">Быстрая загрузка</p>
            </div>
            <div className="p-4 bg-muted rounded-lg hover:bg-muted/70 transition-all">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-foreground">Приватность</p>
            </div>
            <div className="p-4 bg-muted rounded-lg hover:bg-muted/70 transition-all">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-foreground">Производительность</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-lg">Страница загружается...</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-2 p-2 bg-muted border-b border-border">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="ArrowLeft" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="ArrowRight" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="RotateCw" size={16} />
          </Button>
        </div>
        
        <Input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          className="flex-1 h-8"
          placeholder="Введите адрес..."
        />
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Icon name="Menu" size={16} />
        </Button>
      </div>

      <div className="flex items-center gap-1 bg-card border-b border-border px-2 py-1 overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-3 py-1 rounded-t-lg min-w-[150px] max-w-[200px] cursor-pointer transition-all ${
              tab.active
                ? 'bg-background border-t-2 border-x-2 border-primary'
                : 'bg-muted hover:bg-muted/70'
            }`}
            onClick={() => switchTab(tab.id)}
          >
            <span className="text-sm truncate flex-1">{tab.title}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 hover:bg-destructive hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={addTab}
        >
          <Icon name="Plus" size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto bg-background">
        {renderContent()}
      </div>
    </div>
  );
};

export default FirefoxBrowser;
