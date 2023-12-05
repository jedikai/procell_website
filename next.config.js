/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const path = require("path");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === "development"
  },
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    domains: [
      "fakestoreapi.com",
      "api.lorem.space",
      "picsum.photos",
      "placeimg.com",
      "encrypted-tbn0.gstatic.com",
      "career-utility.dedicateddevelopers.us"
    ]
  },
  swcMinify: false,
  compress: true,
  optimizeFonts: true,
  devIndicators: {
    autoPrerender: false,
    buildActivityPosition: "bottom-right"
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_AUTHORIZATION_LOGIN_ID: process.env.NEXT_AUTHORIZATION_LOGIN_ID,
    NEXT_AUTHORIZATION_CLIENT_KEY: process.env.NEXT_AUTHORIZATION_CLIENT_KEY,
    NEXT_AUTHORIZATION_INSTAGRAM_ACCESS_TOKEN: process.env.NEXT_AUTHORIZATION_INSTAGRAM_ACCESS_TOKEN,
    NEXT_AUTHORIZATION_CRYPTO_SECRET_KEY: process.env.NEXT_AUTHORIZATION_CRYPTO_SECRET_KEY
  },
  eslint: {
    ignoreDuringBuilds: true
  }
});
