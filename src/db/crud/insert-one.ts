import { runDbConnection } from "../connection.js";
import type { Keyword } from "../../types.js";

export async function insertOne(keyword: Keyword) {
  let db;

  try {
    db = await runDbConnection();

    const collection = db?.collection<Keyword>("keyword");

    const result = await collection?.insertOne(keyword);

    if (result?.acknowledged) {
      return { _id: result.insertedId, ...keyword };
    }

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    db?.client.close();
  }
}
