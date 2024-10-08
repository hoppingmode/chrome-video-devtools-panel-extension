import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { baseConfig } from "./webpack.config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExtensionReloader = require("@cedelabs/webpack-ext-reloader");

const { config, paths } = baseConfig;

export default merge<Configuration>(config, {
  mode: "development",
  plugins: [
    new ExtensionReloader({
      port: 9090,
      reloadPage: true,
      manifest: paths.manifestFile,
      entries: {
        background: "background",
        manifest: "manifest"
      }
    })
  ]
});
