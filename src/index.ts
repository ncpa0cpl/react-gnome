export type { Config as BuildConfig } from "./config/config-schema";

declare global {
  class Debugger {
    static breakpoint(data: object): void;
  }
}
