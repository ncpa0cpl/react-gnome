declare type FormDataEntryValueP = string;
declare class FormData {
    private _entries;
    append(name: string, value: FormDataEntryValueP): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValueP | null;
    getAll(name: string): FormDataEntryValueP[];
    has(name: string): boolean;
    set(name: string, value: FormDataEntryValueP): void;
    forEach(callbackfn: (value: FormDataEntryValueP, key: string, parent: FormData) => void): void;
    /**
     * Returns an array of key, value pairs for every entry in the
     * list.
     */
    entries(): IterableIterator<[string, FormDataEntryValueP]>;
    /** Returns a list of keys in the list. */
    keys(): IterableIterator<string>;
    /** Returns a list of values in the list. */
    values(): IterableIterator<FormDataEntryValueP>;
    [Symbol.iterator](): IterableIterator<[string, FormDataEntryValueP]>;
}
export { FormData };
