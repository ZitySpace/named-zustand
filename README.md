# named-zustand

[![CI](https://img.shields.io/github/actions/workflow/status/zityspace/named-zustand/release.yml?branch=master)](https://github.com/zityspace/named-zustand/actions?query=workflow%3ARelease)
[![npm](https://img.shields.io/npm/v/named-zustand)](https://www.npmjs.com/package/named-zustand)

## Install

```bash
npm install named-zustand
```

## Usage

```tsx
import React from 'react';
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

const GroupOfBear = () => (
  <div>
    <Bear name='foo' />
    <Bear name='bar' />
    <Bear name='foo' />
    <Bear name='bar' />
  </div>
);
```

## Examples

The examples folder contains a story to show the usage.

```bash
cd examples && yarn install && yarn storybook
```

and open [http://localhost:6006](http://localhost:6006) in your web browser.
