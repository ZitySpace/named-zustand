import { useStore } from 'zustand';
import createStore, {
  StateCreator,
  StoreApi,
  StoreMutatorIdentifier,
  Mutate,
} from 'zustand/vanilla';

const storePool: {
  [key: string]: StoreApi<any>;
} = {};

type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

type WithReact<S extends StoreApi<unknown>> = S & {
  getServerState?: () => ExtractState<S>;
};

export type UseNamedStore<S extends WithReact<StoreApi<unknown>>> = {
  (name: string): ExtractState<S>;
  <U>(
    name: string,
    selector: (state: ExtractState<S>) => U,
    equals?: (a: U, b: U) => boolean
  ): U;
} & S;

type CreateNamed = {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ): UseNamedStore<Mutate<StoreApi<T>, Mos>>;
  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ) => UseNamedStore<Mutate<StoreApi<T>, Mos>>;
  <S extends StoreApi<unknown>>(store: S): UseNamedStore<S>;
};

const createNamedImpl = <T>(createState: StateCreator<T, [], []>) => {
  const useNamedStore: any = (
    name: string,
    selector?: any,
    equalityFn?: any
  ) => {
    let api: StoreApi<T>;

    if (!storePool.hasOwnProperty(name)) {
      api =
        typeof createState === 'function'
          ? createStore(createState)
          : createState;

      Object.assign(useNamedStore, api);
      storePool[name] = api;
    } else {
      // note: havn't found a good way to detect invalid
      // access of stores created by other state creators,
      // because can't differenciate it from a normal store
      // refetch during hot module reloading.
      // Unless there is a way to compare types of createState.

      api = storePool[name];
    }

    return useStore(api, selector, equalityFn);
  };

  return useNamedStore;
};

const createNamed = (<T>(createState: StateCreator<T, [], []> | undefined) =>
  createState ? createNamedImpl(createState) : createNamedImpl) as CreateNamed;

export { createNamed };
