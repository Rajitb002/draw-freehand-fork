import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import resolve from '@rollup/plugin-node-resolve'

import pkg from './package.json' assert { type: "json" };

const version = process.env.SEMANTIC_RELEASE_NEXT_VERSION || pkg.version;


const banner = '/*!\n' +
  ` * Draw Freehand v${version} | ${pkg.homepage}\n` +
  ` * (c) ${new Date().getFullYear()} ${pkg.author.name
  } | Released under the MIT license\n` +
  ' */\n';

const terserOptions = {
  compress: {
    passes: 10,
    drop_console: false,
  },
  output: {
    comments: false,
  },
}

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/freehand.min.js',
      format: 'iife',
      name: 'freehand',
      plugins: [
        terser(terserOptions),
        resolve(),
      ],
      globals: {
        window: 'window',
        document: 'document'
      }
    },
    {
      file: 'dist/draw-free-hand.umd.js',
      format: 'umd',
      name: 'DrawFreehand',
      plugins: [
        terser(terserOptions),
        resolve(),
      ],
      globals: {
        window: 'window',
        document: 'document'
      },
      sourcemap: true,
      banner
    }
  ],
  plugins: [
    json()
  ]
}