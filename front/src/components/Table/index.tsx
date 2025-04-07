import { useTranslation } from '~/hooks/useTranslation';
import { ProductionInfo } from '~/types/ProductionInfo';
import { formatDateAndHour } from '~/utils/formatDate';

export function Table({ data }: { data: ProductionInfo[] }) {
  const { translate } = useTranslation();
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-center whitespace-nowrap">{translate('NAME')}</th>
          <th className="text-center whitespace-nowrap">
            {translate('FAVORITE_FOOD')}
          </th>
          <th className="text-center whitespace-nowrap">
            {translate('CREATED_AT')}
          </th>
          <th className="text-center whitespace-nowrap">
            {translate('SYNC_AT')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td className="text-center whitespace-nowrap">{item.name}</td>
            <td className="text-center whitespace-nowrap">
              {item.favoriteFood}
            </td>
            <td className="text-center whitespace-nowrap">
              {formatDateAndHour(item.createdAt)}
            </td>
            <td className="text-center whitespace-nowrap">
              {formatDateAndHour(item.syncAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
