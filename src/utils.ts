export function configFromSession(SESSION_KEY: string): any {
    try {
        const configStr = window.sessionStorage.getItem(SESSION_KEY);
        return configStr !== null ? JSON.parse(configStr) : {};
    } catch (e) {
        return {};
    }
}

export function saveConfig(SESSION_KEY: string, config: any) {
    try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(config));
    } catch (e) {
        return;
    }
}