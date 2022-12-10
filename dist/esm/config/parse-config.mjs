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

// src/config/parse-config.ts
import { assertDataType } from "dilswer";
import fs from "fs/promises";
import path from "path";
import { ConfigSchema } from "./config-schema.mjs";
import { evalJsConfigFile } from "./eval-js-config/eval-js-config.mjs";
function parseJsonConfig(filePath) {
  return __async(this, null, function* () {
    const fileData = yield fs.readFile(filePath, "utf-8");
    const config = JSON.parse(fileData);
    assertDataType(ConfigSchema, config);
    return config;
  });
}
function parseJsConfig(filePath, context) {
  return __async(this, null, function* () {
    const getConfig = yield evalJsConfigFile(filePath);
    const config = getConfig(context);
    assertDataType(ConfigSchema, config);
    return config;
  });
}
function parseConfig(filePath, context) {
  const p = path.parse(filePath);
  if (p.ext === ".json") {
    return parseJsonConfig(filePath);
  } else if ([".js", ".cjs", ".mjs", ".ts", ".cts", ".mts"].includes(p.ext)) {
    return parseJsConfig(filePath, context);
  } else {
    throw new Error(`Unsupported config file type: '${p.ext}'.`);
  }
}
export {
  parseConfig
};
