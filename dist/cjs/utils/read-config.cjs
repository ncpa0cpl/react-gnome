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

// src/utils/read-config.ts
var read_config_exports = {};
__export(read_config_exports, {
  readConfig: () => readConfig
});
module.exports = __toCommonJS(read_config_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_parse_config = require("../config/parse-config.cjs");
var readConfig = (program) => __async(void 0, null, function* () {
  const cwdFiles = import_fs.default.readdirSync(program.cwd);
  const filename = cwdFiles.find((f) => f.startsWith("react-gnome.config."));
  if (!filename) {
    throw new Error("No config file found.");
  }
  const config = yield (0, import_parse_config.parseConfig)(import_path.default.join(program.cwd, filename), {
    mode: program.isDev ? "development" : "production"
  });
  return config;
});
