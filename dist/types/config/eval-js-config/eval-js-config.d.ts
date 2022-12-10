import type { ConfigContext } from "../parse-config";
export declare const evalJsConfigFile: (config: string) => Promise<(context: ConfigContext) => unknown>;
