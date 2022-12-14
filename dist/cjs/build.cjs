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
  BuildProgram: () => BuildProgram,
  StartProgram: () => StartProgram,
  build: () => build
});
module.exports = __toCommonJS(build_exports);
var import_chalk = __toESM(require("chalk"));
var import_clify = require("clify.js");
var import_esbuild = __toESM(require("esbuild"));
var import_path = __toESM(require("path"));
var import_start_app_plugin = require("./esbuild-plugins/start-app/start-app-plugin.cjs");
var import_get_plugins = require("./utils/get-plugins.cjs");
var import_get_polyfills = require("./utils/get-polyfills.cjs");
var import_handle_program_error = require("./utils/handle-program-error.cjs");
var import_read_config = require("./utils/read-config.cjs");
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
        this.config = yield (0, import_read_config.readConfig)(this);
        return yield this.main(this);
      } catch (e) {
        (0, import_handle_program_error.handleProgramError)(e);
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
        (0, import_handle_program_error.handleProgramError)(e);
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
        console.log(import_chalk.default.blueBright("Building in watch mode..."));
      } else {
        console.log(import_chalk.default.blueBright("Building..."));
      }
      yield import_esbuild.default.build({
        target: "es6",
        format: "esm",
        inject: (0, import_get_polyfills.getPolyfills)(this),
        entryPoints: [import_path.default.resolve(this.cwd, this.config.entrypoint)],
        outfile: import_path.default.resolve(this.cwd, this.config.outDir, "index.js"),
        plugins: (0, import_get_plugins.getPlugins)(this),
        external: this.config.externalPackages,
        minify: (_a = this.config.minify) != null ? _a : this.isDev ? false : true,
        treeShaking: (_b = this.config.treeShake) != null ? _b : this.isDev ? false : true,
        jsx: "transform",
        keepNames: true,
        bundle: true,
        watch: this.watchMode
      });
      if (!this.watchMode) {
        console.log(import_chalk.default.greenBright("Build completed."));
      }
    });
  }
};
var StartProgram = class extends Program {
  additionalPlugins() {
    return {
      before: [(0, import_start_app_plugin.startAppPlugin)(import_path.default.resolve(this.cwd, this.config.outDir))]
    };
  }
  main() {
    return __async(this, null, function* () {
      var _a, _b;
      if (this.watchMode) {
        console.log(import_chalk.default.blueBright("Starting in watch mode."));
      } else {
        console.log(import_chalk.default.blueBright("Starting."));
      }
      yield import_esbuild.default.build({
        target: "es6",
        format: "esm",
        inject: (0, import_get_polyfills.getPolyfills)(this),
        entryPoints: [import_path.default.resolve(this.cwd, this.config.entrypoint)],
        outfile: import_path.default.resolve(this.cwd, this.config.outDir, "index.js"),
        plugins: (0, import_get_plugins.getPlugins)(this),
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
    (0, import_clify.configure)((main) => {
      main.setDisplayName("react-gnome");
      main.setDescription("Build GTK apps with React.");
      const buildCommand = main.addSubCommand("build", () => new BuildProgram());
      const startCommand = main.addSubCommand("start", () => new StartProgram());
      buildCommand.setDescription("Build and bundle the app into a single file.");
      startCommand.setDescription("Build, bundle and open the app.");
    });
  });
}
