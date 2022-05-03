import React, { useEffect, useRef } from 'react';
import { useStore, StoreApi } from 'zustand';
import {
  TesterStoreState,
  TesterStoreStateData,
  useTesterStore,
} from '../../stores/testerStore';

const Tester = ({
  storeName = '.testerStore',
  storeInit = null,
  resetStoreOnFirstMount = false,
}: {
  storeName: string;
  storeInit?: TesterStoreStateData | null;
  resetStoreOnFirstMount?: boolean;
}) => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  const store: StoreApi<TesterStoreState> = useTesterStore(
    storeName,
    storeInit,
    resetStoreOnFirstMount && !mounted.current
  );

  const [text, setText] = useStore(store, (s) => [s.text, s.setText]);

  return (
    <div className='flex-col'>
      <div className='flex justify-center'>{text ? text : 'empty'}</div>
      <div className='p-2'>
        <input onChange={(e) => setText(e.target.value)} value={text}></input>
      </div>
    </div>
  );
};

export default Tester;
