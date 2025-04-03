import { useTranslation } from '~/hooks/useTranslation';
import { ProductionInfo } from '~/types/ProductionInfo';
import { formatDateAndHour } from '~/utils/formatDate';

export function Table({ data }: { data: ProductionInfo[] }) {
  const { translate } = useTranslation();
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>{translate('NAME')}</th>
          <th>{translate('FAVORITE_FOOD')}</th>
          <th>{translate('CREATED_AT')}</th>
          <th>{translate('SYNC_AT')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td className="text-center">{item.name}</td>
            <td className="text-center">{item.favoriteFood}</td>
            <td className="text-center">{formatDateAndHour(item.createdAt)}</td>
            <td className="text-center">{formatDateAndHour(item.syncAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
