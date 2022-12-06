export declare function parseConfig(filePath: string): Promise<{
    externalPackages?: string[] | undefined;
    minify?: boolean | undefined;
    treeShake?: boolean | undefined;
    esbuildPlugins?: {
        name: string;
        setup: (build: import("esbuild").PluginBuild) => void | Promise<void>;
    }[] | undefined;
    giVersions?: {
        Gtk?: "3.0" | undefined;
        Gdk?: string | undefined;
        Gio?: string | undefined;
        GLib?: string | undefined;
        GObject?: string | undefined;
        Pango?: string | undefined;
        Atk?: string | undefined;
        Cairo?: string | undefined;
        GModule?: string | undefined;
        GdkPixbuf?: string | undefined;
        Cally?: string | undefined;
        Clutter?: string | undefined;
        ClutterX11?: string | undefined;
        Cogl?: string | undefined;
        Graphene?: string | undefined;
        Gst?: string | undefined;
        HarfBuzz?: string | undefined;
        Soup?: string | undefined;
        cairo?: string | undefined;
        xlib?: string | undefined;
    } | undefined;
    entrypoint: string;
    outDir: string;
}>;
