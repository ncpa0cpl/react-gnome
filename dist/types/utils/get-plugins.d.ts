import type { Program } from "../build";
export declare const getPlugins: (program: Program) => {
    name: string;
    setup(build: import("esbuild").PluginBuild): void;
}[];
