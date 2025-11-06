// aggregations.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:Ashu%402002@eduprodb.0gv9y9n.mongodb.net/?appName=EduProDb";
const client = new MongoClient(uri);
const dbName = "realtime1";
const collectionName = "meterreadings";

async function runAggregations() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  console.log("✅ Connected for Aggregations");

  // 1️⃣ Total energy per meter
  const totalEnergy = await collection.aggregate([
    { $group: { _id: "$meta.meterId", totalEnergy: { $sum: "$energy_kWh" } } },
    { $sort: { _id: 1 } }
  ]).toArray();
  console.log("\n⚡ Total Energy per Meter:", totalEnergy);

  // 2️⃣ Average temperature by location
  const avgTemp = await collection.aggregate([
    { $group: { _id: "$meta.location", avgTemp: { $avg: "$temperature_C" } } },
    { $sort: { _id: 1 } }
  ]).toArray();
  console.log("\n🌡️ Average Temperature by Location:", avgTemp);

  // 3️⃣ Hourly energy trend per meter
  const hourlyTrend = await collection.aggregate([
    {
      $group: {
        _id: { meterId: "$meta.meterId", hour: { $hour: "$timestamp" } },
        totalEnergy: { $sum: "$energy_kWh" }
      }
    },
    { $sort: { "_id.meterId": 1, "_id.hour": 1 } }
  ]).toArray();
  console.log("\n⏰ Hourly Energy Trend per Meter:", hourlyTrend);

  // 4️⃣ High usage hours (>6 kWh)
  const highUsage = hourlyTrend.filter(h => h.totalEnergy > 6);
  console.log("\n🚨 High Usage Hours (>6 kWh):", highUsage);

  await client.close();
  console.log("\n🔒 Aggregation completed and connection closed.");
}

runAggregations().catch(console.error);
