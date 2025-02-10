const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

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
