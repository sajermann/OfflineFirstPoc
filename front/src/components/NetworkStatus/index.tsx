import { useNetworkStatus } from '~/hooks/useNetworkStatus';
import { useTranslation } from '~/hooks/useTranslation';
import { Icons } from '../Icons';

export function NetworkStatus() {
  const { isOnline } = useNetworkStatus();
  const { translate } = useTranslation();

  const config = {
    true: {
      icon: 'online',
      title: translate('YOU_ARE_ONLINE'),
    },
    false: {
      icon: 'offline',
      title: translate('YOU_ARE_OFFLINE'),
    },
  };

  const isOnlineFormatted = String(isOnline) as 'true' | 'false';

  const title = config[isOnlineFormatted].title;
  const icon = config[isOnlineFormatted].icon as 'online' | 'offline';

  return (
    <div title={title}>
      <Icons nameIcon={icon} className="w-7" />
    </div>
  );
}
