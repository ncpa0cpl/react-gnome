import ipc from "node-ipc";

ipc.config.id = "com.react-gnome.debugger-breakpoint";
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.connectTo("com.react-gnome.debugger", () => {
  ipc.of["com.react-gnome.debugger"]!.on("connect", () => {
    const firstArgument = process.argv[2] ?? "";
    ipc.of["com.react-gnome.debugger"]!.emit(
      "breakpoint-reached",
      firstArgument
    );
  });

  ipc.of["com.react-gnome.debugger"]!.on("continue", () => {
    process.exit(0);
  });
});
