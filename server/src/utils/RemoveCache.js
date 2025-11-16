import { response } from "express";
import { cache } from "../config/cache.js";
export const removeCache = async (key) => {
    try {
        let cacheItem = cache.get(key);
        if (cacheItem) {
            await cache.del(key);
        }
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}