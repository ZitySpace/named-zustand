import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import Tester from './Tester';

export default {
  title: 'UX-SDK/Tester',
  component: Tester,
} as ComponentMeta<typeof Tester>;

const SimpleComponent = () => {
  const [s, setS] = useState<string>('normal state');

  return (
    <div className='bg-gray-100 flex-grow flex justify-center'>
      <div className='flex-col'>
        <div className='flex justify-center'>{s ? s : 'empty'}</div>
        <div className='p-2'>
          <input onChange={(e) => setS(e.target.value)}></input>
        </div>
      </div>
    </div>
  );
};

const ZustandComponent = () => {
  const [names, setNames] = useState<string[]>(['a', 'a', 'b', 'b', 'c', 'c']);
  const inits = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  const resets = [true, true, false, true, false, false];

  return (
    <>
      <div className='bg-gray-100 flex-grow flex justify-around p-2'>
        <button onClick={() => setNames([...names].reverse())}>Reverse</button>
      </div>
      {names.map((name: string, i: number) => (
        <div className='bg-gray-100 flex-grow flex justify-center' key={i}>
          <Tester
            storeName={name}
            storeInit={{ text: inits[i] }}
            resetStoreOnFirstMount={resets[i]}
          />
        </div>
      ))}
    </>
  );
};

const Template: ComponentStory<typeof Tester> = (args) => {
  const [show, setShow] = useState(true);

  return (
    <div className='flex flex-col space-y-1'>
      <div className='bg-gray-100 flex-grow flex justify-around p-2'>
        <button onClick={() => setShow(!show)}>Toggle</button>
      </div>
      {show && (
        <>
          <SimpleComponent />
          <ZustandComponent />
        </>
      )}
    </div>
  );
};

export const Story = Template.bind({});
Story.args = {};
