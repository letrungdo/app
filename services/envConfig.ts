import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export interface EnvConfig {
    apiUrl: string;
    apiTimeout: number;
    debugLog: string;
    oneSignalAppId: string;
}

export const envConfig = publicRuntimeConfig as EnvConfig;
