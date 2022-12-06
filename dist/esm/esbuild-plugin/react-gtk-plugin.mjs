var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/esbuild-plugin/react-gtk-plugin.ts
import fs from "fs/promises";
import { getDefaultGiImports } from "./default-gi-imports.mjs";
var reactGtkPlugin = (config) => {
  return {
    name: "react-gtk-esbuild-plugin",
    setup(build) {
      build.onResolve({ filter: /^gi?:\/\// }, (args) => ({
        path: args.path.replace(/^gi?:/, ""),
        namespace: "gi"
      }));
      build.onResolve({ filter: /.*/, namespace: "gi" }, (args) => ({
        path: args.path.replace(/^gi?:/, ""),
        namespace: "gi"
      }));
      build.onLoad({ filter: /.*/, namespace: "gi" }, (args) => __async(this, null, function* () {
        const name = args.path.replace(/(^gi:\/\/)|(^gi:)|(^\/\/)|(\?.+)/g, "");
        return {
          contents: `export default ${name};`
        };
      }));
      build.onEnd(() => __async(this, null, function* () {
        const outputFile = yield fs.readFile(
          build.initialOptions.outfile,
          "utf8"
        );
        const imports = getDefaultGiImports(config.giVersions);
        yield fs.writeFile(
          build.initialOptions.outfile,
          [imports, outputFile].join("\n")
        );
      }));
    }
  };
};
export {
  reactGtkPlugin
};
