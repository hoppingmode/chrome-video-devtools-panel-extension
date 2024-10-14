import path from "path";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import config from "./webpack.config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExtensionReloader = require("@cedelabs/webpack-ext-reloader");

export default merge<Configuration>(config, {
  mode: "development",
  devtool: "inline-source-map",

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      formatter: "basic"
    }),
    new ExtensionReloader({
      port: 9090,
      reloadPage: true,
      entry: {
        background: "background",
        manifest: "manifest"
      }
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, "public", "assets", "logo.png"),
      mode: "webapp",
      cache: true,
      devMode: "light",
      favicons: {
        icons: {
          favicons: false,
          windows: true,
          android: false,
          appleIcon: false,
          appleStartup: false,
          yandex: false
        }
      }
    })
  ]
});
