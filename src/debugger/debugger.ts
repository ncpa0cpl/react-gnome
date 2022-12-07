import gi from "node-gtk";
import { BreakpointBox } from "./debugger-components/breakpoin-box";
import { DebugControls } from "./debugger-components/controls";
import { IpcDebuggerServer } from "./ipc-server";
const Gtk = gi.require("Gtk", "3.0");

const ipcServer = new IpcDebuggerServer();

gi.startLoop();
Gtk.init();

const win = new Gtk.Window();
win.title = "React-GTK Debugger";
win.on("destroy", () => {
  Gtk.mainQuit();
  process.exit(0);
});
win.on("delete-event", () => false);
win.setDefaultSize(200, 80);

const mainContainer = new Gtk.Box();

const controls = new DebugControls(mainContainer);
const breakpointBox = new BreakpointBox(mainContainer);

ipcServer.listen((breakpoint) => {
  console.log("updating ui");

  controls.onClick = () => {
    breakpoint.continue();
    breakpointBox.hide();
  };

  breakpointBox.show(breakpoint.message);
});

win.add(mainContainer);
win.showAll();
Gtk.main();
