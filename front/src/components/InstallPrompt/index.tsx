import { useEffect, useState } from 'react';
import { usePWAInstall } from 'react-use-pwa-install';
import { useTranslation } from '~/hooks/useTranslation';

export const InstallPrompt = () => {
  const { translate } = useTranslation();
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
    <div className="bg-zinc-900 text-white fixed bottom-0 right-0 m-5 p-4 shadow-lg rounded-lg">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <span className="text-center">📲 {translate('INSTALL_MESSAGE')}</span>
        <button
          onClick={handleInstall}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {translate('INSTALL_NOW')}
        </button>
      </div>
    </div>
  );
};
