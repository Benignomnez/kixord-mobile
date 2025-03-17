let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    // Add aliases for React Native modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': resolve(__dirname, './lib/react-native-web.js'),
      'react-native-safe-area-context': resolve(__dirname, './lib/react-native-web-mock.js'),
      'react-native-gesture-handler': resolve(__dirname, './lib/react-native-web-mock.js'),
      'react-native-screens': resolve(__dirname, './lib/react-native-web-mock.js'),
      '@react-navigation/native': resolve(__dirname, './lib/navigation-mock.js'),
      '@react-navigation/stack': resolve(__dirname, './lib/navigation-mock.js'),
      '@react-navigation/bottom-tabs': resolve(__dirname, './lib/navigation-mock.js'),
      '@expo/vector-icons': resolve(__dirname, './lib/react-native-web-mock.js'),
      'firebase/auth': resolve(__dirname, './lib/navigation-mock.js'),
      'firebase/app': resolve(__dirname, './lib/navigation-mock.js'),
      'firebase/firestore': resolve(__dirname, './lib/navigation-mock.js'),
    };

    return config;
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
