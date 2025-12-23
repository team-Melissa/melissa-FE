const { defineConfig } = require('orval');

module.exports = defineConfig({
  melissa: {
    input: {
      target: 'https://dev.melissa7.shop/v3/api-docs',
    },
    output: {
      mode: 'split',
      namingConvention: 'camelCase',
      target: 'src/apis/_generated',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/modules/axios/index.ts',
          name: 'orvalAxiosInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          usePrefetch: true,
          signal: false,
        },
      },
      fileExtension: '.ts',
    },
  },
});
