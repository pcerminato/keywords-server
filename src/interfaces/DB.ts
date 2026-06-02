import { KeywordsRecord } from "../entities/index.js";

export interface DB {
  insertOne: (keyword: KeywordsRecord) => Promise<any>; /* HttpResponse ? */
}
