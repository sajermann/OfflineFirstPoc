import { useCallback, useEffect, useRef, useState } from 'react';

type Callback = () => void;

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const onlineCallbacks = useRef<Callback[]>([]);
  const offlineCallbacks = useRef<Callback[]>([]);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    onlineCallbacks.current.forEach(cb => cb());
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    offlineCallbacks.current.forEach(cb => cb());
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  const onOnline = useCallback((callback: Callback) => {
    onlineCallbacks.current.push(callback);
    return () => {
      onlineCallbacks.current = onlineCallbacks.current.filter(
        cb => cb !== callback,
      );
    };
  }, []);

  const onOffline = useCallback((callback: Callback) => {
    offlineCallbacks.current.push(callback);
    return () => {
      offlineCallbacks.current = offlineCallbacks.current.filter(
        cb => cb !== callback,
      );
    };
  }, []);

  return {
    isOnline,
    onOnline,
    onOffline,
  };
};
