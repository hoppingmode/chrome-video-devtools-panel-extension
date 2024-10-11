/**
 * @type {import("babel-core").TransformOptions}
 */
export default {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-class-properties"
  ]
};
