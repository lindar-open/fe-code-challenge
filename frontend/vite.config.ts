import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      fastRefresh: true
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: true,
        svgoConfig: {
          multipass: true,
          plugins: [
            'preset-default',
            'removeDimensions',
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'removeAttrs',
              params: {
                attrs: '(data-name)'
              }
            }
          ]
        },
        titleProp: true
      },
      include: '**/*.svg'
    }),
    splitVendorChunkPlugin()
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      '@reduxjs/toolkit',
      'recharts'
    ],
    exclude: ['@vitejs/plugin-react']
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName:
        mode === 'production' ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:5]'
    },
  }
}));
