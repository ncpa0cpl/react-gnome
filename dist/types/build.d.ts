import { Argument } from "clify.js";
import esbuild from "esbuild";
import type { Config } from "./config/config-schema";
declare type MapArgRecord<A extends Record<string, Argument<any, any>>> = {
    [K in keyof A]: A[K]["value"];
};
declare abstract class Program {
    config: Readonly<Config>;
    cwd: string;
    readonly args: {
        readonly watch: Argument<"boolean", false>;
        readonly mode: Argument<"string", false>;
    };
    get isDev(): boolean;
    get watchMode(): boolean;
    abstract additionalPlugins(): {
        before?: esbuild.Plugin[];
        after?: esbuild.Plugin[];
    };
    runWith(args: MapArgRecord<this["args"]>, config: Config, workingDir?: string): Promise<any>;
}
export type { Program };
export declare class BuildProgram extends Program {
    additionalPlugins(): {};
}
export declare class StartProgram extends Program {
    additionalPlugins(): {
        before: {
            name: string;
            setup(build: esbuild.PluginBuild): void;
        }[];
    };
}
/** Invokes the CLI program that builds the app. */
export declare function build(): Promise<void>;
