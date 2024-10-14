import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";

export const devtoolsPanelTemplate = path.join(__dirname, "public", "devtools_panel.html");
export const popupTemplate = path.join(__dirname, "public", "popup.html");
export const manifest = path.join(__dirname, "public", "manifest.json");

export default {
  target: "web",
  stats: "errors-warnings",
  entry: {
    devtoolsPage: "src/renderer/main.tsx",
    background: "src/runtime/background.ts"
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
        test: /\.tsx?$/,
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
      filename: "devtools_panel.html",
      template: devtoolsPanelTemplate,
      inject: "body",
      chunks: ["devtoolsPage"],
      hash: false
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: popupTemplate,
      hash: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: manifest,
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
      mode: "webapp",
      cache: true
    })
  ]
} satisfies Configuration;
