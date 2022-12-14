// src/get-dirpath/get-dirpath.esm.ts
import path from "path";
import { fileURLToPath } from "url";
var import_meta = {};
var getDirPath = () => {
  const __dirname = fileURLToPath(new URL(".", import_meta.url));
  return path.resolve(__dirname, "../../..");
};
export {
  getDirPath
};
