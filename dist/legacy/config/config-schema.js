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
  )
});
ConfigSchema.recordOf.entrypoint.setDescription(
  "The entrypoint file of the application.\n\nCan be a relative path from the project root or an absolute path."
);
ConfigSchema.recordOf.outDir.setDescription(
  "The output directory for the generated bundle.\n\nCan be a relative path from the project root or an absolute path."
);
ConfigSchema.recordOf.externalPackages.type.setDescription(
  "An array of packages that should be excluded from the bundle.\n\nThis is useful for packages that are already installed on the system and should not be bundled."
);
ConfigSchema.recordOf.minify.type.setDescription(
  "Whether the generated bundle should be minified.\n\nThis is useful for production builds."
);
ConfigSchema.recordOf.esbuildPlugins.type.setDescription(
  "Esbuild plugins. Plugins can only be added via a JavaScript config file. If you are using a JSON config file and want to add a plugin, you will need to create a `react-gtk.config.js` file and use that instead."
);
ConfigSchema.recordOf.giVersions.type.setDescription(
  "The versions of the builtin libraries from the `gi://` namespace, that should be used in the generated bundle."
);
