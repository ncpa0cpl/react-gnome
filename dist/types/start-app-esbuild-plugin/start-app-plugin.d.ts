import type esbuild from "esbuild";
export declare const startAppPlugin: (directory: string) => {
    name: string;
    setup(build: esbuild.PluginBuild): void;
};
