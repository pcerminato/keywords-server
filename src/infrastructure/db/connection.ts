import { Db, MongoClient, ServerApiVersion } from "mongodb";
import config from "../../infrastructure/config/index.js";

export function DbConnection() {
  // @ts-ignore for global.__MONGO_URI__
  const uri = config.MONGO_URI || global.__MONGO_URI__ || "";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1, // sets stable API version
      strict: true,
      deprecationErrors: true,
    },
  });

  async function connect(): Promise<Db | undefined> {
    try {
      await client.connect();

      const database = await client.db("keywords");

      await database.command({ ping: 1 });

      return database;
    } catch (error) {
      console.error(error);
    }
  }

  async function disconnect() {
    if (client) {
      await client.close();
    }
  }

  return Object.freeze({
    connect,
    disconnect,
  });
}
