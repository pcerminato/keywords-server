import { KeywordsRecord } from "../entities/index.js";
import { DB } from "../interfaces/index.js";

type Tname = KeywordsRecord["name"];
type Tlists = KeywordsRecord["lists"];

export function createSaveKeywordsRecord(
  db: DB,
  createKeywordsRecord: (
    name: Tname,
    lists: Tlists,
  ) => KeywordsRecord,
) {
  return async function save(
    name: Tname,
    lists: Tlists,
  ) {
    const keywordRecord = createKeywordsRecord(name, lists);
    keywordRecord.validate();

    return await db.insertOne(keywordRecord);
  };
}
