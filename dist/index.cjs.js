'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Config {
    constructor(configObj) {
        this.m = new Map(Object.entries(configObj));
    }
    get(key, fallback) {
        const value = this.m.get(key);
        return (value !== undefined) ? value : fallback;
    }
    getBoolean(key, fallback = false) {
        const val = this.m.get(key);
        if (val === undefined) {
            return fallback;
        }
        if (typeof val === 'string') {
            return val === 'true';
        }
        return !!val;
    }
    getNumber(key, fallback) {
        const val = parseFloat(this.m.get(key));
        return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
    }
    set(key, value) {
        this.m.set(key, value);
    }
}

function configFromSession(SESSION_KEY) {
    try {
        const configStr = window.sessionStorage.getItem(SESSION_KEY);
        return configStr !== null ? JSON.parse(configStr) : {};
    }
    catch (e) {
        return {};
    }
}
function saveConfig(SESSION_KEY, config) {
    try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(config));
    }
    catch (e) {
        return;
    }
}

function createContextConfig(namespace) {
    console.log('creating ContextConfig', namespace);
    const NAMESPACE = namespace;
    const SESSION_KEY = `persist-${namespace.toLowerCase()}`;
    const win = window;
    const Global = win[NAMESPACE] = win[NAMESPACE] || {};
    // Create the Global.config from raw config object (if it exists)
    // and convert Global.config into ConfigAPI with get()
    const configObj = Object.assign({}, configFromSession(SESSION_KEY), { persistConfig: false }, Global['config']);
    const config = Global['config'] = Context['config'] = new Config(configObj);
    if (config.getBoolean('persistConfig')) {
        saveConfig(SESSION_KEY, configObj);
    }
    return config;
}
function createSetupConfig(namespace) {
    console.log('creating SetupConfig', namespace);
    const win = window;
    const existing = win[namespace];
    return function (config) {
        console.log('Setting Config', config);
        if (existing && existing.config && existing.config.constructor.name !== 'Object') {
            console.error('config was already initialized');
        }
        win[namespace] = win[namespace] || {};
        win[namespace]['config'] = Object.assign({}, win[namespace]['config'], config);
        return win[namespace]['config'];
    };
}

exports.Config = Config;
exports.createContextConfig = createContextConfig;
exports.createSetupConfig = createSetupConfig;
