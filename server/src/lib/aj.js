import arcjet, { tokenBucket, shield, detectBot, allow } from "@arcjet/node";
import 'dotenv/config';
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        allow({
            mode: "LIVE",
            ip: ["74.220.48.250"]
        }),
        shield({
            mode: "LIVE"
        }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20
        }),
    ],
});