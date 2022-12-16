import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createNamed } from 'named-zustand';
import shallow from 'zustand/shallow';

interface BearState {
  age: number;
  setAge: (age: number) => void;
}

const useBearStore = createNamed<BearState>((set) => ({
  age: 1,
  setAge: (age) => set({ age }),
}));

const Bear = ({ name }: { name: string }) => {
  const [age, setAge] = useBearStore(name, (s) => [s.age, s.setAge], shallow);

  return (
    <div>
      <span>
        I am {name}, {age} year old
      </span>
      <button onClick={() => setAge(age + 1)}> + </button>
      <button onClick={() => setAge(age > 1 ? age - 1 : age)}> - </button>
    </div>
  );
};

const Example = () => (
  <div>
    <Bear name='foo' />
    <Bear name='bar' />
    <Bear name='foo' />
    <Bear name='bar' />
  </div>
);

export default {
  title: 'Example/Named-Zustand',
  component: Example,
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => <Example />;

export const Story = Template.bind({});
Story.args = {};
