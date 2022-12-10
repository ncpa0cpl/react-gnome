import type esbuild from "esbuild";
export declare const watchLoggerPlugin: () => {
    name: string;
    setup(build: esbuild.PluginBuild): void;
};
