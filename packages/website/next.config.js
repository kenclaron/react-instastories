const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx"
});

module.exports = withNextra({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
  images: {
    unoptimized: process.env.NODE_ENV === "production"
  },
  reactStrictMode: true
});
