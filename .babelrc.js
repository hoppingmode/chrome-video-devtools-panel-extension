/**
 * @type {import("babel-core").TransformOptions}
 */
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-class-properties"
    // "babel-plugin-dynamic-import-node"
  ]
};
