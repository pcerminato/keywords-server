import { runDbConnection } from "../connection.js";
import type { Search, Sentiment } from "../../types.js";
import { ObjectId } from "mongodb";

export async function find(search?: Search) {
  let db;

  try {
    db = await runDbConnection();

    const collection = db?.collection<Sentiment>("sentiment");

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
    db?.client.close();
  }
}

export async function findOne(id: string) {
  let db;

  if (!id) {
    new Error("Missing id param");
  }
  try {
    db = await runDbConnection();

    const collection = db?.collection<Sentiment>("sentiment");

    return await collection?.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error(error);
  } finally {
    db?.client.close();
  }
}
