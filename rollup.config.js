import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: !isProduction,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: !isProduction,
      },
    ],
    watch: {
      clearScreen: false,
      include: 'src/**',
      exclude: ['node_modules/**', 'examples/**'],
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        ...(!isProduction && { compilerOptions: { target: 'esnext' } }),
      }),
      isProduction &&
        terser({
          format: {
            comments: /^\s*([@#]__[A-Z]+__\s*$|@cc_on)/,
          },
        }),
    ],
    external: ['react', 'react-dom', 'zustand'],
  },
];
