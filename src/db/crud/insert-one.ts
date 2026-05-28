import { DbConnection } from "../connection.js";
import type { Keyword } from "../../types.js";

export async function insertOne(keyword: Keyword) {
  let { connect, disconnect } = DbConnection();

  try {
    let db = await connect();

    const collection = db?.collection<Keyword>("lists");

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
