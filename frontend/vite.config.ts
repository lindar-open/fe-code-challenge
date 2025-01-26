import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { compression } from 'vite-plugin-compression2';
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
            },
            'removeTitle',
            'removeDesc',
            'removeMetadata',
            'removeComments',
            'cleanupIDs'
          ]
        },
        titleProp: true
      },
      include: '**/*.svg'
    }),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br|gz)$/, /\.(jpe?g|png|gif|webp|svg)$/i],
      threshold: 512,
      filename: '[path][base].br',
      deleteOriginalAssets: false
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br|gz)$/, /\.(jpe?g|png|gif|webp|svg)$/i],
      threshold: 512,
      filename: '[path][base].gz',
      compressionOptions: {
        level: 9,
        memLevel: 9,
        windowBits: 15
      },
      deleteOriginalAssets: false
    }),
  ],

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      '@reduxjs/toolkit',
      'recharts',
      'react-use',
      'classnames'
    ],
    exclude: ['@vitejs/plugin-react'],
    esbuildOptions: {
      target: 'ESNext',
      treeShaking: true,
      minify: true,
      keepNames: true,
      supported: {
        'top-level-await': true
      },
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: 'jsx'
            }));
          }
        }
      ]
    }
  },

  build: {
    target: 'ESNext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
        passes: 3
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['react', 'react-dom'],
          'vendor-redux': ['redux', 'react-redux', '@reduxjs/toolkit'],
          'vendor-router': ['react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-utils': ['react-use', 'classnames']
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name.includes('vendor')) {
            return 'chunks/vendor/[name]-[hash].js';
          }
          return 'chunks/[name]-[hash].js';
        },
        entryFileNames: 'entries/[name]-[hash].js'
      }
    },
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName:
        mode === 'production' ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:5]'
    },
    postcss: {
      plugins: [
        mode === 'production' &&
          require('cssnano')({
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                minifyFontValues: { removeQuotes: false }
              }
            ]
          })
      ].filter(Boolean)
    }
  },

  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Accept-Encoding': 'gzip'
    }
  }
}));
