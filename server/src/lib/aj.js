import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import 'dotenv/config';
const isProduction = process.env.NODE_ENV === 'production';
const getCharacteristics = () => {
    return ["userAgent", "requestPath", "method"];
};
const getMode = () => {
    return isProduction ? "LIVE" : "DRY_RUN";
};
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: getCharacteristics(),
    rules: [
        shield({
            mode: getMode()
        }),
        detectBot({
            mode: getMode(),
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ]
        }),
        tokenBucket({
            mode: getMode(),
            refillRate: isProduction ? 30 : 100,
            interval: 5,
            capacity: isProduction ? 20 : 100
        }),
    ],
});