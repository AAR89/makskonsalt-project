const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/makskonsalt-project/" : "/",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devServer: {
      historyApiFallback: {
        rewrites: [
          {
            from: /./,
            to: path.posix.join("/makskonsalt-project/", "index.html"),
          },
        ],
      },
    },
  },
});
