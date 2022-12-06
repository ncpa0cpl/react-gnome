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

// src/build.ts
import { Argument, configure } from "clify.js";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { parseConfig } from "./config/parse-config.mjs";
import { reactGtkPlugin } from "./react-gtk-esbuild-plugin/react-gtk-plugin.mjs";
import { startAppPlugin } from "./start-app-esbuild-plugin/start-app-plugin.mjs";
var isObject = (o) => typeof o === "object" && o != null;
var isValidationError = (e) => {
  return isObject(e) && e instanceof Error && "fieldPath" in e || false;
};
var WatchArgument = Argument.define({
  flagChar: "-w",
  keyword: "--watch",
  dataType: "boolean"
});
function build() {
  return __async(this, null, function* () {
    configure((main) => {
      main.setDisplayName("react-gtk");
      main.setDescription("Build GTK apps with React.");
      main.addSubCommand("build", () => {
        const watch = new WatchArgument();
        return {
          commandDescription: "Build and bundle the app into a single file.",
          run() {
            return __async(this, null, function* () {
              var _a2;
              try {
                const cwd = process.cwd();
                const cwdFiles = fs.readdirSync(cwd);
                const filename = cwdFiles.find(
                  (f) => f.startsWith("react-gtk.config.")
                );
                if (!filename) {
                  throw new Error("No config file found.");
                }
                const config = yield parseConfig(path.join(cwd, filename));
                yield esbuild.build({
                  target: "es6",
                  format: "esm",
                  entryPoints: [path.resolve(cwd, config.entrypoint)],
                  outfile: path.resolve(cwd, config.outDir, "index.js"),
                  plugins: [
                    reactGtkPlugin(config),
                    ...(_a2 = config.esbuildPlugins) != null ? _a2 : []
                  ],
                  external: config.externalPackages,
                  minify: config.minify,
                  treeShaking: config.treeShake,
                  jsx: "transform",
                  keepNames: true,
                  bundle: true,
                  watch: watch.value
                });
              } catch (e) {
                if (isValidationError(e)) {
                  console.error(
                    `Config file is invalid. Property "${e.fieldPath}" is incorrect.`
                  );
                } else if (isObject(e) && e instanceof Error) {
                  console.error("Build failed due to an error: ", e.message);
                } else {
                  console.error("Build failed due to an unknown error.");
                }
                process.exit(1);
              }
            });
          }
        };
      });
      main.addSubCommand("start", () => {
        const watch = new WatchArgument();
        return {
          commandDescription: "Build, bundle and open the app.",
          run() {
            return __async(this, null, function* () {
              var _a2;
              try {
                const cwd = process.cwd();
                const cwdFiles = fs.readdirSync(cwd);
                const filename = cwdFiles.find(
                  (f) => f.startsWith("react-gtk.config.")
                );
                if (!filename) {
                  throw new Error("No config file found.");
                }
                const config = yield parseConfig(path.join(cwd, filename));
                yield esbuild.build({
                  target: "es6",
                  format: "esm",
                  entryPoints: [path.resolve(cwd, config.entrypoint)],
                  outfile: path.resolve(cwd, config.outDir, "index.js"),
                  plugins: [
                    reactGtkPlugin(config),
                    startAppPlugin(path.resolve(cwd, config.outDir)),
                    ...(_a2 = config.esbuildPlugins) != null ? _a2 : []
                  ],
                  external: config.externalPackages,
                  minify: config.minify,
                  treeShaking: config.treeShake,
                  jsx: "transform",
                  keepNames: true,
                  bundle: true,
                  watch: watch.value
                });
              } catch (e) {
                if (isValidationError(e)) {
                  console.error(
                    `Config file is invalid. Property "${e.fieldPath}" is incorrect.`
                  );
                } else if (isObject(e) && e instanceof Error) {
                  console.error("Build failed due to an error: ", e.message);
                } else {
                  console.error("Build failed due to an unknown error.");
                }
                process.exit(1);
              }
            });
          }
        };
      });
    });
  });
}
export {
  build
};
