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
import fs from "fs";
import path from "path";
import { parseConfig } from "../config/parse-config.mjs";
var readConfig = (program) => __async(void 0, null, function* () {
  const cwdFiles = fs.readdirSync(program.cwd);
  const filename = cwdFiles.find((f) => f.startsWith("react-gnome.config."));
  if (!filename) {
    throw new Error("No config file found.");
  }
  const config = yield parseConfig(path.join(program.cwd, filename), {
    mode: program.isDev ? "development" : "production"
  });
  return config;
});
export {
  readConfig
};
