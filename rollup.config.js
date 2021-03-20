import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import uglify from 'rollup-plugin-uglify-es';
import filesize from 'rollup-plugin-filesize';

const globals = {
  react: 'React'
};

const extensions = [
  '.js', '.jsx',
];

const formats = ['umd', 'es'];

export default {
  input: './src/index.js',
  external: Object.keys(globals),
  plugins: [
    resolve({ extensions, preferBuiltins: false }),
    commonjs({ include: 'node_modules' }),
    babel({ 
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify(),
    filesize()
  ],
  output: [{
    exports: 'named',
    globals,
    name: 'ReactVirtualScroll',
    file: './dist/rvs.js',
    format: 'umd'
  },
  {
    name: 'ReactVirtualScroll',
    file: './dist/rvs-es.js',
    format: 'es'
  }]
}