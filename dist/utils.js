export function configFromSession(SESSION_KEY) {
    try {
        const configStr = window.sessionStorage.getItem(SESSION_KEY);
        return configStr !== null ? JSON.parse(configStr) : {};
    }
    catch (e) {
        return {};
    }
}
export function saveConfig(SESSION_KEY, config) {
    try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(config));
    }
    catch (e) {
        return;
    }
}
