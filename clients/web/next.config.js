const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// Plugin support
const withPlugins = require("next-compose-plugins");

// SVG support for Next.js
const withSvgr = require("next-plugin-svgr");

// Transpile shared code
const withTM = require("next-transpile-modules")([
  "@upwardli/shared",
  "@upwardli/api",
]);

const plugins = [withTM, withSvgr];

if (process.env.ANALYZE === "true") {
  plugins.push(
    require("@next/bundle-analyzer")({
      enabled: true,
    })
  );
}

const nextConfig = {
  trailingSlash: true,
  future: {
    webpack5: true,
  },
  images: {
    loader: "imgix",
    path: "",
  },
};

module.exports = withPlugins(plugins, nextConfig);
