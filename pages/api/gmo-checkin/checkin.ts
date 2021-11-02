import type { NextApiRequest, NextApiResponse } from "next";

const checkin = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, method, headers } = req;

    switch (method) {
        case "POST":
            const result = await fetch("https://checkin.runsystem.info/attendance/submit", {
                method: "POST",
                redirect: "manual",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: headers.authorization || "",
                },
                body: JSON.stringify(body),
            });
            switch (result.status) {
                case 200:
                case 201:
                    res.status(result.status).json({
                        success: true,
                    });
                    break;
                default:
                    res.status(result.status).json(await result.json());
            }

            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default checkin;
