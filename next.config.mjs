/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features (if necessary)
  experimental: {
    esmExternals: true // To ensure support for ES Modules
  },
  images: {
    domains: ['media.licdn.com'],
  },

  // Webpack configuration for resolving paths
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src") // Set up the alias for @ to point to src/
    };
    return config;
  }

  // Any other Next.js configurations
};

export default nextConfig;

// const { createServer } = require("http");
// import createServer from "http";

import { parse } from "url";

import next from "next";
// const { initSocket } = require("./src/lib/socket");
// import {initSocket} from './src/lib/socket.js';

// import { initSocket } from "./src/lib/socket.js"; // OR .ts if supported

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   // Initialize Socket.IO
//   initSocket(server);

//   server.listen(3000, () => {
//     console.log("> Ready on http://localhost:3000");
//   });
// });
