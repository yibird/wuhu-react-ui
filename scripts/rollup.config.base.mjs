import path from 'node:path'
import { fileURLToPath } from 'node:url'
import del from 'rollup-plugin-delete'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

 

export function createRollupConfig({ input, name, outputDir, isDev }) {
  const shouldMinify = !isDev

  return {
    input,
    output: [
      {
        file: path.join(outputDir, 'index.es.js'),
        format: 'es',
        sourcemap: isDev,
      },
      {
        file: path.join(outputDir, 'index.umd.js'),
        format: 'umd',
        name,
        sourcemap: isDev,
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        plugins: shouldMinify ? [terser()] : [],
      },
      {
        file: path.join(outputDir, 'index.iife.js'),
        format: 'iife',
        name,
        sourcemap: isDev,
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        plugins: shouldMinify ? [terser({ format: { comments: false } })] : [],
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      del({ targets: `${outputDir}/*` }),
      resolve(),
      commonjs(),
      postcss({
        extract: false,
        inject: true,
        minimize: shouldMinify,
        extensions: ['.css', '.less'],
        use: [
          [
            'less',
            {
              javascriptEnabled: true,
            },
          ],
        ],
      }),
      typescript({
        tsconfig: path.join(outputDir, '../tsconfig.json'),
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
      }),
    ],
  }
}
