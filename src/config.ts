export class Config<T extends { persistConfig?: boolean, [key: string]: any }> {

    private m: Map<keyof T, any>;

    constructor(configObj: T) {
        this.m = new Map<keyof T, any>((Object as any).entries(configObj) as any);
    }

    get(key: keyof T, fallback?: any): any {
        const value = this.m.get(key);
        return (value !== undefined) ? value : fallback;
    }

    getBoolean(key: keyof T, fallback = false): boolean {
        const val = this.m.get(key);
        if (val === undefined) {
            return fallback;
        }
        if (typeof val === 'string') {
            return val === 'true';
        }
        return !!val;
    }

    getNumber(key: keyof T, fallback?: number): number {
        const val = parseFloat(this.m.get(key));
        return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
    }

    set(key: keyof T, value: any) {
        this.m.set(key, value);
    }
}