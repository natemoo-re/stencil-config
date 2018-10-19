import { Config } from './config';
import { configFromSession, saveConfig } from './utils';

declare const Context: any;

export { Config };

export function createContextConfig<T extends { persistConfig?: boolean, [key: string]: any }>(namespace: string) {
    
    console.log('creating ContextConfig', namespace);

    const NAMESPACE = namespace;
    const SESSION_KEY = `persist-${namespace.toLowerCase()}`;
    
    const win = window;
    const Global = (win as any)[NAMESPACE] = (win as any)[NAMESPACE] || {};
    
    // Create the Global.config from raw config object (if it exists)
    // and convert Global.config into ConfigAPI with get()
    const configObj = {
        ...configFromSession(SESSION_KEY),
        persistConfig: false,
        ...Global['config']
    }
    const config = Global['config'] = Context['config'] = new Config<T>(configObj);
    
    if (config.getBoolean('persistConfig')) {
        saveConfig(SESSION_KEY, configObj)
    }
    
    return config;
}

export function createSetupConfig<T extends { persistConfig?: boolean, [key: string]: any }>(namespace: string) {
    console.log('creating SetupConfig', namespace);
    const win = window as any;
    const existing = win[namespace];
        
    return function (config: T) {
        console.log('Setting Config', config);

        if (existing && existing.config && existing.config.constructor.name !== 'Object') {
            console.error('config was already initialized');
        }

        win[namespace] = win[namespace] || {};
        win[namespace]['config'] = {
            ...win[namespace]['config'],
            ...(config as any)
        };
    
        return win[namespace]['config'];
    }
}