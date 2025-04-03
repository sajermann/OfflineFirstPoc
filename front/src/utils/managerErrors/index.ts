import { AxiosError } from 'axios';
import { useToast } from '~/hooks/useToast';

type Props = {
  status: number;
  data: {
    message: unknown;
  };
};

type TMessageBack = {
  property: string;
  errors: string[];
};

export function managerErrors({ response }: AxiosError) {
  const { customToast } = useToast();
  const { status, data } = response as Props;
  let errorString = '';
  const objectWithErrors = Object.values(data.message as TMessageBack[]);
  for (const item of objectWithErrors) {
    errorString += `. ${item.errors.join(', ')}`;
  }

  if (status === 400) {
    customToast(errorString.substring(2), {
      type: 'error',
      id: 'ERROR_BAD_REQUEST',
    });
  }
}
