// src/esbuild-plugins/watch-logger/watch-logger-plugin.ts
import chalk from "chalk";
var watchLoggerPlugin = () => {
  let isFirstBuild = true;
  return {
    name: "react-gnome-watch-logger-esbuild-plugin",
    setup(build) {
      build.onStart(() => {
        if (!isFirstBuild) {
          console.log(chalk.yellowBright("Changes detected, rebuilding..."));
        } else {
          isFirstBuild = false;
        }
      });
    }
  };
};
export {
  watchLoggerPlugin
};
