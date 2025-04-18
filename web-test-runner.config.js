import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  files: "test/**/*.test.js",
  nodeResolve: true, // eski sürümlerde bu işe yarıyordu
  plugins: [
    nodeResolve(), // modern sürümler için bu önemli
  ],
};
