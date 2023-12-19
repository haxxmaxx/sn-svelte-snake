import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/snake/main.ts",
  output: {
    // The destination for our bundled JavaScript
    file: "svelte-build/bundle.js",
    format: "es",
    name: "app",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
    resolve({ browser: true }),
    commonjs(),
    typescript(),
  ],
};
