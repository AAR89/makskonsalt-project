import { posix } from "path";

import { defineConfig } from "@vue/cli-service";
export default defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/makskonsalt-project/" : "/",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devServer: {
      historyApiFallback: {
        rewrites: [
          {
            from: /./,
            to: posix.join("/makskonsalt-project/", "index.html"),
          },
        ],
      },
    },
  },
});
