# named-zustand-store

## Why named store

[Zustand](https://github.com/pmndrs/zustand) store is awesome, it's very friendly. By default, the store context is global for the whole app, so each store only has one instance and all components connected to it are synced. To scope the syncing, so components within a group are synced and independant among different groups, zustand also provides [`Context+Provider`](https://github.com/pmndrs/zustand#react-context). However, using `<Provider></Provider>` to scope a group of synced components constrains the layout design, it can not handle cases when layout is more dynamic thus cannot be predetermined.

Using a named store can free the layout design from the underhood data syncing. To achieve this we create vanilla external stores for each name and track them. This repo shows an example of the idea. *Note: Right now there is no gabbage collection of these stores, once a store is instantiated and even if all components connected to it are unmounted or destroyed, the store still sits in the memory.*


## Implement a named store

ref: `src/stores/testerStore.tsx`

1. Define the store's data interface `StoreStateData` and its default values `storeStateDataDefault`
2. Add the store's methods `StoreState` and define its instantiation method `createStoreFromData`
3. Create `useStore` using `newUseStore` method (`useStore` is not a hook as all the stores are vanilla stores outside of react context)
4. Export `StoreStateData`, `StoreState` and `useStore` as `NamedStoreStateData`, `NamedStoreState`, `useNamedStore`

## Use the named store

ref: `src/components/Tester/Tester.tsx`

In the component implementation, get the named store (it will create the store if not existed) by `useNamedStore(name, data, force)`, seting `force` to be ture if you wanna reset the store with new data. Use Zustand's `useStore` method to slice/select the named store for the component.

*Note: Since all stores are external stores outside of react context, so they won't be instantiated/destroyed automatically with mount/unmount of components. If you want that behavior, then you can detect the first mount inside the component and reset the store.*

## Storybook

ref: `src/components/Tester/Tester.stories.tsx`

`yarn storybook` and play with it.
