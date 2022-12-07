import chalk from "chalk";
import { Argument, configure } from "clify.js";
import type { ValidationError } from "dilswer/dist/types/validation-algorithms/validation-error/validation-error";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import type { Config } from "./config/config-schema";
import { parseConfig } from "./config/parse-config";
import { reactGtkPlugin } from "./esbuild-plugins/react-gtk/react-gtk-plugin";
import { startAppPlugin } from "./esbuild-plugins/start-app/start-app-plugin";
import { watchLoggerPlugin } from "./esbuild-plugins/watch-logger/watch-logger-plugin";

const isObject = (o: unknown): o is object =>
  typeof o === "object" && o != null;

const isValidationError = (e: unknown): e is ValidationError => {
  return (isObject(e) && e instanceof Error && "fieldPath" in e) || false;
};

const handleBuildError = (e: unknown) => {
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

const getPlugins = (
  type: "build" | "start",
  config: Config,
  watch: Argument<"boolean", false>,
  debug = false
) => {
  const plugins = [reactGtkPlugin(config, debug)];

  if (type === "start") {
    plugins.push(
      startAppPlugin(path.resolve(process.cwd(), config.outDir), debug)
    );
  }

  if (watch.value) {
    plugins.push(watchLoggerPlugin());
  }

  if (config.esbuildPlugins) {
    plugins.push(...config.esbuildPlugins);
  }

  return plugins;
};

const WatchArgument = Argument.define({
  flagChar: "-w",
  keyword: "--watch",
  dataType: "boolean",
});

const BuildModeArgument = Argument.define({
  flagChar: "-m",
  keyword: "--mode",
  dataType: "string",
  description: "The build mode, either 'development' or 'production'.",
});

const DebugArgument = Argument.define({
  flagChar: "-d",
  keyword: "--debug",
  dataType: "boolean",
  description: "Enable debugging.",
});

export async function build() {
  configure((main) => {
    main.setDisplayName("react-gtk");
    main.setDescription("Build GTK apps with React.");

    main.addSubCommand("build", () => {
      const watch = new WatchArgument();
      const mode = new BuildModeArgument();

      return {
        commandDescription: "Build and bundle the app into a single file.",
        async run() {
          try {
            const isDev = mode.value === "development";
            const cwd = process.cwd();
            const cwdFiles = fs.readdirSync(cwd);

            const filename = cwdFiles.find((f) =>
              f.startsWith("react-gtk.config.")
            );

            if (!filename) {
              throw new Error("No config file found.");
            }

            const config = await parseConfig(path.join(cwd, filename), {
              mode: isDev ? "development" : "production",
            });

            if (watch.value) {
              console.log(chalk.blueBright("Building in watch mode..."));
            } else {
              console.log(chalk.blueBright("Building..."));
            }

            await esbuild.build({
              target: "es6",
              format: "esm",
              entryPoints: [path.resolve(cwd, config.entrypoint)],
              outfile: path.resolve(cwd, config.outDir, "index.js"),
              plugins: getPlugins("build", config, watch),
              external: config.externalPackages,
              minify: config.minify ?? (isDev ? false : true),
              treeShaking: config.treeShake ?? (isDev ? false : true),
              jsx: "transform",
              keepNames: true,
              bundle: true,
              watch: watch.value,
            });

            if (!watch.value) {
              console.log(chalk.greenBright("Build completed."));
            }
          } catch (e) {
            handleBuildError(e);
          }
        },
      };
    });

    main.addSubCommand("start", () => {
      const watch = new WatchArgument();
      const mode = new BuildModeArgument();
      const debug = new DebugArgument();

      return {
        commandDescription: "Build, bundle and open the app.",
        async run() {
          try {
            const isDev = mode.value === "development";
            const cwd = process.cwd();
            const cwdFiles = fs.readdirSync(cwd);

            const filename = cwdFiles.find((f) =>
              f.startsWith("react-gtk.config.")
            );

            if (!filename) {
              throw new Error("No config file found.");
            }

            const config = await parseConfig(path.join(cwd, filename), {
              mode: isDev ? "development" : "production",
            });

            if (watch.value) {
              console.log(chalk.blueBright("Starting in watch mode."));
            } else {
              console.log(chalk.blueBright("Starting."));
            }

            await esbuild.build({
              target: "es6",
              format: "esm",
              entryPoints: [path.resolve(cwd, config.entrypoint)],
              outfile: path.resolve(cwd, config.outDir, "index.js"),
              plugins: getPlugins("start", config, watch, debug.value),
              external: config.externalPackages,
              minify: config.minify ?? (isDev ? false : true),
              treeShaking: config.treeShake ?? (isDev ? false : true),
              jsx: "transform",
              keepNames: true,
              bundle: true,
              watch: watch.value,
            });
          } catch (e) {
            handleBuildError(e);
          }
        },
      };
    });
  });
}
