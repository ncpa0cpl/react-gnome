// src/esbuild-plugin/default-gi-imports.ts
var GiImport = class {
  constructor(name) {
    this.name = name;
  }
  get(version) {
    return `import ${this.name} from "gi://${this.name}${version ? `?version=${version}` : ""}";`;
  }
};
var Gtk = new GiImport("Gtk");
var Gdk = new GiImport("Gdk");
var Gio = new GiImport("Gio");
var GLib = new GiImport("GLib");
var GObject = new GiImport("GObject");
var Pango = new GiImport("Pango");
var Atk = new GiImport("Atk");
var GModule = new GiImport("GModule");
var GdkPixbuf = new GiImport("GdkPixbuf");
var Cally = new GiImport("Cally");
var Clutter = new GiImport("Clutter");
var ClutterX11 = new GiImport("ClutterX11");
var Cogl = new GiImport("Cogl");
var Graphene = new GiImport("Graphene");
var Gst = new GiImport("Gst");
var HarfBuzz = new GiImport("HarfBuzz");
var Soup = new GiImport("Soup");
var cairo = new GiImport("cairo");
var xlib = new GiImport("xlib");
var getDefaultGiImports = (versions = {}) => [
  Gtk.get(versions.Gtk),
  Gdk.get(versions.Gdk),
  Gio.get(versions.Gio),
  GLib.get(versions.GLib),
  GObject.get(versions.GObject),
  Pango.get(versions.Pango),
  Atk.get(versions.Atk),
  GModule.get(versions.GModule),
  GdkPixbuf.get(versions.GdkPixbuf),
  Cally.get(versions.Cally),
  Clutter.get(versions.Clutter),
  ClutterX11.get(versions.ClutterX11),
  Cogl.get(versions.Cogl),
  Graphene.get(versions.Graphene),
  Gst.get(versions.Gst),
  HarfBuzz.get(versions.HarfBuzz),
  Soup.get(versions.Soup),
  cairo.get(versions.cairo),
  xlib.get(versions.xlib)
].join("\n");
export {
  getDefaultGiImports
};
