import { Argument } from "clify.js";
import type esbuild from "esbuild";
import type { Config } from "../config/config-schema";
import type { AppResources } from "../utils/app-resources";
import { EnvVars } from "../utils/env-vars";
import { handleProgramError } from "../utils/handle-program-error";
import { parseEnvVarConfig } from "../utils/parse-env-var-config";
import { readConfig } from "../utils/read-config";

type MapArgRecord<A extends Record<string, Argument<any, any>>> = {
  [K in keyof A]: A[K]["value"];
};

const WatchArgument = Argument.define({
  flagChar: "-w",
  keyword: "--watch",
  dataType: "boolean",
});

const BuildModeArgument = Argument.define({
  flagChar: "-m",
  keyword: "--mode",
  dataType: "string",
  description: "The build mode, either 'development' or 'production'.",
});

export abstract class Program {
  envs = new EnvVars();
  config!: Readonly<Config>;
  cwd = process.cwd();
  resources?: AppResources;

  readonly args = {
    watch: new WatchArgument(),
    mode: new BuildModeArgument(),
  } as const;

  get isDev() {
    return this.args.mode.value === "development";
  }

  get watchMode() {
    return this.args.watch.value || false;
  }

  get appName() {
    return this.config.applicationName.replace(/[^\w\d]/g, "");
  }

  abstract additionalPlugins(): {
    before?: esbuild.Plugin[];
    after?: esbuild.Plugin[];
  };

  private populateDefaultEnvVars() {
    parseEnvVarConfig(this);

    this.envs.define("appName", this.config.applicationName);
    this.envs.define("appVersion", this.config.applicationVersion);
    this.envs.define("appId", `org.gnome.${this.config.applicationName}`);
    this.envs.define("mode", this.isDev ? "development" : "production");
  }

  /** @internal */
  abstract main<T extends this>(program: T): any;

  /** @internal */
  async run() {
    try {
      this.config = await readConfig(this);
      this.populateDefaultEnvVars();
      return await this.main(this);
    } catch (e) {
      handleProgramError(e);
    }
  }

  async runWith(
    args: MapArgRecord<this["args"]>,
    config: Config,
    workingDir?: string
  ) {
    try {
      if (workingDir) {
        this.cwd = workingDir;
      }
      this.config = config;
      for (const [key, value] of Object.entries(args)) {
        // @ts-ignore
        const arg: Argument<any, any> = this.args[key];
        if (arg) {
          arg.setDefault(value);
        }
      }

      // Freeze the config and args to prevent accidental modification during
      // the execution of the program.
      Object.freeze(this);
      Object.freeze(this.args);
      Object.freeze(this.config);

      this.populateDefaultEnvVars();

      return await this.main(this);
    } catch (e) {
      handleProgramError(e);
    }
  }
}
