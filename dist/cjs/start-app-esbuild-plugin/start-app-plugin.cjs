"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/start-app-esbuild-plugin/start-app-plugin.ts
var start_app_plugin_exports = {};
__export(start_app_plugin_exports, {
  startAppPlugin: () => startAppPlugin
});
module.exports = __toCommonJS(start_app_plugin_exports);
var import_child_process = require("child_process");
var startAppPlugin = (directory) => {
  let cleanup = () => {
  };
  return {
    name: "react-gtk-start-app-esbuild-plugin",
    setup(build) {
      build.onEnd(() => __async(this, null, function* () {
        cleanup();
        const child = (0, import_child_process.spawn)("gjs", ["-m", "./index.js"], {
          stdio: "inherit",
          shell: true,
          cwd: directory
        });
        const onExit = () => {
          process.exit();
        };
        child.on("exit", onExit);
        cleanup = () => {
          child.off("exit", onExit);
          child.kill();
        };
      }));
    }
  };
};
