/* eslint-disable */
import { envConfig } from "services/envConfig";

let logDev = (_message?: any, ..._optionalParams: any[]) => {};
let logError = (_message?: any, ..._optionalParams: any[]) => {};

if (envConfig.debugLog === "debug") {
    logDev = console.log.bind(console);
    logError = console.error.bind(console);
}

export { logDev, logError };
