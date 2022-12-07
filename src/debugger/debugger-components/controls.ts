import gi from "node-gtk";
const Gtk = gi.require("Gtk", "3.0");

export class DebugControls {
  private box = new Gtk.Box();
  private continueButton = new Gtk.Button({ label: "Continue" });

  public onClick = () => {};

  constructor(window: any) {
    this.box.margin = 10;
    this.box.add(this.continueButton);
    window.add(this.box);

    this.continueButton.on("clicked", () => {
      this.onClick();
    });
  }
}
