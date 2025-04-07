import { Form } from '~/components/Form';
import { InstallPrompt } from '~/components/InstallPrompt';
import { Table } from '~/components/Table';
import { useData } from '~/hooks/useData';

export default function Home() {
  const { list, listToSync, setListToSync } = useData();

  return (
    <div className="flex flex-col max-w-2xl m-auto my-3 p-3 rounded dark:bg-slate-900 ">
      <InstallPrompt />
      <Form onAdd={e => setListToSync(prev => [...prev, { ...e }])} />
      <div className="border rounded p-2 w-full overflow-auto max-h-[69vh]">
        <Table data={[...listToSync, ...list]} />
      </div>
    </div>
  );
}
