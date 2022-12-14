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
import path from "path";
import { startAppPlugin } from "./esbuild-plugins/start-app/start-app-plugin.mjs";
import { getPlugins } from "./utils/get-plugins.mjs";
import { getPolyfills } from "./utils/get-polyfills.mjs";
import { handleProgramError } from "./utils/handle-program-error.mjs";
import { readConfig } from "./utils/read-config.mjs";
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
var Program = class {
  constructor() {
    this.cwd = process.cwd();
    this.args = {
      watch: new WatchArgument(),
      mode: new BuildModeArgument()
    };
  }
  get isDev() {
    return this.args.mode.value === "development";
  }
  get watchMode() {
    return this.args.watch.value || false;
  }
  run() {
    return __async(this, null, function* () {
      try {
        this.config = yield readConfig(this);
        return yield this.main(this);
      } catch (e) {
        handleProgramError(e);
      }
    });
  }
  runWith(args, config, workingDir) {
    return __async(this, null, function* () {
      try {
        if (workingDir) {
          this.cwd = workingDir;
        }
        this.config = config;
        for (const [key, value] of Object.entries(args)) {
          const arg = this.args[key];
          if (arg) {
            arg.setDefault(value);
          }
        }
        Object.freeze(this);
        Object.freeze(this.args);
        Object.freeze(this.config);
        return yield this.main(this);
      } catch (e) {
        handleProgramError(e);
      }
    });
  }
};
var BuildProgram = class extends Program {
  additionalPlugins() {
    return {};
  }
  main() {
    return __async(this, null, function* () {
      var _a, _b;
      if (this.watchMode) {
        console.log(chalk.blueBright("Building in watch mode..."));
      } else {
        console.log(chalk.blueBright("Building..."));
      }
      yield esbuild.build({
        target: "es6",
        format: "esm",
        inject: getPolyfills(this),
        entryPoints: [path.resolve(this.cwd, this.config.entrypoint)],
        outfile: path.resolve(this.cwd, this.config.outDir, "index.js"),
        plugins: getPlugins(this),
        external: this.config.externalPackages,
        minify: (_a = this.config.minify) != null ? _a : this.isDev ? false : true,
        treeShaking: (_b = this.config.treeShake) != null ? _b : this.isDev ? false : true,
        jsx: "transform",
        keepNames: true,
        bundle: true,
        watch: this.watchMode
      });
      if (!this.watchMode) {
        console.log(chalk.greenBright("Build completed."));
      }
    });
  }
};
var StartProgram = class extends Program {
  additionalPlugins() {
    return {
      before: [startAppPlugin(path.resolve(this.cwd, this.config.outDir))]
    };
  }
  main() {
    return __async(this, null, function* () {
      var _a, _b;
      if (this.watchMode) {
        console.log(chalk.blueBright("Starting in watch mode."));
      } else {
        console.log(chalk.blueBright("Starting."));
      }
      yield esbuild.build({
        target: "es6",
        format: "esm",
        inject: getPolyfills(this),
        entryPoints: [path.resolve(this.cwd, this.config.entrypoint)],
        outfile: path.resolve(this.cwd, this.config.outDir, "index.js"),
        plugins: getPlugins(this),
        external: this.config.externalPackages,
        minify: (_a = this.config.minify) != null ? _a : this.isDev ? false : true,
        treeShaking: (_b = this.config.treeShake) != null ? _b : this.isDev ? false : true,
        jsx: "transform",
        keepNames: true,
        bundle: true,
        watch: this.watchMode
      });
    });
  }
};
function build() {
  return __async(this, null, function* () {
    configure((main) => {
      main.setDisplayName("react-gnome");
      main.setDescription("Build GTK apps with React.");
      const buildCommand = main.addSubCommand("build", () => new BuildProgram());
      const startCommand = main.addSubCommand("start", () => new StartProgram());
      buildCommand.setDescription("Build and bundle the app into a single file.");
      startCommand.setDescription("Build, bundle and open the app.");
    });
  });
}
export {
  BuildProgram,
  StartProgram,
  build
};
