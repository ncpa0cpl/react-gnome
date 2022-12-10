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
import chalk from "chalk";
import { Argument, configure } from "clify.js";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { parseConfig } from "./config/parse-config.mjs";
import { reactGnomePlugin } from "./esbuild-plugins/react-gnome/react-gnome-plugin.mjs";
import { startAppPlugin } from "./esbuild-plugins/start-app/start-app-plugin.mjs";
import { watchLoggerPlugin } from "./esbuild-plugins/watch-logger/watch-logger-plugin.mjs";
var isObject = (o) => typeof o === "object" && o != null;
var isValidationError = (e) => {
  return isObject(e) && e instanceof Error && "fieldPath" in e || false;
};
var handleBuildError = (e) => {
  if (isValidationError(e)) {
    console.error(
      chalk.redBright(
        `Config file is invalid. Property "${chalk.yellowBright(
          e.fieldPath
        )}" is incorrect.`
      )
    );
  } else if (isObject(e) && e instanceof Error) {
    console.error("Build failed due to an error: ", chalk.redBright(e.message));
  } else {
    console.error(chalk.redBright("Build failed due to an unknown error."));
  }
  process.exit(1);
};
var getPlugins = (type, config, watch) => {
  const plugins = [reactGnomePlugin(config)];
  if (type === "start") {
    plugins.push(startAppPlugin(path.resolve(process.cwd(), config.outDir)));
  }
  if (watch.value) {
    plugins.push(watchLoggerPlugin());
  }
  if (config.esbuildPlugins) {
    plugins.push(...config.esbuildPlugins);
  }
  return plugins;
};
var WatchArgument = Argument.define({
  flagChar: "-w",
  keyword: "--watch",
  dataType: "boolean"
});
var BuildModeArgument = Argument.define({
  flagChar: "-m",
  keyword: "--mode",
  dataType: "string",
  description: "The build mode, either 'development' or 'production'."
});
function build() {
  return __async(this, null, function* () {
    configure((main) => {
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
                const cwdFiles = fs.readdirSync(cwd);
                const filename = cwdFiles.find(
                  (f) => f.startsWith("react-gnome.config.")
                );
                if (!filename) {
                  throw new Error("No config file found.");
                }
                const config = yield parseConfig(path.join(cwd, filename), {
                  mode: isDev ? "development" : "production"
                });
                if (watch.value) {
                  console.log(chalk.blueBright("Building in watch mode..."));
                } else {
                  console.log(chalk.blueBright("Building..."));
                }
                yield esbuild.build({
                  target: "es6",
                  format: "esm",
                  entryPoints: [path.resolve(cwd, config.entrypoint)],
                  outfile: path.resolve(cwd, config.outDir, "index.js"),
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
                  console.log(chalk.greenBright("Build completed."));
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
                const cwdFiles = fs.readdirSync(cwd);
                const filename = cwdFiles.find(
                  (f) => f.startsWith("react-gnome.config.")
                );
                if (!filename) {
                  throw new Error("No config file found.");
                }
                const config = yield parseConfig(path.join(cwd, filename), {
                  mode: isDev ? "development" : "production"
                });
                if (watch.value) {
                  console.log(chalk.blueBright("Starting in watch mode."));
                } else {
                  console.log(chalk.blueBright("Starting."));
                }
                yield esbuild.build({
                  target: "es6",
                  format: "esm",
                  entryPoints: [path.resolve(cwd, config.entrypoint)],
                  outfile: path.resolve(cwd, config.outDir, "index.js"),
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
export {
  build
};
