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

// src/config/config-schema.ts
var config_schema_exports = {};
__export(config_schema_exports, {
  ConfigSchema: () => ConfigSchema,
  EsbuildPluginDataType: () => EsbuildPluginDataType
});
module.exports = __toCommonJS(config_schema_exports);
var import_dilswer = require("dilswer");
var EsbuildPluginDataType = import_dilswer.DataType.Custom(
  (v) => {
    return typeof v === "object" && v != null;
  }
);
var ConfigSchema = import_dilswer.DataType.RecordOf({
  entrypoint: import_dilswer.DataType.String,
  outDir: import_dilswer.DataType.String,
  externalPackages: (0, import_dilswer.OptionalField)(import_dilswer.DataType.ArrayOf(import_dilswer.DataType.String)),
  minify: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
  treeShake: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
  esbuildPlugins: (0, import_dilswer.OptionalField)(import_dilswer.DataType.ArrayOf(EsbuildPluginDataType)),
  giVersions: (0, import_dilswer.OptionalField)(
    import_dilswer.DataType.RecordOf({
      Gtk: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Literal("3.0")),
      Gdk: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Gio: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      GLib: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      GObject: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Pango: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Atk: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Cairo: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      GModule: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      GdkPixbuf: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Cally: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Clutter: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      ClutterX11: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Cogl: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Graphene: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Gst: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      HarfBuzz: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      Soup: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      cairo: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String),
      xlib: (0, import_dilswer.OptionalField)(import_dilswer.DataType.String)
    })
  ),
  polyfills: (0, import_dilswer.OptionalField)(
    import_dilswer.DataType.RecordOf({
      AbortController: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      Blob: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      Buffer: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      FormData: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      URL: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      XMLHttpRequest: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      base64: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean),
      fetch: (0, import_dilswer.OptionalField)(import_dilswer.DataType.Boolean)
    })
  )
});
ConfigSchema.recordOf.entrypoint.setDescription(
  "The entrypoint file of the application.\nCan be a relative path from the project root or an absolute path."
);
ConfigSchema.recordOf.outDir.setDescription(
  "The output directory for the generated bundle.\nCan be a relative path from the project root or an absolute path."
);
ConfigSchema.recordOf.externalPackages.type.setDescription(
  "An array of packages that should be excluded from the bundle.\nThis is useful for packages that are already installed on the system and should not be bundled."
);
ConfigSchema.recordOf.minify.type.setDescription(
  "Whether the generated bundle should be minified.\nThis is useful for production builds.\nBy default is enabled in `production` mode and disabled in `development` mode."
);
ConfigSchema.recordOf.treeShake.type.setDescription(
  "Whether unused code should be removed from the bundle.\nThis is useful for production builds.\nBy default is enabled in `production` mode and disabled in `development` mode."
);
ConfigSchema.recordOf.esbuildPlugins.type.setDescription(
  "Esbuild plugins.\nPlugins can only be added via a JavaScript config file. If you are using a JSON config file and want to add a plugin, you will need to create a `react-gnome.config.js` file and use that instead."
);
ConfigSchema.recordOf.giVersions.type.setDescription(
  "The versions of the builtin libraries from the `gi://` namespace, that should be used in the generated bundle."
);
var polyfills = ConfigSchema.recordOf.polyfills.type;
polyfills.setDescription(
  "Polyfills that should be included in the generated bundle."
);
polyfills.recordOf.AbortController.type.setDescription(
  "Whether the polyfill for an `AbortController` should be included in the generated bundle. When enabled the `AbortController`, `AbortSignal` and `AbortError` classes will become available in the global scope."
);
polyfills.recordOf.Blob.type.setDescription(
  "Whether the polyfill for a `Blob` should be included in the generated bundle. When enabled the `Blob` class will become available in the global scope."
);
polyfills.recordOf.Buffer.type.setDescription(
  "Whether the polyfill for a `Buffer` should be included in the generated bundle. When enabled the `Buffer` class will become available in the global scope."
);
polyfills.recordOf.FormData.type.setDescription(
  "Whether the polyfill for a `FormData` should be included in the generated bundle. When enabled the `FormData` class will become available in the global scope."
);
polyfills.recordOf.URL.type.setDescription(
  "Whether the polyfill for a `URL` should be included in the generated bundle. When enabled the `URL` class will become available in the global scope."
);
polyfills.recordOf.XMLHttpRequest.type.setDescription(
  "Whether the polyfill for a `XMLHttpRequest` should be included in the generated bundle. When enabled the `XMLHttpRequest` class will become available in the global scope."
);
polyfills.recordOf.base64.type.setDescription(
  "Whether the polyfill for `atob()` and `btoa()` functions should be included in the generated bundle. When enabled the `atob()` and `btoa()` will become available in the global scope."
);
polyfills.recordOf.fetch.type.setDescription(
  "Whether the polyfill for a `fetch()` function should be included in the generated bundle. When enabled the `fetch()` function will become available in the global scope."
);
