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

// src/utils/get-plugins.ts
var get_plugins_exports = {};
__export(get_plugins_exports, {
  getPlugins: () => getPlugins
});
module.exports = __toCommonJS(get_plugins_exports);
var import_react_gnome_plugin = require("../esbuild-plugins/react-gnome/react-gnome-plugin.cjs");
var import_watch_logger_plugin = require("../esbuild-plugins/watch-logger/watch-logger-plugin.cjs");
var getPlugins = (program) => {
  const additionalPlugins = program.additionalPlugins();
  const plugins = [(0, import_react_gnome_plugin.reactGnomePlugin)(program.config)];
  if (additionalPlugins.before) {
    plugins.push(...additionalPlugins.before);
  }
  if (program.watchMode) {
    plugins.push((0, import_watch_logger_plugin.watchLoggerPlugin)());
  }
  if (program.config.esbuildPlugins) {
    plugins.push(...program.config.esbuildPlugins);
  }
  if (additionalPlugins.after) {
    plugins.push(...additionalPlugins.after);
  }
  return plugins;
};