import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { ProductionInfo } from '~/types/ProductionInfo';

export function Form({ onAdd }: { onAdd: (data: ProductionInfo) => void }) {
  const { translate } = useTranslation();
  const [name, setName] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  async function addToList(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const itemToAdd: ProductionInfo = {
      id: crypto.randomUUID(),
      name,
      favoriteFood,
      createdAt: new Date().toISOString(),
    };
    onAdd(itemToAdd);
    setName('');
    setFavoriteFood('');
  }
  return (
    <form
      onSubmit={addToList}
      className="gap-2 my-5 flex-wrap justify-center grid grid-cols-3"
    >
      <input
        required
        type="text"
        data-testid="inputNewItem"
        placeholder={translate('NAME')}
        value={name}
        onChange={e => setName(e.target.value)}
        className="p-1 rounded bg-transparent h-10 border outline-0 col-span-3 w-full xm:col-span-1"
      />
      <input
        required
        type="text"
        data-testid="inputNewItem"
        placeholder={translate('FAVORITE_FOOD')}
        value={favoriteFood}
        onChange={e => setFavoriteFood(e.target.value)}
        className="p-1 rounded bg-transparent h-10 border outline-0 col-span-3 w-full xm:col-span-1"
      />
      <button
        type="submit"
        className="!bg-green-600 rounded p-2 hover:!bg-green-900 transition-colors duration-500 disabled:cursor-not-allowed text-white"
      >
        {translate('ADD')}
      </button>
    </form>
  );
}
