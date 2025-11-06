// index_optimization.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:Ashu%402002@eduprodb.0gv9y9n.mongodb.net/?appName=EduProDb";
const client = new MongoClient(uri);
const dbName = "realtime1";
const collectionName = "meterreadings";

async function optimizeIndexes() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  console.log("✅ Connected for Index Optimization");

  await collection.createIndex({ "meta.meterId": 1 });
  await collection.createIndex({ "meta.location": 1 });
  await collection.createIndex({ timestamp: 1 });

  const indexes = await collection.indexes();
  console.log("\n🧭 Current Indexes:", indexes);

  await client.close();
  console.log("\n🔒 Index optimization completed.");
}

optimizeIndexes().catch(console.error);
