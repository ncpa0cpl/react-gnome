var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/esbuild-plugins/start-app/start-app-plugin.ts
import { execSync, spawn } from "child_process";
var startAppPlugin = (directory) => {
  let cleanup = () => {
  };
  const pid = process.pid;
  return {
    name: "react-gnome-start-app-esbuild-plugin",
    setup(build) {
      build.onEnd(() => __async(this, null, function* () {
        var _a, _b;
        cleanup();
        const child = spawn("gjs", ["-m", "./index.js"], {
          stdio: "inherit",
          shell: true,
          cwd: directory
        });
        const onChildOutput = (data) => {
          console.log(data.toString());
        };
        const onChildError = (data) => {
          console.error(data.toString());
        };
        const onExit = () => {
          const subProcesses = execSync(`pgrep -P ${pid}`).toString().trim().split("\n");
          for (const subProcess of subProcesses) {
            const subProcessPid = parseInt(subProcess);
            if (!isNaN(subProcessPid))
              process.kill(subProcessPid, "SIGINT");
          }
          process.kill(process.pid, "SIGINT");
        };
        (_a = child.stdout) == null ? void 0 : _a.on("data", onChildOutput);
        (_b = child.stderr) == null ? void 0 : _b.on("data", onChildError);
        child.on("exit", onExit);
        cleanup = () => {
          var _a2, _b2;
          (_a2 = child.stdout) == null ? void 0 : _a2.off("data", onChildOutput);
          (_b2 = child.stderr) == null ? void 0 : _b2.off("data", onChildError);
          child.off("exit", onExit);
          child.kill();
        };
      }));
    }
  };
};
export {
  startAppPlugin
};
