import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import reactSvg from 'rollup-plugin-react-svg'
import scss from 'rollup-plugin-scss'

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    reactSvg({
      svgo: {
        plugins: [], // passed to svgo
        multipass: true
      },
      jsx: false,
      include: null,
      exclude: null
    }),
    scss()
  ]
}
