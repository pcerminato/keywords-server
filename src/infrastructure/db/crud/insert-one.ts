import { KeywordsRecord } from "../../../entities/index.js";
import { DbConnection } from "../connection.js";

export async function insertOne(keyword: KeywordsRecord) {
  let { connect, disconnect } = DbConnection();

  try {
    let db = await connect();

    const collection = db?.collection<KeywordsRecord>("lists");

    const result = await collection?.insertOne(keyword);
    console.log(result);
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
