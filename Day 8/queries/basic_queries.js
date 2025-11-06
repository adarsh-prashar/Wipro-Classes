// basic_queries.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:Ashu%402002@eduprodb.0gv9y9n.mongodb.net/?appName=EduProDb";
const client = new MongoClient(uri);
const dbName = "realtime1";
const collectionName = "meterreadings";

async function basicQueries() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  console.log("✅ Connected to MongoDB");

  // 1️⃣ Fetch all documents
  const allDocs = await collection.find().toArray();
  console.log("\n📄 All Documents:", allDocs);

  // 2️⃣ Distinct meter IDs
  const meters = await collection.distinct("meta.meterId");
  console.log("\n🔍 Available Meters:", meters);

  // 3️⃣ Readings for a specific meter (dynamic)
  for (const id of meters) {
    const readings = await collection.find({ "meta.meterId": id }).toArray();
    console.log(`\n📊 Readings for ${id}:`, readings);
  }

  await client.close();
  console.log("\n🔒 Connection closed.");
}

basicQueries().catch(console.error);
