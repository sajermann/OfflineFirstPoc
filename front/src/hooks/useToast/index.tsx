import {
  ToastContentProps,
  ToastOptions,
  toast as reactToastify,
} from 'react-toastify';
import { CustomReactToastify } from './CustomReactToastify';

export type TTypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export const COMMONS_TYPE = {
  success: 'text-success-700',
  error: 'text-error-700',
  warning: 'text-warning-700',
  info: 'text-blue-400',
  default: 'text-info-700',
};

export type TCustomReactToastify = {
  type?: TTypeOptions;
  autoClose?: number;
  id?: string;
};

export function useToast() {
  function customToast(
    msg: string,
    options?: TCustomReactToastify,
    toastContentOptions?: ToastContentProps,
    toastOptions?: ToastOptions,
  ) {
    return reactToastify(
      internalProps => (
        <CustomReactToastify
          message={msg}
          toastContentOptions={{ ...internalProps, ...toastContentOptions }}
          options={options}
        />
      ),
      {
        ...toastOptions,
        className:
          'bg-transparent backdrop-blur-md dark:text-white text-black h-full w-full border rounded-lg overflow-hidden m-1 z-[999999999]',
        // bodyClassName: 'h-full w-full p-0',
        autoClose: options?.autoClose || 3000,
        closeButton: false,
        type: options?.type,
        icon: false,
        toastId: options?.id,
      },
    );
  }

  return { customToast };
}
