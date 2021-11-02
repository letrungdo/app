import { BaseResponse } from "interfaces/response";
import api from "services/api";

export const getAuthenSession = (body: { email: string; password: string }) => {
    return api.post<BaseResponse & { cookie: string }>("/api/gmo-checkin/getAuthenCookie", body);
};

export const checkin = (authorization: string, body: { type: string; emoji: string }) => {
    return api.post<BaseResponse>("/api/gmo-checkin/checkin", body, {
        headers: {
            Authorization: authorization,
        },
    });
};
