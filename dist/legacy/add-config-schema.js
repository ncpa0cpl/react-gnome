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

// src/add-config-schema.ts
var add_config_schema_exports = {};
__export(add_config_schema_exports, {
  CONFIG_FILE_NAME: () => CONFIG_FILE_NAME,
  addConfigSchema: () => addConfigSchema,
  findProjectRoot: () => findProjectRoot
});
module.exports = __toCommonJS(add_config_schema_exports);
var import_promises = __toESM(require("fs/promises"));
var import_os = __toESM(require("os"));
var import_path = __toESM(require("path"));
var isWindows = import_os.default.platform() === "win32";
var isInsideNodeModules = (location) => {
  const parentDir = import_path.default.dirname(location);
  return parentDir.endsWith("node_modules");
};
var findProjectRoot = () => __async(void 0, null, function* () {
  let location = import_path.default.resolve(__dirname, "../..");
  let i = 0;
  while (true) {
    i++;
    if (isWindows && location.length < 4 || location.length < 2 || i >= 100) {
      throw new Error("Project root directory not found!");
    }
    if (!isInsideNodeModules(location)) {
      const files = yield import_promises.default.readdir(location);
      if (files.some((f) => f === "package.json"))
        return location;
    }
    location = import_path.default.resolve(location, "..");
  }
});
var CONFIG_FILE_NAME = "react-gtk.config.json";
var addConfigSchema = () => __async(void 0, null, function* () {
  const cwd = yield findProjectRoot();
  const vscodeDir = import_path.default.resolve(cwd, ".vscode");
  const vscodeSettingsFile = import_path.default.resolve(vscodeDir, "settings.json");
  yield import_promises.default.mkdir(vscodeDir, { recursive: true });
  let settings = {};
  const vscodeFiles = yield import_promises.default.readdir(vscodeDir);
  if (vscodeFiles.includes("settings.json")) {
    const f = yield import_promises.default.readFile(vscodeSettingsFile, { encoding: "utf-8" });
    settings = JSON.parse(f);
  }
  if (!settings["json.schemas"]) {
    settings["json.schemas"] = [];
  }
  if (!settings["json.schemas"].some((s) => {
    const isObject = typeof s === "object" && s !== null;
    if (isObject) {
      const fileMatch = s.fileMatch;
      if (Array.isArray(fileMatch)) {
        return fileMatch.includes(CONFIG_FILE_NAME);
      }
      return fileMatch === CONFIG_FILE_NAME;
    }
    return false;
  })) {
    const configPath = import_path.default.resolve(__dirname, "../config-schema.json");
    settings["json.schemas"].push({
      fileMatch: [CONFIG_FILE_NAME],
      url: "./" + import_path.default.relative(cwd, configPath)
    });
    yield import_promises.default.writeFile(vscodeSettingsFile, JSON.stringify(settings, null, 2));
  }
});
addConfigSchema();
