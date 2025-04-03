import { NetworkStatus } from '../NetworkStatus';
import { SelectLanguage } from '../SelectLanguage';
import { ToggleDarkMode } from '../ToggleDarkMode';

export function Header() {
  return (
    <header className="bg-slate-900 flex justify-center items-center p-4 gap-2	text-white flex-wrap xm:justify-between">
      <h1 className="font-bold text-2xl">Offline First Poc - Burno</h1>
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <NetworkStatus />
        <ToggleDarkMode />
        <SelectLanguage />
      </div>
    </header>
  );
}
