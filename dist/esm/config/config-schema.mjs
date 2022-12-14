// src/config/config-schema.ts
import { DataType, OptionalField } from "dilswer";
var EsbuildPluginDataType = DataType.Custom(
  (v) => {
    return typeof v === "object" && v != null;
  }
);
var ConfigSchema = DataType.RecordOf({
  entrypoint: DataType.String,
  outDir: DataType.String,
  externalPackages: OptionalField(DataType.ArrayOf(DataType.String)),
  minify: OptionalField(DataType.Boolean),
  treeShake: OptionalField(DataType.Boolean),
  esbuildPlugins: OptionalField(DataType.ArrayOf(EsbuildPluginDataType)),
  giVersions: OptionalField(
    DataType.RecordOf({
      Gtk: OptionalField(DataType.Literal("3.0")),
      Gdk: OptionalField(DataType.String),
      Gio: OptionalField(DataType.String),
      GLib: OptionalField(DataType.String),
      GObject: OptionalField(DataType.String),
      Pango: OptionalField(DataType.String),
      Atk: OptionalField(DataType.String),
      Cairo: OptionalField(DataType.String),
      GModule: OptionalField(DataType.String),
      GdkPixbuf: OptionalField(DataType.String),
      Cally: OptionalField(DataType.String),
      Clutter: OptionalField(DataType.String),
      ClutterX11: OptionalField(DataType.String),
      Cogl: OptionalField(DataType.String),
      Graphene: OptionalField(DataType.String),
      Gst: OptionalField(DataType.String),
      HarfBuzz: OptionalField(DataType.String),
      Soup: OptionalField(DataType.String),
      cairo: OptionalField(DataType.String),
      xlib: OptionalField(DataType.String)
    })
  ),
  polyfills: OptionalField(
    DataType.RecordOf({
      AbortController: OptionalField(DataType.Boolean),
      Blob: OptionalField(DataType.Boolean),
      Buffer: OptionalField(DataType.Boolean),
      FormData: OptionalField(DataType.Boolean),
      URL: OptionalField(DataType.Boolean),
      XMLHttpRequest: OptionalField(DataType.Boolean),
      base64: OptionalField(DataType.Boolean),
      fetch: OptionalField(DataType.Boolean)
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
export {
  ConfigSchema,
  EsbuildPluginDataType
};
