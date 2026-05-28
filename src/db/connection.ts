import { Db, MongoClient, ServerApiVersion } from "mongodb";
import config from "../config/index.js";

const uri = config.MONGO_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // sets stable API version
    strict: true,
    deprecationErrors: true,
  },
});

export async function runDbConnection(): Promise<Db | undefined> {
  try {
    await client.connect();

    const database = await client.db("keywords");

    await database.command({ ping: 1 });

    console.log("Connected to MongoDB");

    return database;
  } catch (error) {
    console.error(error);
  }
}
