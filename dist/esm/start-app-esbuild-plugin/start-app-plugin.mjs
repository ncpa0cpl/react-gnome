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

// src/start-app-esbuild-plugin/start-app-plugin.ts
import { spawn } from "child_process";
var startAppPlugin = (directory) => {
  let cleanup = () => {
  };
  return {
    name: "react-gtk-start-app-esbuild-plugin",
    setup(build) {
      build.onEnd(() => __async(this, null, function* () {
        cleanup();
        const child = spawn("gjs", ["-m", "./index.js"], {
          stdio: "inherit",
          shell: true,
          cwd: directory
        });
        const onExit = () => {
          process.exit();
        };
        child.on("exit", onExit);
        cleanup = () => {
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
