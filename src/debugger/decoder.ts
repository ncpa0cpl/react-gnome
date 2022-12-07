export class Decoder {
  /** Decodes a string of hex numbers into a string of characters. */
  static decode(input: string) {
    let output = "";
    for (let i = 0; i < input.length; i += 2) {
      const charCode = parseInt(input.substr(i, 2), 16);
      output += String.fromCharCode(charCode);
    }
    return output;
  }
}
