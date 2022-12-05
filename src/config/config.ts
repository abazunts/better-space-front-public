export type EnvironmentVariable = { [key: string]: string | undefined };

class ApiSettings {
    public readonly API_BASE_URL: string;
    constructor(
        private envVariables: EnvironmentVariable,
    ) {
        this.API_BASE_URL = envVariables.REACT_APP_API_BASE_URL || 'http://localhost:4929/api'// 'https://dev-better-space-api.herokuapp.com/api'
    }
}

class AppSettings {
    constructor(public env: EnvironmentVariable, public apiSettings: ApiSettings) {
    }
}
const apiSettings = new ApiSettings(process.env)
export const appSettings = new AppSettings(process.env, apiSettings);
