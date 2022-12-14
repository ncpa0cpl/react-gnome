import type { GetDataType } from "dilswer";
import type esbuild from "esbuild";
export declare const EsbuildPluginDataType: import("dilswer").Custom<(v: any) => v is esbuild.Plugin>;
export declare const ConfigSchema: import("dilswer").RecordOf<{
    entrypoint: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
    outDir: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
    externalPackages: {
        readonly type: import("dilswer").ArrayOf<[import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">]>;
        readonly required: false;
    };
    minify: {
        readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
        readonly required: false;
    };
    treeShake: {
        readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
        readonly required: false;
    };
    esbuildPlugins: {
        readonly type: import("dilswer").ArrayOf<[import("dilswer").Custom<(v: any) => v is esbuild.Plugin>]>;
        readonly required: false;
    };
    giVersions: {
        readonly type: import("dilswer").RecordOf<{
            Gtk: {
                readonly type: import("dilswer").Literal<"3.0">;
                readonly required: false;
            };
            Gdk: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Gio: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            GLib: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            GObject: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Pango: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Atk: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Cairo: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            GModule: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            GdkPixbuf: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Cally: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Clutter: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            ClutterX11: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Cogl: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Graphene: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Gst: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            HarfBuzz: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            Soup: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            cairo: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
            xlib: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
                readonly required: false;
            };
        }>;
        readonly required: false;
    };
    polyfills: {
        readonly type: import("dilswer").RecordOf<{
            AbortController: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            Blob: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            Buffer: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            FormData: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            URL: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            XMLHttpRequest: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            base64: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
            fetch: {
                readonly type: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
                readonly required: false;
            };
        }>;
        readonly required: false;
    };
}>;
export declare type Config = GetDataType<typeof ConfigSchema>;
export declare type GiVersions = Config["giVersions"];
