import axios from "axios";
import { AXIOS_TIMEOUT_ERROR_MESSAGE } from "constants/api";
import { envConfig } from "services/envConfig";

const baseAxios = axios.create({
    baseURL: envConfig.apiUrl,
    timeout: envConfig.apiTimeout,
    timeoutErrorMessage: AXIOS_TIMEOUT_ERROR_MESSAGE,
});

export default baseAxios;
