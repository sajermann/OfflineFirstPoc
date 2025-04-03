import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductionInfo } from '~/types/ProductionInfo';
import { useAxios } from '../useAxios';
import { useNetworkStatus } from '../useNetworkStatus';
import { useToast } from '../useToast';
import { useTranslation } from '../useTranslation';

type TPersist = {
  isLoadingSync: boolean;
  setIsLoadingSync: (date: boolean) => void;
  list: ProductionInfo[];
  setList: (
    data: ProductionInfo[] | ((prev: ProductionInfo[]) => ProductionInfo[]),
  ) => void;
  listToSync: ProductionInfo[];
  setListToSync: (
    data: ProductionInfo[] | ((prev: ProductionInfo[]) => ProductionInfo[]),
  ) => void;
};

type TStore = {
  isLoadingSync: boolean;
  setIsLoadingSync: (date: boolean) => void;
};

const useStore = create<TStore>()(set => ({
  isLoadingSync: false,
  setIsLoadingSync: (data: boolean) =>
    set(state => {
      return {
        ...state,
        isLoadingSync: data,
      };
    }),
}));

const usePersistStore = create<TPersist>()(
  persist(
    set => ({
      isLoadingSync: false,
      setIsLoadingSync: (data: boolean) =>
        set(state => {
          return {
            ...state,
            isLoadingSync: data,
          };
        }),
      list: [],
      listToSync: [],
      setList: (
        data: ProductionInfo[] | ((prev: ProductionInfo[]) => ProductionInfo[]),
      ) =>
        set(state => {
          const newList =
            typeof data === 'function' ? (data as Function)(state.list) : data;

          return {
            ...state,
            list: newList,
          };
        }),
      setListToSync: (
        data: ProductionInfo[] | ((prev: ProductionInfo[]) => ProductionInfo[]),
      ) =>
        set(state => {
          const newListToSync =
            typeof data === 'function'
              ? (data as Function)(state.listToSync)
              : data;

          return {
            ...state,
            listToSync: newListToSync,
          };
        }),
    }),
    {
      name: `${import.meta.env.VITE_APPLICATION_IDENTIFICATOR}:lists`,
    },
  ),
);

export function useData() {
  const { list, listToSync, setList, setListToSync } = usePersistStore();
  const { customToast } = useToast();
  const { translate } = useTranslation();
  const { isLoadingSync, setIsLoadingSync } = useStore();
  const { isOnline } = useNetworkStatus();
  const { fetchData } = useAxios();

  function customSort(a: ProductionInfo, b: ProductionInfo) {
    return new Date(a.syncAt || 0) > new Date(b.syncAt || 0) ? -1 : 1;
  }

  async function syncToBack() {
    setIsLoadingSync(true);
    customToast(translate(`SYNC_DATA`), { id: 'SYNC_DATA', type: 'info' });
    try {
      const response = await fetchData({
        method: 'POST',
        url: `v1/production-info/create-many`,
        data: listToSync,
      });
      if (response?.data && response?.data.length) {
        const newListSync: ProductionInfo[] = [];
        const newList: ProductionInfo[] = [...list];
        for (const item of response?.data) {
          const filter = listToSync.find(i => i.id === item.id);
          if (filter) {
            newList.push(item);
          }
          if (!filter) {
            newListSync.push(item);
          }
        }
        setListToSync(newListSync.sort(customSort));
        setList(newList.sort(customSort));
      }
    } catch {
    } finally {
      setIsLoadingSync(false);
    }
  }

  async function getList() {
    // setIsLoadingSync(true);

    try {
      const response = await fetchData({
        method: 'GET',
        url: `v1/production-info/`,
      });
      setList(response?.data || []);
    } catch {
    } finally {
      setIsLoadingSync(false);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    console.log(`useeef`, { isLoadingSync });
    if (isOnline && listToSync.length && !isLoadingSync) syncToBack();
  }, [isOnline, listToSync]);

  return {
    list,
    listToSync,
    setList,
    setListToSync,
    isLoadingSync,
    setIsLoadingSync,
  };
}
