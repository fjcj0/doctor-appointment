import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import 'dotenv/config';
const isProduction = process.env.NODE_ENV === 'production';
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["requestPath", "method"],
    rules: [
        shield({
            mode: isProduction ? "LIVE" : "DRY_RUN"
        }),
        detectBot({
            mode: isProduction ? "LIVE" : "DRY_RUN",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ]
        }),
        tokenBucket({
            mode: isProduction ? "LIVE" : "DRY_RUN",
            refillRate: isProduction ? 30 : 100,
            interval: 5,
            capacity: isProduction ? 20 : 100
        }),
    ],
});