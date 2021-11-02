import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const readable = await axios({
        url: req.query.url as string,
        responseType: "stream",
    });
    res.setHeader("Content-Type", "image/svg+xml");

    await readable.data.pipe(res);
};
