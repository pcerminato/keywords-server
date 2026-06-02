import { DbConnection } from "../connection.js";
import { KeywordRecordModel } from "../models.js";

export async function insertOne(keyword: KeywordRecordModel) {
  let { connect, disconnect } = DbConnection();

  try {
    let db = await connect();
    const collection = db?.collection<KeywordRecordModel>("lists");
    const result = await collection?.insertOne(keyword);

    if (result?.acknowledged) {
      return { _id: result.insertedId, ...keyword };
    }
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    disconnect();
  }
}
