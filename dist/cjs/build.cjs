"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var build_exports = {};
__export(build_exports, {
  build: () => build
});
module.exports = __toCommonJS(build_exports);
var import_chalk = __toESM(require("chalk"));
var import_clify = require("clify.js");
var import_esbuild = __toESM(require("esbuild"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_parse_config = require("./config/parse-config.cjs");
var import_react_gnome_plugin = require("./esbuild-plugins/react-gnome/react-gnome-plugin.cjs");
var import_start_app_plugin = require("./esbuild-plugins/start-app/start-app-plugin.cjs");
var import_watch_logger_plugin = require("./esbuild-plugins/watch-logger/watch-logger-plugin.cjs");
var isObject = (o) => typeof o === "object" && o != null;
var isValidationError = (e) => {
  return isObject(e) && e instanceof Error && "fieldPath" in e || false;
};
var handleBuildError = (e) => {
  if (isValidationError(e)) {
    console.error(
      import_chalk.default.redBright(
        `Config file is invalid. Property "${import_chalk.default.yellowBright(
          e.fieldPath
        )}" is incorrect.`
      )
    );
  } else if (isObject(e) && e instanceof Error) {
    console.error("Build failed due to an error: ", import_chalk.default.redBright(e.message));
  } else {
    console.error(import_chalk.default.redBright("Build failed due to an unknown error."));
  }
  process.exit(1);
};
var getPlugins = (type, config, watch) => {
  const plugins = [(0, import_react_gnome_plugin.reactGnomePlugin)(config)];
  if (type === "start") {
    plugins.push((0, import_start_app_plugin.startAppPlugin)(import_path.default.resolve(process.cwd(), config.outDir)));
  }
  if (watch.value) {
    plugins.push((0, import_watch_logger_plugin.watchLoggerPlugin)());
  }
  if (config.esbuildPlugins) {
    plugins.push(...config.esbuildPlugins);
  }
  return plugins;
};
var WatchArgument = import_clify.Argument.define({
  flagChar: "-w",
  keyword: "--watch",
  dataType: "boolean"
});
var BuildModeArgument = import_clify.Argument.define({
  flagChar: "-m",
  keyword: "--mode",
  dataType: "string",
  description: "The build mode, either 'development' or 'production'."
});
function build() {
  return __async(this, null, function* () {
    (0, import_clify.configure)((main) => {
      main.setDisplayName("react-gnome");
      main.setDescription("Build GTK apps with React.");
      main.addSubCommand("build", () => {
        const watch = new WatchArgument();
        const mode = new BuildModeArgument();
        return {
          commandDescription: "Build and bundle the app into a single file.",
          run() {
            return __async(this, null, function* () {
              var _a2, _b;
              try {
                const isDev = mode.value === "development";
                const cwd = process.cwd();
                const cwdFiles = import_fs.default.readdirSync(cwd);
                const filename = cwdFiles.find(
                  (f) => f.startsWith("react-gnome.config.")
                );
                if (!filename) {
                  throw new Error("No config file found.");
                }
                const config = yield (0, import_parse_config.parseConfig)(import_path.default.join(cwd, filename), {
                  mode: isDev ? "development" : "production"
                });
                if (watch.value) {
                  console.log(import_chalk.default.blueBright("Building in watch mode..."));
                } else {
                  console.log(import_chalk.default.blueBright("Building..."));
                }
                yield import_esbuild.default.build({
                  target: "es6",
                  format: "esm",
                  entryPoints: [import_path.default.resolve(cwd, config.entrypoint)],
                  outfile: import_path.default.resolve(cwd, config.outDir, "index.js"),
                  plugins: getPlugins("build", config, watch),
                  external: config.externalPackages,
                  minify: (_a2 = config.minify) != null ? _a2 : isDev ? false : true,
                  treeShaking: (_b = config.treeShake) != null ? _b : isDev ? false : true,
                  jsx: "transform",
                  keepNames: true,
                  bundle: true,
                  watch: watch.value
                });
                if (!watch.value) {
                  console.log(import_chalk.default.greenBright("Build completed."));
                }
              } catch (e) {
                handleBuildError(e);
              }
            });
          }
        };
      });
      main.addSubCommand("start", () => {
        const watch = new WatchArgument();
        const mode = new BuildModeArgument();
        return {
          commandDescription: "Build, bundle and open the app.",
          run() {
            return __async(this, null, function* () {
              var _a2, _b;
              try {
                const isDev = mode.value === "development";
                const cwd = process.cwd();
                const cwdFiles = import_fs.default.readdirSync(cwd);
                const filename = cwdFiles.find(
                  (f) => f.startsWith("react-gnome.config.")
                );
                if (!filename) {
                  throw new Error("No config file found.");
                }
                const config = yield (0, import_parse_config.parseConfig)(import_path.default.join(cwd, filename), {
                  mode: isDev ? "development" : "production"
                });
                if (watch.value) {
                  console.log(import_chalk.default.blueBright("Starting in watch mode."));
                } else {
                  console.log(import_chalk.default.blueBright("Starting."));
                }
                yield import_esbuild.default.build({
                  target: "es6",
                  format: "esm",
                  entryPoints: [import_path.default.resolve(cwd, config.entrypoint)],
                  outfile: import_path.default.resolve(cwd, config.outDir, "index.js"),
                  plugins: getPlugins("start", config, watch),
                  external: config.externalPackages,
                  minify: (_a2 = config.minify) != null ? _a2 : isDev ? false : true,
                  treeShaking: (_b = config.treeShake) != null ? _b : isDev ? false : true,
                  jsx: "transform",
                  keepNames: true,
                  bundle: true,
                  watch: watch.value
                });
              } catch (e) {
                handleBuildError(e);
              }
            });
          }
        };
      });
    });
  });
}
