// src/polyfills/fetch.ts
import Soup from "gi://Soup";
async function fetch(url, options = {}) {
  if (typeof url === "object") {
    options = url;
    if (!options.url) {
      throw new Error("URL must be specified.");
    }
    url = options.url;
  }
  const method = options.method || "GET";
  const message = Soup.Message.new(method, url);
  if (!message) {
    throw new Error(`Invalid URL: ${url}`);
  }
  const httpSession = new Soup.SessionAsync();
  if (options.redirect === "error") {
    message.set_flags(Soup.MessageFlags.NO_REDIRECT);
  }
  let wasAborted = false;
  if (options.signal) {
    options.signal.addEventListener("abort", () => {
      httpSession.abort();
      wasAborted = true;
    });
  }
  const headers = options.headers || {};
  for (const header in headers) {
    message.request_headers.append(header, headers[header]);
  }
  if (typeof options.body === "string") {
    message.set_request("application/json", Soup.MemoryUse.COPY, options.body);
  }
  const responseBody = await new Promise((resolve) => {
    httpSession.queue_message(message, (_, msg) => {
      resolve(msg.response_body.data);
    });
  });
  const { status_code, reason_phrase } = message;
  const ok = status_code >= 200 && status_code < 300;
  if (!ok) {
    const abortReason = options.signal?.reason;
    const error = wasAborted ? () => abortReason ?? new Error("Request was aborted. Cannot read the response body.") : () => new Error("HTTP Request has failed, cannot read the response body.");
    return {
      status: status_code,
      statusText: reason_phrase,
      ok,
      type: "basic",
      async json() {
        throw error();
      },
      async text() {
        throw error();
      },
      async arrayBuffer() {
        throw error();
      },
      async gBytes() {
        throw error();
      }
    };
  }
  return {
    status: status_code,
    statusText: reason_phrase,
    ok,
    type: "basic",
    async json() {
      return JSON.parse(responseBody);
    },
    async text() {
      return responseBody;
    },
    async arrayBuffer() {
      const array = new Uint8Array(responseBody.length);
      for (let i = 0; i < responseBody.length; i++) {
        array[i] = responseBody.charCodeAt(i);
      }
      return array.buffer;
    }
  };
}
export {
  fetch
};
