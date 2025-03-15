const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const path = require("path");

const config = getSentryExpoConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("es-toolkit")) {
    const esToolkitPath = path.resolve(__dirname, "node_modules/es-toolkit/dist/index.js");
    return {
      filePath: esToolkitPath,
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
