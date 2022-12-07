import gi from "node-gtk";
const Gtk = gi.require("Gtk", "3.0");

export class BreakpointBox {
  private box = new Gtk.Box();
  private frame = new Gtk.Frame();
  private label = new Gtk.Label();

  constructor(window: any) {
    this.box.margin = 10;
    this.box.add(this.frame);
    window.add(this.box);
  }

  show(message: object) {
    this.label.label = JSON.stringify(message);
    this.box.showAll();
  }

  hide() {
    this.label.label = "";
    this.box.showAll();
  }
}
