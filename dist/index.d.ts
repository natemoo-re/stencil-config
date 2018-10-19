import { Config } from './config';
export { Config };
export declare function createContextConfig<T extends {
    persistConfig?: boolean;
    [key: string]: any;
}>(namespace: string): Config<T>;
export declare function createSetupConfig<T extends {
    persistConfig?: boolean;
    [key: string]: any;
}>(namespace: string): (config: T) => any;
