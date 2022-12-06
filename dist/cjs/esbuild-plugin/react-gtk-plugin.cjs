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

// src/esbuild-plugin/react-gtk-plugin.ts
var react_gtk_plugin_exports = {};
__export(react_gtk_plugin_exports, {
  reactGtkPlugin: () => reactGtkPlugin
});
module.exports = __toCommonJS(react_gtk_plugin_exports);
var import_promises = __toESM(require("fs/promises"));
var import_default_gi_imports = require("./default-gi-imports.cjs");
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
        const outputFile = yield import_promises.default.readFile(
          build.initialOptions.outfile,
          "utf8"
        );
        const imports = (0, import_default_gi_imports.getDefaultGiImports)(config.giVersions);
        yield import_promises.default.writeFile(
          build.initialOptions.outfile,
          [imports, outputFile].join("\n")
        );
      }));
    }
  };
};
