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

// src/config/eval-js-config/eval-js-config.cjs.ts
var eval_js_config_cjs_exports = {};
__export(eval_js_config_cjs_exports, {
  evalJsConfigFile: () => evalJsConfigFile
});
module.exports = __toCommonJS(eval_js_config_cjs_exports);
var path = require("path");
var getDefault = (module2) => typeof module2 === "object" && "default" in module2 ? module2.default : module2;
var evalJsConfigFile = (config) => __async(void 0, null, function* () {
  const ext = path.extname(config);
  if (ext === ".mjs" || ext === ".mts") {
    throw new Error(
      `Invalid config file type: '${ext}'. react-gnome is running in CommonJS mode and can accept only configs in CommonJS module format. To use ESModules, set the 'type' field in your package.json to 'module'.`
    );
  }
  const defaultExport = getDefault(require(config));
  if (typeof defaultExport === "function") {
    return defaultExport;
  }
  throw new Error(
    `The default export of the config file must be a function, but it was a ${typeof defaultExport}`
  );
});
