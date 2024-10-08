import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const webpackPaths = {
  distDir: path.join(__dirname, "dist"),
  manifestFile: path.join(__dirname, "src", "manifest.json"),
  panelTemplateFile: path.join(process.cwd(), "public", "extension.html"),
  publicDir: path.join(__dirname, "public"),
  srcDir: path.join(__dirname, "src"),
  workspaceDir: __dirname
};

const config: Configuration = {
  target: "web",
  stats: "errors-warnings",
  entry: {
    extension: path.join(__dirname, "src", "renderer", "extension.tsx"),
    background: path.join(__dirname, "src", "runtime", "background", "background.ts")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "webextension-polyfill-ts": path.resolve(
        path.join(__dirname, "node_modules", "webextension-polyfill-ts")
      )
    },
    plugins: [new TsConfigPathsWebpackPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    new DefinePlugin({
      "process.env.TARGET_BROWSER": JSON.stringify(process.env.TARGET_BROWSER)
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
    new HtmlWebpackPlugin({
      filename: "extension.html",
      template: path.join(__dirname, "public", "extension.html"),
      inject: "body",
      chunks: ["extension"],
      hash: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "manifest.json"),
          to: path.join(__dirname, "dist"),
          transform: (content: Buffer) => {
            const manifest = JSON.parse(content.toString());
            delete manifest["$schema"];
            return JSON.stringify(manifest, null, 2);
          }
        }
      ]
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, "public", "assets", "logo.png"),
      mode: "webapp"
    })
  ]
};

export const baseConfig = {
  paths: webpackPaths,
  config: config
};

export default config;
