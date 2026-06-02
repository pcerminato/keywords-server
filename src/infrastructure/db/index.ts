import { insertOne } from "./crud/insert-one.js";
import { transformModel } from "./models.js";

import { KeywordsRecord } from "../../entities/index.js";
import { DB } from "../../interfaces/index.js";

export class MongoDb implements DB {
  async insertOne(keyword: KeywordsRecord) {
    return await insertOne(
      transformModel(keyword),
    );
  }
}
