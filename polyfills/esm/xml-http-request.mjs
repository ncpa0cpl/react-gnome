// src/polyfills/xml-http-request.ts
import Soup from "gi://Soup";
var XMLHttpRequestPolyfill = (() => {
  let RequestEvents;
  ((RequestEvents2) => {
    RequestEvents2["READY_STATE_CHANGE"] = "readystatechange";
    RequestEvents2["ABORT"] = "abort";
    RequestEvents2["ERROR"] = "error";
    RequestEvents2["LOAD"] = "load";
    RequestEvents2["LOAD_END"] = "loadend";
    RequestEvents2["LOAD_START"] = "loadstart";
    RequestEvents2["PROGRESS"] = "progress";
    RequestEvents2["TIMEOUT"] = "timeout";
  })(RequestEvents || (RequestEvents = {}));
  let ReadyState;
  ((ReadyState2) => {
    ReadyState2[ReadyState2["UNSENT"] = 0] = "UNSENT";
    ReadyState2[ReadyState2["OPENED"] = 1] = "OPENED";
    ReadyState2[ReadyState2["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
    ReadyState2[ReadyState2["LOADING"] = 3] = "LOADING";
    ReadyState2[ReadyState2["DONE"] = 4] = "DONE";
  })(ReadyState || (ReadyState = {}));
  function typedArrayToString(array) {
    const decoder = new TextDecoder();
    return decoder.decode(array);
  }
  function stringToTypedArray(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }
  class ProgressEvent {
    constructor(type, target) {
      this.type = type;
      this.target = target;
    }
    loaded = 0;
    total = 1;
    lengthComputable = false;
  }
  class EventController {
    listeners = /* @__PURE__ */ new Map();
    constructor(request) {
      this.add("abort" /* ABORT */, (e) => request.onabort?.(e));
      this.add("error" /* ERROR */, (e) => request.onerror?.(e));
      this.add("load" /* LOAD */, (e) => request.onload?.(e));
      this.add("loadend" /* LOAD_END */, (e) => request.onloadend?.(e));
      this.add("loadstart" /* LOAD_START */, (e) => request.onloadstart?.(e));
      this.add("progress" /* PROGRESS */, (e) => request.onprogress?.(e));
      this.add("timeout" /* TIMEOUT */, (e) => request.ontimeout?.(e));
      this.add(
        "readystatechange" /* READY_STATE_CHANGE */,
        (e) => request.onreadystatechange?.(e)
      );
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
  class HeadersList {
    headers = /* @__PURE__ */ new Map();
    replace(headersString) {
      this.headers.clear();
      const headers = headersString.split("\r\n");
      for (const header of headers) {
        const [key, value] = header.split(": ");
        this.headers.set(key, value);
      }
    }
    set(name, value) {
      this.headers.set(name, value);
    }
    get(name) {
      return this.headers.get(name);
    }
    getAll() {
      let result = "";
      this.headers.forEach((value, key) => {
        result += `${key}: ${value}\r
`;
      });
      return result;
    }
    forEach(callback) {
      this.headers.forEach(callback);
    }
    freeze() {
      Object.freeze(this);
      Object.freeze(this.headers);
    }
    clear() {
      this.headers.clear();
    }
  }
  class ContentType {
    constructor(type) {
      this.type = type;
      this.content = type.split(";").map((e) => e.trim());
    }
    content;
    is(type) {
      return this.content[0] === type;
    }
    isOfType(type) {
      const [mainType, subType] = this.content[0].split("/");
      return mainType === type;
    }
    toString() {
      return this.type;
    }
    toType() {
      if (this.isOfType("text")) {
        return "text";
      } else if (this.is("application/json")) {
        return "json";
      } else if (this.is("application/octet-stream")) {
        return "arraybuffer";
      } else if (this.isOfType("image") || this.isOfType("audio") || this.isOfType("video")) {
        return "blob";
      }
      return "";
    }
  }
  return class XMLHttpRequest {
    DONE = 4 /* DONE */;
    HEADERS_RECEIVED = 2 /* HEADERS_RECEIVED */;
    LOADING = 3 /* LOADING */;
    OPENED = 1 /* OPENED */;
    UNSENT = 0 /* UNSENT */;
    static DONE = 4 /* DONE */;
    static HEADERS_RECEIVED = 2 /* HEADERS_RECEIVED */;
    static LOADING = 3 /* LOADING */;
    static OPENED = 1 /* OPENED */;
    static UNSENT = 0 /* UNSENT */;
    withCredentials;
    _requestConfig = {
      method: "GET",
      url: "",
      async: true,
      username: null,
      password: null
    };
    _currentReadyState = 0 /* UNSENT */;
    _responseBlob = null;
    _responseText = null;
    _responseType = null;
    _responseURL = null;
    _contentType = null;
    _eventController = new EventController(this);
    _requestHeaders = new HeadersList();
    _responseHeaders = new HeadersList();
    _status = null;
    _statusText = null;
    _searchParams = null;
    _abortCallback = null;
    _body = null;
    get readyState() {
      return this._currentReadyState;
    }
    get response() {
      if (this._currentReadyState === 4 /* DONE */) {
        return this._parseResponseData();
      }
      return null;
    }
    get responseText() {
      return this._responseText;
    }
    get responseXML() {
      return null;
    }
    get responseType() {
      if (this._responseType === null) {
        return this._contentType?.toType() ?? "";
      }
      return this._responseType;
    }
    set responseType(type) {
      this._responseType = type;
    }
    get responseURL() {
      return this._responseURL ?? this._getFullUrl();
    }
    get status() {
      return this._status ?? 0;
    }
    get statusText() {
      return this._statusText ?? "";
    }
    timeout = 6e4;
    onabort = (ev) => {
    };
    onerror = (ev) => {
    };
    onload = (ev) => {
    };
    onloadend = (ev) => {
    };
    onloadstart = (ev) => {
    };
    onprogress = (ev) => {
    };
    ontimeout = (ev) => {
    };
    _parseResponseData() {
      switch (this.responseType) {
        case "json":
          return JSON.parse(this._responseText);
        case "arraybuffer":
          return stringToTypedArray(this._responseText);
        case "blob":
          return this._responseBlob;
        case "text":
        case "":
          return this._responseText;
      }
    }
    _loadRequestBody(body) {
      if (body) {
        if (typeof body === "string") {
          this._body = body;
          return;
        }
        if (body instanceof ArrayBuffer || "buffer" in body && body.buffer instanceof ArrayBuffer) {
          this._body = typedArrayToString(body);
          return;
        }
        if (body instanceof FormData) {
          const bodyData = {};
          body.forEach((value, key) => {
            bodyData[key] = value;
          });
          this._body = JSON.stringify(bodyData);
          return;
        }
        if (body instanceof URLSearchParams) {
          this._searchParams = body;
          return;
        }
        this._body = JSON.stringify(body);
      }
    }
    _setReadyState(readyState) {
      if (this._currentReadyState >= readyState)
        return;
      this._currentReadyState = readyState;
      this._eventController.emit(
        "readystatechange" /* READY_STATE_CHANGE */,
        new ProgressEvent("readystatechange" /* READY_STATE_CHANGE */, this)
      );
    }
    _getFullUrl() {
      const { url, username, password } = this._requestConfig;
      const urlObj = new URL(url);
      if (username) {
        urlObj.username = username;
      }
      if (password) {
        urlObj.password = password;
      }
      if (this._searchParams) {
        for (const [key, value] of this._searchParams) {
          urlObj.searchParams.set(key, value);
        }
      }
      return urlObj.toString();
    }
    _getTimeout() {
      if (this.timeout <= 0)
        return 60 * 60;
      return Math.max(1, Math.floor(this.timeout / 1e3));
    }
    _getSoupMessage() {
      const message = Soup.Message.new(
        this._requestConfig.method,
        this._getFullUrl()
      );
      if (!message) {
        throw new Error(`Invalid URL: ${this._requestConfig.url}`);
      }
      this._requestHeaders.forEach((value, key) => {
        message.request_headers.append(key, value);
      });
      if (this._body) {
        const contentType = this._requestHeaders.get("Content-Type");
        message.set_request(
          contentType ?? "application/json",
          Soup.MemoryUse.COPY,
          this._body
        );
      }
      return message;
    }
    _finishRequest(status_code) {
      const ok = status_code >= 200 && status_code < 300;
      this._setReadyState(4 /* DONE */);
      this._eventController.emit(
        "loadend" /* LOAD_END */,
        new ProgressEvent("loadend" /* LOAD_END */, this)
      );
      if (ok) {
        this._eventController.emit(
          "load" /* LOAD */,
          new ProgressEvent("load" /* LOAD */, this)
        );
      } else if (status_code === 7) {
        this._eventController.emit(
          "timeout" /* TIMEOUT */,
          new ProgressEvent("timeout" /* TIMEOUT */, this)
        );
      } else if (status_code === 1) {
        this._eventController.emit(
          "abort" /* ABORT */,
          new ProgressEvent("abort" /* ABORT */, this)
        );
      } else {
        this._eventController.emit(
          "error" /* ERROR */,
          new ProgressEvent("error" /* ERROR */, this)
        );
      }
    }
    async _sendAsync() {
      try {
        const httpSession = new Soup.SessionAsync();
        const message = this._getSoupMessage();
        httpSession.timeout = this._getTimeout();
        this._abortCallback = () => httpSession.abort();
        const headersReading = new Promise((resolve, reject) => {
          try {
            message.connect("got-headers", (message2) => {
              const { response_headers } = message2;
              this._responseHeaders.clear();
              response_headers.foreach((name, value) => {
                this._responseHeaders.set(name, value);
              });
              this._setReadyState(2 /* HEADERS_RECEIVED */);
              resolve();
            });
          } catch (e) {
            reject();
          }
        });
        const chunkReading = new Promise((resolve, reject) => {
          let onReceived = () => {
            this._setReadyState(3 /* LOADING */);
            this._eventController.emit(
              "progress" /* PROGRESS */,
              new ProgressEvent("progress" /* PROGRESS */, this)
            );
            onReceived = () => {
              this._eventController.emit(
                "progress" /* PROGRESS */,
                new ProgressEvent("progress" /* PROGRESS */, this)
              );
            };
          };
          try {
            message.connect("got-chunk", (_, chunk) => {
              onReceived();
            });
            message.connect("finished", () => resolve());
          } catch (e) {
            reject();
          }
        });
        const response = await new Promise((resolve, reject) => {
          try {
            httpSession.queue_message(message, (_, msg) => {
              const contentType = msg.response_headers.get_one("Content-Type") ?? null;
              resolve({
                rawResponseData: msg.response_body_data,
                responseData: msg.response_body.data,
                responseType: contentType,
                responseUrl: msg.uri.to_string(true),
                statusCode: msg.status_code,
                statusText: msg.reason_phrase
              });
            });
          } catch (e) {
            reject(e);
          }
        });
        if (response.statusCode > 99) {
          await headersReading;
          await chunkReading;
        }
        this._contentType = response.responseType ? new ContentType(response.responseType) : null;
        this._status = response.statusCode;
        this._statusText = response.statusText;
        this._responseText = response.responseData;
        this._responseBlob = response.rawResponseData;
        this._finishRequest(response.statusCode);
      } catch (e) {
        console.error(e);
        this._eventController.emit(
          "error" /* ERROR */,
          new ProgressEvent("error" /* ERROR */, this)
        );
      }
    }
    _sendSync() {
      const httpSession = new Soup.SessionSync();
      const message = this._getSoupMessage();
      httpSession.timeout = this._getTimeout();
      this._setReadyState(3 /* LOADING */);
      this._eventController.emit(
        "loadstart" /* LOAD_START */,
        new ProgressEvent("loadstart" /* LOAD_START */, this)
      );
      httpSession.send_message(message);
      const { status_code, reason_phrase, response_headers } = message;
      this._responseHeaders.clear();
      response_headers.foreach((name, value) => {
        this._responseHeaders.set(name, value);
      });
      this._setReadyState(2 /* HEADERS_RECEIVED */);
      const contentType = response_headers.get_content_type();
      this._contentType = contentType ? new ContentType(contentType) : null;
      this._status = status_code;
      this._statusText = reason_phrase;
      this._responseText = message.response_body.data;
      this._responseBlob = message.response_body_data;
      this._responseURL = message.uri.to_string(true);
      this._finishRequest(status_code);
    }
    abort() {
      this._abortCallback?.();
    }
    getAllResponseHeaders() {
      return this._responseHeaders.getAll();
    }
    getResponseHeader(header) {
      return this._responseHeaders.get(header) ?? null;
    }
    setRequestHeader(name, value) {
      this._requestHeaders.set(name, value);
    }
    open(method, url, async, username, password) {
      this._requestConfig = {
        method,
        url: url.toString(),
        async: async ?? true,
        username,
        password
      };
      Object.freeze(this._requestConfig);
      this._requestHeaders.freeze();
      this._setReadyState(1 /* OPENED */);
    }
    overrideMimeType(mime) {
    }
    send(body) {
      this._loadRequestBody(body);
      if (this._requestConfig.async) {
        this._sendAsync();
      } else {
        this._sendSync();
      }
    }
    addEventListener(type, listener) {
      this._eventController.add(type, listener);
    }
    removeEventListener(type, listener) {
      this._eventController.remove(type, listener);
    }
  };
})();
export {
  XMLHttpRequestPolyfill as XMLHttpRequest
};
