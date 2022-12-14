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

// src/config/eval-js-config/eval-js-config.esm.ts
import path from "path";
var evalJsConfigFile = (config) => __async(void 0, null, function* () {
  const ext = path.extname(config);
  if (ext === ".cjs" || ext === ".cts" || ext === ".ts") {
    throw new Error(
      `Invalid config file type: '${ext}'. react-gnome is running in ESModule mode and can accept only configs in ESModule format. To use CommonJS, set the 'type' field in your package.json to 'commonjs'.`
    );
  }
  const defaultExport = yield import(config);
  if (typeof defaultExport.default === "function") {
    return defaultExport.default;
  }
  throw new Error(
    `The default export of the config file must be a function, but it was a ${typeof defaultExport.default}`
  );
});
export {
  evalJsConfigFile
};
