import type { NextApiRequest, NextApiResponse } from "next";
import { logDev } from "utils/logs";

const getAuthenCookie = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, method } = req;

    switch (method) {
        case "POST":
            const result = await fetch("https://checkin.runsystem.info/auth/login", {
                method: "POST",
                redirect: "manual",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const cookie = result.headers.get("set-cookie");
            logDev(result.status);
            if (cookie?.includes("Authorization=Bearer")) {
                res.status(200).json({
                    cookie,
                });
            } else {
                res.status(401).json({
                    success: false,
                });
            }
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default getAuthenCookie;
