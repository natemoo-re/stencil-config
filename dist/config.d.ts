export declare class Config<T extends {
    persistConfig?: boolean;
    [key: string]: any;
}> {
    private m;
    constructor(configObj: T);
    get(key: keyof T, fallback?: any): any;
    getBoolean(key: keyof T, fallback?: boolean): boolean;
    getNumber(key: keyof T, fallback?: number): number;
    set(key: keyof T, value: any): void;
}
