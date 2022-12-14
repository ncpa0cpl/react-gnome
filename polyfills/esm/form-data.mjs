// src/polyfills/form-data.ts
var FormData = class {
  _entries = /* @__PURE__ */ new Map();
  append(name, value) {
    if (this._entries.has(name)) {
      this._entries.get(name).push(value);
    } else {
      this._entries.set(name, [value]);
    }
  }
  delete(name) {
    this._entries.delete(name);
  }
  get(name) {
    const entry = this._entries.get(name);
    return entry && entry[0] ? entry[0] : null;
  }
  getAll(name) {
    const entry = this._entries.get(name);
    return entry ? entry : [];
  }
  has(name) {
    return this._entries.has(name);
  }
  set(name, value) {
    this._entries.set(name, [value]);
  }
  forEach(callbackfn) {
    this._entries.forEach((value, key) => {
      value.forEach((value2) => {
        callbackfn(value2, key, this);
      });
    });
  }
  entries() {
    const entries = this._entries;
    const generator = function* () {
      for (const [key, value] of entries) {
        for (const v of value) {
          yield [key, v];
        }
      }
    };
    return generator();
  }
  keys() {
    return this._entries.keys();
  }
  values() {
    const entries = this._entries;
    const generator = function* () {
      for (const [key, value] of entries) {
        for (const v of value) {
          yield v;
        }
      }
    };
    return generator();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
export {
  FormData
};
