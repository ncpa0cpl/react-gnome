/**
 * Code originally taken from
 * https://github.com/sonnyp/troll/blob/main/src/std/fetch.js and
 * written by [Sonny Piers](https://github.com/sonnyp)
 */
declare function fetch(url: RequestInfo, options?: Partial<Request>): Promise<{
    status: number;
    statusText: string;
    ok: false;
    type: string;
    json(): Promise<never>;
    text(): Promise<never>;
    arrayBuffer(): Promise<never>;
    gBytes(): Promise<never>;
} | {
    status: number;
    statusText: string;
    ok: true;
    type: string;
    json(): Promise<any>;
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBufferLike>;
}>;
export { fetch as fetch };
