import { createContext } from 'react';
import { createStore, State, StoreApi } from 'zustand';
import { newUseStore } from './factory';

interface StoreStateData extends State {
  text: string;
}

const storeStateDataDefault = {
  text: 'hello store',
};

interface StoreState extends StoreStateData {
  setText: (t: string) => void;
}

const createStoreFromData = (data: StoreStateData | null) =>
  createStore<StoreState>((set) => ({
    ...(data || storeStateDataDefault),
    setText: (t: string) => set({ text: t }),
  }));

const storeStateDefault = createStoreFromData(storeStateDataDefault);

const StoreContext = createContext<StoreApi<StoreState>>(storeStateDefault);

const useStore = newUseStore<StoreState>(createStoreFromData);

export {
  StoreContext as TesterStoreContext,
  StoreState as TesterStoreState,
  StoreStateData as TesterStoreStateData,
  useStore as useTesterStore,
};
