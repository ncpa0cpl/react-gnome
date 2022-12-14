// src/polyfills/abort-controller.ts
var [AbortSignalPolyfill, AbortControllerPolyfill, AbortError] = (() => {
  let Events;
  ((Events2) => {
    Events2["Abort"] = "abort";
  })(Events || (Events = {}));
  class EventController {
    listeners = /* @__PURE__ */ new Map();
    constructor() {
    }
    add(event, listener) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(listener);
    }
    remove(event, listener) {
      if (!this.listeners.has(event)) {
        return;
      }
      const listeners = this.listeners.get(event);
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
    emit(event, ev) {
      if (!this.listeners.has(event)) {
        return;
      }
      this.listeners.get(event).forEach(async (listener) => {
        try {
          await listener(ev);
        } catch (e) {
          console.error(e);
        }
      });
    }
    clear() {
      this.listeners.clear();
    }
  }
  class AbortError2 extends Error {
    constructor(message) {
      super(message);
      this.name = "AbortError";
    }
  }
  class AbortSignal {
    static abort(reason) {
      const signal = new AbortSignal();
      signal._abort(reason ?? new AbortError2("Signal was aborted."));
      return signal;
    }
    static timeout(time) {
      const signal = new AbortSignal();
      setTimeout(() => {
        if (!signal.aborted)
          signal._abort(new AbortError2("Timeout"));
      }, time);
      return signal;
    }
    _events = new EventController();
    _isAborted = false;
    _reason = null;
    onabort = null;
    get aborted() {
      return this._isAborted;
    }
    get reason() {
      return this._reason;
    }
    constructor() {
      this._events.add(
        "abort" /* Abort */,
        () => this.onabort && this.onabort(new Event("abort" /* Abort */))
      );
    }
    _abort(reason) {
      if (this._isAborted) {
        return;
      }
      this._isAborted = true;
      this._reason = reason ?? new AbortError2("Signal was aborted.");
      this._events.emit("abort" /* Abort */, new Event("abort" /* Abort */));
      this._events.clear();
    }
    throwIfAborted() {
      if (this._isAborted) {
        throw this._reason;
      }
    }
    addEventListener(event, listener) {
      this._events.add(event, listener);
    }
    removeEventListener(event, listener) {
      this._events.remove(event, listener);
    }
  }
  class AbortController {
    _signal = new AbortSignal();
    get signal() {
      return this._signal;
    }
    abort() {
      this._signal["_abort"]();
    }
  }
  return [AbortSignal, AbortController, AbortError2];
})();
export {
  AbortControllerPolyfill as AbortController,
  AbortError,
  AbortSignalPolyfill as AbortSignal
};
