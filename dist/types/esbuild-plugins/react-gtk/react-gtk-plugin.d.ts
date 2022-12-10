import type esbuild from "esbuild";
import type { Config } from "../../config/config-schema";
export declare const reactGtkPlugin: (config: Config) => {
    name: string;
    setup(build: esbuild.PluginBuild): void;
};
