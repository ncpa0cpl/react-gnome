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
export {
  ConfigSchema,
  EsbuildPluginDataType
};
