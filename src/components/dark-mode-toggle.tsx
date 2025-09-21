'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <Button variant={'ghost'} onClick={() => toggleTheme()}>
      {theme === 'light' ? (
        <MoonIcon className="size-5" strokeWidth={1} />
      ) : (
        <SunIcon className="size-5" strokeWidth={1} />
      )}
    </Button>
  ) : (
    <></>
  );
}
