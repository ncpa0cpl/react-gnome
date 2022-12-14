// src/utils/get-polyfills.ts
import path from "path";
import { getDirPath } from "../get-dirpath/get-dirpath.mjs";
var getPolyfills = (program) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  if ((_a = program.config.polyfills) == null ? void 0 : _a.XMLHttpRequest) {
    program.config.polyfills.URL = true;
  }
  if ((_b = program.config.polyfills) == null ? void 0 : _b.URL) {
    program.config.polyfills.Buffer = true;
  }
  const polyfills = [];
  const rootPath = getDirPath();
  if ((_c = program.config.polyfills) == null ? void 0 : _c.fetch) {
    polyfills.push(path.resolve(rootPath, "polyfills/esm/fetch.mjs"));
  }
  if ((_d = program.config.polyfills) == null ? void 0 : _d.Buffer) {
    polyfills.push(path.resolve(rootPath, "polyfills/esm/buffer.mjs"));
  }
  if ((_e = program.config.polyfills) == null ? void 0 : _e.Blob) {
    polyfills.push(path.resolve(rootPath, "polyfills/esm/blob.mjs"));
  }
  if ((_f = program.config.polyfills) == null ? void 0 : _f.URL) {
    polyfills.push(path.resolve(rootPath, "polyfills/esm/url.mjs"));
  }
  if ((_g = program.config.polyfills) == null ? void 0 : _g.FormData) {
    polyfills.push(path.resolve(rootPath, "polyfills/esm/form-data.mjs"));
  }
  if ((_h = program.config.polyfills) == null ? void 0 : _h.XMLHttpRequest) {
    polyfills.push(
      path.resolve(rootPath, "polyfills/esm/xml-http-request.mjs")
    );
  }
  if ((_i = program.config.polyfills) == null ? void 0 : _i.base64) {
    polyfills.push(path.resolve(rootPath, "polyfills/esm/base64.mjs"));
  }
  if ((_j = program.config.polyfills) == null ? void 0 : _j.AbortController) {
    polyfills.push(
      path.resolve(rootPath, "polyfills/esm/abort-controller.mjs")
    );
  }
  return polyfills;
};
export {
  getPolyfills
};
