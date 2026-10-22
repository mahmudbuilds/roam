const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

// NativeWind redirects every `react-native` import to `react-native-css/components`,
// which can leave `AssetRegistry` undefined for expo-asset (used by expo-font /
// @expo/vector-icons). Resolve the real `react-native` for those packages.
const nativewindResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === "react-native" &&
    /[\\/]node_modules[\\/](expo-asset|expo-font)[\\/]/.test(context.originModulePath)
  ) {
    return require("metro-resolver").resolve(
      { ...context, resolveRequest: null },
      moduleName,
      platform,
    );
  }
  return nativewindResolver
    ? nativewindResolver(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
