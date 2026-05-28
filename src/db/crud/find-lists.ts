import { DbConnection } from "../connection.js";
import type { Keyword, Search } from "../../types.js";
import { ObjectId } from "mongodb";

export async function find(search?: Search) {
  let { connect, disconnect } = DbConnection();

  try {
    let db = await connect();

    const collection = db?.collection<Keyword>("keyword");

    return await collection?.find()
      .map(({ _id, name }) => ({
        id: _id,
        name,
      }))
      .limit(search?.limit || 20)
      .skip(search?.skip || 0)
      .toArray();
  } catch (error) {
    console.error(error);
  } finally {
    disconnect();
  }
}

export async function findOne(id: string) {
  let { connect, disconnect } = DbConnection();

  if (!id) {
    new Error("Missing id param");
  }
  try {
    let db = await connect();
    const collection = db?.collection<Keyword>("keyword");

    return await collection?.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error(error);
  } finally {
    disconnect();
  }
}
