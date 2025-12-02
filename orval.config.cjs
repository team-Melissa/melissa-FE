const { defineConfig } = require("orval");

module.exports = defineConfig({
  melissa: {
    input: {
      target: "https://dev.melissa7.shop/v3/api-docs",
    },
    output: {
      mode: "tags-split",
      target: "src/apis/_generated",
      client: "react-query",
      override: {
        mutator: {
          path: "src/modules/axios/index.ts",
          name: "orvalAxiosInstance",
        },
      },
      fileExtension: ".ts",
    },
  },
});
