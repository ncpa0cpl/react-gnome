import { reactGnomePlugin } from "../esbuild-plugins/react-gnome/react-gnome-plugin";
import { watchLoggerPlugin } from "../esbuild-plugins/watch-logger/watch-logger-plugin";
import type { Program } from "../programs/base";

export const getPlugins = (program: Program) => {
  const additionalPlugins = program.additionalPlugins();

  const plugins = [reactGnomePlugin(program.config, program.resources)];

  if (additionalPlugins.before) {
    plugins.push(...additionalPlugins.before);
  }

  if (program.watchMode) {
    plugins.push(watchLoggerPlugin());
  }

  if (program.config.esbuildPlugins) {
    plugins.push(...program.config.esbuildPlugins);
  }

  if (additionalPlugins.after) {
    plugins.push(...additionalPlugins.after);
  }

  return plugins;
};
