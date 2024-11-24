const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    useWatchman: true, // Ensure Watchman is used if installed
  },
  server: {
    enhanceMiddleware: (middleware) => (req, res, next) => {
      // Custom middleware (optional, can remove if not needed)
      return middleware(req, res, next);
    },
  },
  transformer: {
    // Custom transformer options
  },
  watchFolders: [], // Add folders if you need Metro to watch specific directories
  maxWorkers: 4, // Reduce worker count to manage resource usage
};

module.exports = mergeConfig(defaultConfig, customConfig);
