import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import pngjs from "pngjs";
import sharp from "sharp";
import { logDev } from "utils/logs";

const imgFilter = async (input: Buffer) => {
    const captcha = await sharp(input).png().toBuffer();

    const pngImage = pngjs.PNG.sync.read(captcha);
    const { data, height, width } = pngImage;
    logDev("wh__", width, height);

    // create a dictionary to keep track of our pixel counts
    // const colorOccurrences: { [key: string]: number } = {};

    // for (let y = 0; y < height; y++) {
    //     // rows
    //     for (let x = 0; x < width; x++) {
    //         // columns
    //         /**
    //          * Each pixel is a set of 4 values:
    //          * Red, Green, Blue, Alpha (transparency)
    //          */
    //         const index = (width * y + x) * 4;

    //         // create a string of the R-G-B color values
    //         const color = `${data[index]}-${data[index + 1]}-${data[index + 2]}`;
    //         // we can ignore white since it will always be the background
    //         if (color !== "255-255-255") {
    //             // increase the count by 1 (or set it to 1 if the color wasn't there yet)
    //             colorOccurrences[color] = (colorOccurrences[color] || 0) + 1;
    //         }
    //     }
    // }

    // // grab all of the colors in the pattern [R-G-B, # of occurrences]
    // const colors = Object.entries(colorOccurrences);
    // // find the color that occurred most
    // const highestColor = colors.reduce((highColor, currentColor) => {
    //     if (highColor[1] > currentColor[1]) {
    //         return highColor;
    //     } else {
    //         return currentColor;
    //     }
    // });
    // // grab just the R-G-B as an array, we don't need the number of occurrences
    // const highestColorRGB = highestColor[0].split("-");

    // for (let y = 0; y < height; y++) {
    //     // rows
    //     for (let x = 0; x < width; x++) {
    //         // columns
    //         const index = (width * y + x) * 4;

    //         // grab the RGB values of the current pixel
    //         const RGB = [data[index], data[index + 1], data[index + 2]];

    //         // ignore white pixels so we don't alter the background
    //         if (RGB[0] === 255 && RGB[1] === 255 && RGB[2] === 255) continue;

    //         /**
    //          * We need to be a little forgiving when checking the colors.
    //          * Sometimes individual pixels are only 1-3 points of R, G, or B away,
    //          * especially on the edges of the characters.
    //          */
    //         // find how far each pixel color channel is from the color of the characters
    //         const [red, green, blue] = [
    //             Math.abs(+highestColorRGB[0] - RGB[0]),
    //             Math.abs(+highestColorRGB[1] - RGB[1]),
    //             Math.abs(+highestColorRGB[2] - RGB[2]),
    //         ];

    //         // if any color channel is more than 3 points away
    //         if (red > 3 || green > 3 || blue > 3) {
    //             // if any color channel is more than 3 points away
    //             if (red > 3 || green > 3 || blue > 3) {
    //                 // Grab the pixel that is one row up (y-1)
    //                 const aboveIndex = (width * (y - 1) + x) * 4;

    //                 // Paint our pixel to match the pixel above
    //                 data[index] = data[aboveIndex];
    //                 data[index + 1] = data[aboveIndex + 1];
    //                 data[index + 2] = data[aboveIndex + 2];
    //             }
    //         }
    //     }
    // }

    // // save new image
    // const imageBuffer = pngjs.PNG.sync.write(pngImage);

    return data;
};

const getInfo = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, method, headers, query } = req;

    switch (method) {
        case "GET":
            const result = await axios.get("https://sinhvien.hufi.edu.vn/WebCommon/GetCaptcha", {
                responseType: "arraybuffer",
            });

            switch (result.status) {
                case 200:
                case 201:
                    const imgF = await imgFilter(result.data);

                    // Tesseract.recognize(imgF, "eng", {}).then(({ data: { text } }) => {
                    //     logDev(text);
                    //     res.status(result.status).end(imgF);
                    // });

                    res.status(result.status).end(imgF);

                    // res.status(result.status).json(result.data);
                    break;
                default:
                    res.status(result.status).json(result.data);
            }

            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default getInfo;
