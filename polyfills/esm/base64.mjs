// src/polyfills/base64.ts
import GLib from "gi://GLib";
function atob(data) {
  const decodedData = GLib.base64_decode(data);
  return new TextDecoder().decode(decodedData);
}
function btoa(data) {
  const buffer = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    buffer[i] = data.charCodeAt(i);
  }
  return GLib.base64_encode(buffer, buffer.byteLength);
}
export {
  atob,
  btoa
};
