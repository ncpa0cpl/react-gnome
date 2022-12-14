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

// src/utils/get-polyfills.ts
var get_polyfills_exports = {};
__export(get_polyfills_exports, {
  getPolyfills: () => getPolyfills
});
module.exports = __toCommonJS(get_polyfills_exports);
var import_path = __toESM(require("path"));
var import_get_dirpath = require("../get-dirpath/get-dirpath.js");
var getPolyfills = (program) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  if ((_a = program.config.polyfills) == null ? void 0 : _a.XMLHttpRequest) {
    program.config.polyfills.URL = true;
  }
  if ((_b = program.config.polyfills) == null ? void 0 : _b.URL) {
    program.config.polyfills.Buffer = true;
  }
  const polyfills = [];
  const rootPath = (0, import_get_dirpath.getDirPath)();
  if ((_c = program.config.polyfills) == null ? void 0 : _c.fetch) {
    polyfills.push(import_path.default.resolve(rootPath, "polyfills/esm/fetch.mjs"));
  }
  if ((_d = program.config.polyfills) == null ? void 0 : _d.Buffer) {
    polyfills.push(import_path.default.resolve(rootPath, "polyfills/esm/buffer.mjs"));
  }
  if ((_e = program.config.polyfills) == null ? void 0 : _e.Blob) {
    polyfills.push(import_path.default.resolve(rootPath, "polyfills/esm/blob.mjs"));
  }
  if ((_f = program.config.polyfills) == null ? void 0 : _f.URL) {
    polyfills.push(import_path.default.resolve(rootPath, "polyfills/esm/url.mjs"));
  }
  if ((_g = program.config.polyfills) == null ? void 0 : _g.FormData) {
    polyfills.push(import_path.default.resolve(rootPath, "polyfills/esm/form-data.mjs"));
  }
  if ((_h = program.config.polyfills) == null ? void 0 : _h.XMLHttpRequest) {
    polyfills.push(
      import_path.default.resolve(rootPath, "polyfills/esm/xml-http-request.mjs")
    );
  }
  if ((_i = program.config.polyfills) == null ? void 0 : _i.base64) {
    polyfills.push(import_path.default.resolve(rootPath, "polyfills/esm/base64.mjs"));
  }
  if ((_j = program.config.polyfills) == null ? void 0 : _j.AbortController) {
    polyfills.push(
      import_path.default.resolve(rootPath, "polyfills/esm/abort-controller.mjs")
    );
  }
  return polyfills;
};
