const { getDefaultConfig } = require('expo/metro-config');
const nodeLibs = require('node-libs-react-native');
// Add custom polyfills
nodeLibs.crypto = require.resolve('react-native-crypto');
/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    extraNodeModules: {
      ...nodeLibs, // Include Node.js polyfills
    },
  },
};
module.exports = config;