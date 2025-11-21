import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import 'dotenv/config';
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: process.env.NODE_ENV === 'development' ? ["ip.src"] : [process.env.MISSING_IP_ADDRESS],
    rules: [
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