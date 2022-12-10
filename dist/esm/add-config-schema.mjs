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
import fs from "fs/promises";
import os from "os";
import path from "path";
var isWindows = os.platform() === "win32";
var isInsideNodeModules = (location) => {
  const parentDir = path.dirname(location);
  return parentDir.endsWith("node_modules");
};
var findProjectRoot = () => __async(void 0, null, function* () {
  let location = path.resolve(__dirname, "../..");
  let i = 0;
  while (true) {
    i++;
    if (isWindows && location.length < 4 || location.length < 2 || i >= 100) {
      throw new Error("Project root directory not found!");
    }
    if (!isInsideNodeModules(location)) {
      const files = yield fs.readdir(location);
      if (files.some((f) => f === "package.json"))
        return location;
    }
    location = path.resolve(location, "..");
  }
});
var CONFIG_FILE_NAME = "react-gnome.config.json";
var addConfigSchema = () => __async(void 0, null, function* () {
  const cwd = yield findProjectRoot();
  const vscodeDir = path.resolve(cwd, ".vscode");
  const vscodeSettingsFile = path.resolve(vscodeDir, "settings.json");
  yield fs.mkdir(vscodeDir, { recursive: true });
  let settings = {};
  const vscodeFiles = yield fs.readdir(vscodeDir);
  if (vscodeFiles.includes("settings.json")) {
    const f = yield fs.readFile(vscodeSettingsFile, { encoding: "utf-8" });
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
    const configPath = path.resolve(__dirname, "../config-schema.json");
    settings["json.schemas"].push({
      fileMatch: [CONFIG_FILE_NAME],
      url: "./" + path.relative(cwd, configPath)
    });
    yield fs.writeFile(vscodeSettingsFile, JSON.stringify(settings, null, 2));
  }
});
addConfigSchema();
export {
  CONFIG_FILE_NAME,
  addConfigSchema,
  findProjectRoot
};
