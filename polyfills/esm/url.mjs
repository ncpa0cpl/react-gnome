// src/polyfills/url.ts
import {
  URL as whatwgURL,
  URLSearchParams as whatwgURLSearchParams
} from "whatwg-url-without-unicode";
var URL = whatwgURL;
var URLSearchParams = whatwgURLSearchParams;
export {
  URL,
  URLSearchParams
};
