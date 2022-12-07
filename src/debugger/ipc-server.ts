import ipc from "node-ipc";
import { Decoder } from "./decoder";

type Breakpoint = {
  message: object;
  continue(): void;
};

type BreakpointListener = (breakpoint: Breakpoint) => void;

export class IpcDebuggerServer {
  private breakpointListeners = new Map<symbol, BreakpointListener>();

  constructor() {
    ipc.config.id = "com.react-gnome.debugger";
    ipc.config.retry = 1500;
    ipc.config.silent = true;

    ipc.serve(() => {
      ipc.server.on("breakpoint-reached", (message, socket) => {
        console.log("breakpoint intercepted by the debugger");

        this.emit(this.parseMessage(message), () => {
          console.log("continuing execution");

          ipc.server.emit(socket, "continue", "");
        });
      });
    });

    ipc.server.start();
  }

  private parseMessage(message: string): object {
    const str = Decoder.decode(message);
    const obj = JSON.parse(str);

    if (typeof obj !== "object" || obj === null) {
      console.log("Invalid message received: ", message);
      return {};
    }

    return obj;
  }

  private emit(message: object, continueCallback: () => void) {
    this.breakpointListeners.forEach((breakpointListener) => {
      breakpointListener({
        message,
        continue: continueCallback,
      });
    });
  }

  listen(breakpointListener: BreakpointListener): { stop(): void } {
    const id = Symbol();
    this.breakpointListeners.set(id, breakpointListener);

    return {
      stop: () => {
        this.breakpointListeners.delete(id);
      },
    };
  }
}
