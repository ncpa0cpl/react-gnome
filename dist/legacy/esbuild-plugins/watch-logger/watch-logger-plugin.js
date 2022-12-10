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

// src/esbuild-plugins/watch-logger/watch-logger-plugin.ts
var watch_logger_plugin_exports = {};
__export(watch_logger_plugin_exports, {
  watchLoggerPlugin: () => watchLoggerPlugin
});
module.exports = __toCommonJS(watch_logger_plugin_exports);
var import_chalk = __toESM(require("chalk"));
var watchLoggerPlugin = () => {
  let isFirstBuild = true;
  return {
    name: "react-gnome-watch-logger-esbuild-plugin",
    setup(build) {
      build.onStart(() => {
        if (!isFirstBuild) {
          console.log(import_chalk.default.yellowBright("Changes detected, rebuilding..."));
        } else {
          isFirstBuild = false;
        }
      });
    }
  };
};
