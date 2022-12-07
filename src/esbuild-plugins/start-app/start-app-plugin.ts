import type { ChildProcess } from "child_process";
import { spawn } from "child_process";
import type esbuild from "esbuild";

export const startAppPlugin = (directory: string, debug: boolean) => {
  let cleanup = () => {};

  return {
    name: "react-gtk-start-app-esbuild-plugin",
    setup(build: esbuild.PluginBuild) {
      let debuggerProcess: ChildProcess | undefined = undefined;

      if (debug) {
        debuggerProcess = spawn("npx", ["react-gtk-debugger"], {
          stdio: "inherit",
          cwd: directory,
        });

        debuggerProcess.stdout?.on("data", (data) => {
          console.log(data.toString());
        });
      }

      build.onEnd(async () => {
        cleanup();

        // spawn the bash process
        const child = spawn("gjs", ["-m", "./index.js"], {
          stdio: "inherit",
          shell: true,
          cwd: directory,
        });

        const onChildOutput = (data: any) => {
          console.log(data.toString());
        };

        const onChildError = (data: any) => {
          console.error(data.toString());
        };

        const onExit = () => {
          process.kill(process.pid, "SIGINT");
          debuggerProcess?.kill();
        };

        child.stdout?.on("data", onChildOutput);
        child.stderr?.on("data", onChildError);
        child.on("exit", onExit);

        cleanup = () => {
          child.stdout?.off("data", onChildOutput);
          child.stderr?.off("data", onChildError);
          child.off("exit", onExit);

          child.kill();
        };
      });
    },
  };
};
