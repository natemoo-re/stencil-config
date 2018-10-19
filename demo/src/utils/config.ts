import { Config as ConfigInterface, createSetupConfig } from 'stencil-config';

interface MyConfig {
    // Note: persistConfig is used internally by `stencil-config` and should remain
    persistConfig?: boolean;
    // Example setting
    color?: 'red' | 'green' | 'blue';
}

export type Config = ConfigInterface<MyConfig>;
export const setupConfig = createSetupConfig<MyConfig>('my-namespace');