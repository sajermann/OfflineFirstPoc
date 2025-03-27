import { useEffect, useState } from 'react';
import { usePWAInstall } from 'react-use-pwa-install';

export const InstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const install = usePWAInstall();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!install) {
      return;
    }
    try {
      const userChoice = await install();
      console.log('User choice:', userChoice);
      setIsVisible(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-zinc-900 fixed bottom-0 right-0 m-4 p-4  shadow-lg rounded-lg">
      <div className="flex items-center gap-4">
        <span>📲 Instalar nosso app para melhor experiência!</span>
        <button
          onClick={handleInstall}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Instalar Agora
        </button>
      </div>
    </div>
  );
};
