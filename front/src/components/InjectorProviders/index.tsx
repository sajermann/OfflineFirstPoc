import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { DarkModeProvider } from '~/hooks/useDarkMode';
import { TestProvider } from '~/hooks/useTest';
import { Header } from '../Header';

import '~/config/i18n';
import { ToastContainer } from 'react-toastify';

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Lógica para notificar o usuário sobre a atualização disponível
    console.log('Nova versão disponível!');
  },
  onOfflineReady() {
    // Lógica para quando o app estiver pronto para uso offline
    console.log('Pronto para uso offline');
  },
});

// Função para verificar atualizações periodicamente
function checkForUpdates() {
  updateSW();
}

// Verificar atualizações a cada 5 minutos
setInterval(checkForUpdates, 5 * 60 * 1000);

// Também pode verificar em momentos específicos, como após o carregamento da página
window.addEventListener('load', checkForUpdates);

export function InjectorProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <ToastContainer className="z-50" />
        <TestProvider>
          <Header />
          {children}
        </TestProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
}
