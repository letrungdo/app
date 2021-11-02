export interface ServerError {
    apiPath: string;
    errorCode: number | string;
    response?: any;
}

/** Common response */
export interface BaseResponse extends ServerError {
    result: string;
    message: string;
}
