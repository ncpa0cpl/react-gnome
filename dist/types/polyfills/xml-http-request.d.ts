declare type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
declare type RequestBody = string | ArrayBuffer | TypedArray | FormData | URLSearchParams | null;
declare type ResponseType = "" | "arraybuffer" | "blob" | "json" | "text";
declare enum RequestEvents {
    READY_STATE_CHANGE = "readystatechange",
    ABORT = "abort",
    ERROR = "error",
    LOAD = "load",
    LOAD_END = "loadend",
    LOAD_START = "loadstart",
    PROGRESS = "progress",
    TIMEOUT = "timeout"
}
declare enum ReadyState {
    UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4
}
declare class ProgressEvent<T = any> {
    readonly type: string;
    readonly target: T | null;
    readonly loaded = 0;
    readonly total = 1;
    readonly lengthComputable = false;
    constructor(type: string, target: T | null);
}
declare class XMLHttpRequestPolyfill {
    readonly DONE = ReadyState.DONE;
    readonly HEADERS_RECEIVED = ReadyState.HEADERS_RECEIVED;
    readonly LOADING = ReadyState.LOADING;
    readonly OPENED = ReadyState.OPENED;
    readonly UNSENT = ReadyState.UNSENT;
    static readonly DONE = ReadyState.DONE;
    static readonly HEADERS_RECEIVED = ReadyState.HEADERS_RECEIVED;
    static readonly LOADING = ReadyState.LOADING;
    static readonly OPENED = ReadyState.OPENED;
    static readonly UNSENT = ReadyState.UNSENT;
    withCredentials: boolean;
    private _requestConfig;
    private _currentReadyState;
    private _responseBlob;
    private _responseText;
    private _responseType;
    private _responseURL;
    private _contentType;
    private _eventController;
    private _requestHeaders;
    private _responseHeaders;
    private _status;
    private _statusText;
    private _searchParams;
    private _abortCallback;
    private _body;
    get readyState(): ReadyState;
    get response(): ArrayBuffer | Blob | Document | object | string | null;
    get responseText(): string | null;
    get responseXML(): string | null;
    get responseType(): ResponseType;
    set responseType(type: ResponseType);
    get responseURL(): string;
    get status(): number;
    get statusText(): string;
    timeout: number;
    onabort: (ev: ProgressEvent) => void;
    onerror: (ev: ProgressEvent) => void;
    onload: (ev: ProgressEvent) => void;
    onloadend: (ev: ProgressEvent) => void;
    onloadstart: (ev: ProgressEvent) => void;
    onprogress: (ev: ProgressEvent) => void;
    ontimeout: (ev: ProgressEvent) => void;
    private _parseResponseData;
    private _loadRequestBody;
    private _setReadyState;
    private _getFullUrl;
    private _getTimeout;
    private _getSoupMessage;
    private _finishRequest;
    private _sendAsync;
    private _sendSync;
    abort(): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string | null;
    setRequestHeader(name: string, value: string): void;
    open(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null): void;
    overrideMimeType(mime: string): void;
    send(body?: RequestBody): void;
    addEventListener(type: RequestEvents, listener: (event: ProgressEvent) => void): void;
    removeEventListener(type: RequestEvents, listener: (event: ProgressEvent) => void): void;
}
export { XMLHttpRequestPolyfill as XMLHttpRequest };
