import rawData from "../../db.json";

type DB = typeof rawData;

// clone once at server start
let db: DB = structuredClone(rawData);

export function getDB() {
    return db;
}
